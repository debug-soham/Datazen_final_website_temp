import { teamRegistrationSchema } from '../../shared/schema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { appendTeamRegistration } from '../../server/lib/google-sheets';

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const validatedData = teamRegistrationSchema.parse(body);
    
    console.log('Registration request received:', {
      teamName: validatedData.teamName,
      college: validatedData.college,
      email: validatedData.email,
    });
    
    const success = await appendTeamRegistration(validatedData);
    
    if (success) {
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
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to register team'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Registration error:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation error',
          errors: validationError.message
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
