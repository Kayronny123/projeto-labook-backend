import { UserDB } from "../models/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
     public static TABLE_USERS = "users"

        // metodos db

        public insertUser = async (userDb: UserDB): Promise<void> =>{
            await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDb)
        }
        public findUserByEmail = async (email: string): Promise<UserDB | undefined>=>{
            const [UserDB]  = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({email})
            return UserDB as UserDB | undefined
        }
    }