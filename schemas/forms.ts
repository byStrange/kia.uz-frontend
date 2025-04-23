import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'common_form.enter_valid_data',
    ),

  surname: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'common_form.enter_valid_data',
    ),

  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.startsWith('+'),
      'common_form.enter_international_phone_number',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'common_form.enter_valid_phone_number',
    ),
  email: z
    .string()
    .min(1, 'common_form.this_field_is_required')
    .email({ message: 'common_form.enter_valid_email' }),

  city: z
    .string()
    .min(1, 'common_form.this_field_is_required'),

  comment: z
    .string()
    .min(1, 'common_form.this_field_is_required')
    .min(25, 'common_form.minimum_chars_requirement'),

  requestType: z.string().min(1, 'common_form.this_field_is_required'),

  agree: z.literal(true, {
    errorMap: () => ({ message: 'common_form.must_agree_to_consent_privacy' }),
  }),
})

export const serviceForm = z.object({
  region: z.string().min(1, 'common_form.choose_region'),
  name: z.string().optional(),
  phone: z.string()
    .refine(
      (value) => value.startsWith('+'),
      'common_form.enter_international_phone_number',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'common_form.enter_valid_phone_number',
    ),

})


export const testDriveSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length > 1,
      'common_form.enter_valid_data',
    ),

  phone: z
    .string()
    .refine(value => value, 'common_form.this_field_is_required')
    .refine(
      (value) => !value || value.startsWith('+'),
      'common_form.enter_international_phone_number',
    )
    .refine(
      (value) =>
        !value ||
        value
          .replaceAll(' ', '')
          .match(/^[+]998([3785]{2}|(20)|(9[013-57-9]))\d{7}$/),
      'common_form.enter_valid_phone_number',
    ),

  region: z
    .string()
    .min(1, 'common_form.this_field_is_required'),

  comment: z
    .string()
    .min(1, 'common_form.this_field_is_required')
    .min(25, 'common_form.minimum_chars_requirement'),

  agree: z.literal(true, {
    errorMap: () => ({ message: 'common_form.must_agree_to_consent_privacy' }),
  }),
})
