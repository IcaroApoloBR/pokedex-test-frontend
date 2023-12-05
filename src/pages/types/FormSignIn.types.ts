import { z } from 'zod'

export const FormSignIn = z.object({
    email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido').toLowerCase().trim(),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
})

export type SignInDataProps = z.infer<typeof FormSignIn>