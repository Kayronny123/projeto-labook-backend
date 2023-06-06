import { PostAllDB, PostDB } from "../models/post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POST = "post"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
    // metodos DB
    public insertPost = async (
        postDB: PostDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .insert(postDB)
    }
    public getAllPost = async (
    ): Promise<PostAllDB[]> => {
        const result: PostAllDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POST)
            .select(
                `${PostDatabase.TABLE_POST}.id`,
                `${PostDatabase.TABLE_POST}.creator_id`,
                `${PostDatabase.TABLE_POST}.name`,
                `${PostDatabase.TABLE_POST}.likes`,
                `${PostDatabase.TABLE_POST}.dislikes`,
                `${PostDatabase.TABLE_POST}.created_at`,
                `${PostDatabase.TABLE_POST}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`,
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${PostDatabase.TABLE_POST}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id,`,
            )
        return result as PostAllDB[]
    }
}