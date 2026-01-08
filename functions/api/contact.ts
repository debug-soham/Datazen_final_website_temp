import { contactMessageSchema } from '../../shared/schema';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { appendContactMessage } from '../../server/lib/google-sheets';

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const validatedData = contactMessageSchema.parse(body);
    
    const success = await appendContactMessage(validatedData);
    
    if (success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Contact message received successfully',
          data: validatedData
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      throw new Error('Failed to save contact message');
    }
  } catch (error) {
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
        message: 'An error occurred while processing your request'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
