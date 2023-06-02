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
    }