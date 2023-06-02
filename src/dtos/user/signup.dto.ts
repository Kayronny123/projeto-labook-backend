import z from 'zod';

export interface SingupInputDTO{
    name: string,
    email: string,
    password: string
};

export interface SingupOutputDTO{
    token: string
};

export const SingupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5)
})