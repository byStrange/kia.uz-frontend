import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z.string().min(2, 'Необходимо ввести имя'),

  surname: z.string().min(2, 'Необходимо ввести фамилию'),

  phone: z.string().min(2, 'Необходимо ввести телефон'),

  email: z
    .string({ message: 'Поле обязательно для заполнения' })
    .email({ message: 'Необходимо ввести правильный e-mail' }),

  city: z
    .string({ message: 'Поле обязательно для заполнения' })
    .min(2, 'Необходимо ввести город'),

  comment: z
    .string({ message: 'Поле обязательно для заполнения' })
    .min(25, 'Необходимо ввести комментарий'),

  requestType: z
    .string({ message: 'Поле обязательно для заполнения' })
    .min(1, 'Необходимо ввести тип запроса'),

  agree: z.literal(true, {
    errorMap: () => ({ message: 'Необходимо подтвердить согласие' }),
  }),
})
