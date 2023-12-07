import { z } from 'zod'

export const FormSignIn = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format').toLowerCase().trim(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SignInDataProps = z.infer<typeof FormSignIn>