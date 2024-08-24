import * as z from 'zod'

const passwordRequirements = [
  {
    regex: /^.{8,}$/,
    message: 'Password must be exactly 8 characters long',
  },
  {
    regex: /[a-z]/,
    message: 'Password must contain at least one lowercase letter',
  },
  {
    regex: /[A-Z]/,
    message: 'Password must contain at least one uppercase letter',
  },
  {
    regex: /\d/,
    message: 'Password must contain at least one number',
  },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    message: 'Password must contain at least one special character',
  },
  {
    regex: /^(?!.*(.)\1{2,}).*$/,
    message:
      'Password must not contain repeating characters more than twice in a row',
  },
  {
    regex: /^(?!.*(?:password|12345678|abcdefgh|qwertyui)).*$/i,
    message: 'Password must not be a common pattern',
  },
]

const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, {
        message: 'Display name must be at least 2 characters',
      })
      .max(50, {
        message: 'Display name must not exceed 50 characters',
      }),
    username: z.string().trim().regex(usernameRegex, {
      message:
        'Username must be 3-30 characters long and can only contain letters, numbers, underscores, and hyphens',
    }),
    email: z.string().trim().regex(emailRegex, {
      message: 'Invalid email address',
    }),
    password: z
      .string()
      .trim()
      .superRefine((password, ctx) => {
        const failedRequirements = passwordRequirements.filter(
          (requirement) => !requirement.regex.test(password)
        )

        failedRequirements.forEach((requirement) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: requirement.message,
          })
        })
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type signUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required.',
  }),
})

export type loginValues = z.infer<typeof loginSchema>

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().length(8, {
      message: 'Current password must be exactly 8 characters long.',
    }),
    newPassword: z
      .string()
      .trim()
      .superRefine((password, ctx) => {
        const failedRequirements = passwordRequirements.filter(
          (requirement) => !requirement.regex.test(password)
        )

        failedRequirements.forEach((requirement) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: requirement.message,
          })
        })
      }),
    confirmNewPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.newPassword !== data.password, {
    message: 'New password must be different from the current password',
    path: ['newPassword'],
  })

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export const newPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .superRefine((password, ctx) => {
      const failedRequirements = passwordRequirements.filter(
        (requirement) => !requirement.regex.test(password)
      )

      failedRequirements.forEach((requirement) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: requirement.message,
        })
      })
    }),
})

export type newPasswordValues = z.infer<typeof newPasswordSchema>

export const ResetSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address',
  }),
})

export type ResetValues = z.infer<typeof ResetSchema>

export const updateUserDetailsSchema = z.object({
  displayName: z.string().trim().min(1, {
    message: 'Display name must be at least 1 character',
  }),
  username: z
    .string()
    .trim()
    .min(3, {
      message: 'Username must be at least 3 characters long',
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, underscores, and hyphens',
    }),
})

export type UpdateUserDetailsValues = z.infer<typeof updateUserDetailsSchema>
