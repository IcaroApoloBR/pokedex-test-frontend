import { z } from 'zod'

export const SignUpSchema = z.object({
    name: z.string()
        .min(1, 'O nome de treinador é obrigatório')
        .transform(name => {
            return name.trim().split(' ')
                .map(word => word[0].toLocaleUpperCase().concat(word.substring(1))).join(' ')
        }),
    email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido').toLowerCase().trim(),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
    confirmPassword: z.string(),
    // confirmPassword: z.string().refine(data => data === data.password, {
    //     message: 'A confirmação da senha não confere.',
    // }),
})

export type SignUpDataProps = z.infer<typeof SignUpSchema>