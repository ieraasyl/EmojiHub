import { AxiosError } from 'axios';
import { ErrorResponse } from '@/lib/types';

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const errorResponse = error.response?.data as ErrorResponse;
    
    if (errorResponse?.error) {
      return errorResponse.error;
    }
    
    if (error.response?.status === 401) {
      return 'Unauthorized. Please log in again.';
    }
    
    if (error.response?.status === 403) {
      return 'Access denied.';
    }
    
    if (error.response?.status === 404) {
      return 'Resource not found.';
    }
    
    if (error.response?.status && error.response.status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    if (error.message) {
      return error.message;
    }
  }
  
  return 'An unexpected error occurred.';
}
