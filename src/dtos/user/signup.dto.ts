import z from 'zod';

export interface SignupInputDTO{
    name: string,
    email: string,
    password: string
};

export interface SignupOutputDTO{
    token: string
};

export const SignupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5)
}).transform(data => data as SignupInputDTO);