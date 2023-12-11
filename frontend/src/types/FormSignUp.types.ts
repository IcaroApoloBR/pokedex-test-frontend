import { z } from 'zod'

export const SignUpSchema = z.object({
    name: z.string()
        .min(1, 'Pokemon trainer name is required')
        .transform(name => {
            return name.trim().split(' ')
                .map(word => word[0].toLocaleUpperCase().concat(word.substring(1))).join(' ')
        }),
    email: z.string().min(1, 'Email is required').email('Invalid email format').toLowerCase().trim(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().nullable()
})

export type SignUpDataProps = z.infer<typeof SignUpSchema>