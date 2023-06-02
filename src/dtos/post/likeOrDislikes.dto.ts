import z from "zod";

export interface LikeOrDislikesPostInputDTO{
    postId: string,
    token: string,
    like: boolean
};

export type LikeOrDislikesPostOutputDTO = undefined;

export const LikesOrDislikesSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    like : z.boolean()
});