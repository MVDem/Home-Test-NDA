import { z } from 'zod';

export const amountSchema = z
  .string()
  .refine((value) => !isNaN(Number(value)), { message: 'Must be a number' })
  .refine((value) => Number(value) >= 0, {
    message: 'Must be a positive number',
  });
