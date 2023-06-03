import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { TokenPayload, USER_ROLES, User } from "../models/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }
    // endpoints
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input;

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)
        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )
        const UserDB = user.toDBModel()
        await this.userDatabase.insertUser(UserDB);

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)
        const output: SignupOutputDTO = {
            token
        }
        return output
    };

    public login = async (
        input: LoginInputDTO
    ): Promise<LoginOutputDTO> => {
        const { email, password } = input

        const UserDB = await this.userDatabase.findUserByEmail(email)
        if (!UserDB) {
            throw new NotFoundError("Email e/ou senha inválido(s)")
        }
        
        const user = new User(
            UserDB.id,
            UserDB.name,
            UserDB.email,
            UserDB.password,
            UserDB.role,
            UserDB.created_at
        )
        const hashedPassword = user.getPassword()
        const isPasswordCorrect = await this.hashManager
        .compare(password,hashedPassword)
            if(!isPasswordCorrect){
                throw new BadRequestError("Email e/ou senha inválido(s)")
            }
            const payload: TokenPayload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            }
  
            const token = this.tokenManager.createToken(payload);
            const output: LoginOutputDTO={
                token
            }
            return output
        };
};