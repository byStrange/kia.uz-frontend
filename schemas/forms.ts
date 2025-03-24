import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'Пожалуйста, введите действительные данные',
    ),

  surname: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'Пожалуйста, введите действительные данные',
    ),

  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.startsWith('+'),
      'Пожалуйста, напишите его в международном формате (например, с префиксом +998)',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'Необходимо ввести правильный номер телефона',
    ),
  email: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .email({ message: 'Необходимо ввести правильный e-mail' }),

  city: z
    .string()
    .min(1, 'Поле обязательно для заполнения'),

  comment: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .min(25, 'Требуется минимум 25 символов'),

  requestType: z.string().min(1, 'Поле обязательно для заполнения'),

  agree: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо подтвердить согласие' }),
  }),
})

export const serviceForm = z.object({
  model: z.string().min(1, 'Please choose a model'),
  issue_year: z.string().min(1, 'Please provide issue year'),
  region: z.string().min(1, 'Please choose a region'),
  fillial: z.string().min(1, 'Please choose a fillial'),
  work_type: z.string().min(1, 'Please choose type of work that has to be done'),
  time: z.string(),
  name: z.string().optional(),
  phone: z.string()
    .refine(
      (value) => value.startsWith('+'),
      'Пожалуйста, напишите его в международном формате (например, с префиксом +998)',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'Необходимо ввести правильный номер телефона',
    ),

})


export const testDriveSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'Пожалуйста, введите действительные данные',
    ),

  phone: z
    .string()
    .refine(value => value, 'Поле обязательно для заполнения')
    .refine(
      (value) => !value || value.startsWith('+'),
      'Пожалуйста, напишите его в международном формате (например, с префиксом +998)',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'Необходимо ввести правильный номер телефона',
    ),

  region: z
    .string()
    .min(1, 'Поле обязательно для заполнения'),

  comment: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .min(25, 'Требуется минимум 25 символов'),

  agree: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо подтвердить согласие' }),
  }),
})
