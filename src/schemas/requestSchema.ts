import { z } from 'zod';

export const requestSchema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  phone: z.string().min(7, 'Укажите телефон').regex(/^[\d\s()+-]+$/, 'Телефон должен содержать цифры и знаки + - ( )'),
  company: z.string().min(2, 'Укажите компанию'),
  email: z.string().email('Укажите корректную почту').optional().or(z.literal('')),
  comment: z.string().max(600, 'Комментарий до 600 символов').optional(),
  agreement: z.boolean().refine((value) => value, 'Нужно согласие на обработку данных'),
});

export type RequestFormData = z.infer<typeof requestSchema>;
