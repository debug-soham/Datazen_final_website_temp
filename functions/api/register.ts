import { google } from 'googleapis';
import { z } from 'zod';

const teamRegistrationSchema = z.object({
  teamName: z.string().min(2),
  college: z.string().min(2),
  year: z.string().min(1),
  teamSize: z.string().min(1),
  leaderName: z.string().min(2),
  leaderResume: z.string().url(),
  email: z.string().email().refine(
    (email) => email.endsWith("@somaiya.edu"),
    "Only @somaiya.edu email addresses are allowed"
  ),
  phone: z.string().min(10),
  members: z.array(z.object({
    name: z.string().min(2),
    resume: z.string().url()
  })).optional(),
});

async function getAuth(env: any) {
  try {
    const credentialsJson = env.GOOGLE_SHEETS_CREDENTIALS;
    if (!credentialsJson) {
      console.warn('GOOGLE_SHEETS_CREDENTIALS not set');
      return null;
    }

    const credentials = JSON.parse(credentialsJson);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return await auth.getClient();
  } catch (error) {
    console.error('Error creating auth client:', error);
    return null;
  }
}

async function ensureSheetExists(sheets: any, spreadsheetId: string, sheetName: string, headers: string[]) {
  try {
    const response = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = response.data.sheets?.find((s: any) => s.properties?.title === sheetName);

    if (!sheet) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: sheetName } } }],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
    }
    return true;
  } catch (error) {
    console.error('Error ensuring sheet exists:', error);
    return false;
  }
}

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const validatedData = teamRegistrationSchema.parse(body);
    
    console.log('Registration request received:', {
      teamName: validatedData.teamName,
      college: validatedData.college,
      email: validatedData.email,
    });
    
    const auth = await getAuth(context.env);
    if (!auth) {
      throw new Error('Failed to authenticate with Google Sheets');
    }

    const spreadsheetId = context.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_ID not configured');
    }

    const sheetName = context.env.GOOGLE_SHEETS_NAME || 'Team Registrations';
    const sheets = google.sheets({ version: 'v4', auth });

    const headers = ['Team Name', 'College', 'Year', 'Team Size', 'Leader Name', 'Leader Resume', 'Email', 'Phone', 'Member 2 Name', 'Member 2 Resume', 'Member 3 Name', 'Member 3 Resume', 'Created At'];
    await ensureSheetExists(sheets, spreadsheetId, sheetName, headers);

    const row = [
      validatedData.teamName,
      validatedData.college,
      validatedData.year,
      validatedData.teamSize,
      validatedData.leaderName,
      validatedData.leaderResume,
      validatedData.email,
      validatedData.phone,
      validatedData.members?.[0]?.name || '',
      validatedData.members?.[0]?.resume || '',
      validatedData.members?.[1]?.name || '',
      validatedData.members?.[1]?.resume || '',
      new Date().toISOString()
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Team registered successfully',
        data: validatedData
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Registration error:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(e => e.message).join(', ')
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while processing your request'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
