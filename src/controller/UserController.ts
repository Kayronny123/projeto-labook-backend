import { UserBusiness } from "../business/UserBusiness";
import {ZodError} from "zod";
import {Request, Response, response} from "express";
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/user/signup.dto";
import { LoginSchema } from "../dtos/user/login.dto";

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ){}
// endpoints
public signup = async (req: Request, res: Response) =>{
    try {
        const input = SignupSchema.parse({
            name: req.body.name,
            password: req.body.passowrd,
            email: req.body.email
        });
        const output = await this.userBusiness.signup(input);
        res.status(201).send(output);


    } catch (error) {
        console.log(error);
        if(error instanceof ZodError){
            res.status(400).send(error.issues)
        } else if (error instanceof BaseError){
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Error inesperado")
        }
    }
}
public login = async (req: Request, res:Response)=>{
    try {
    const input = LoginSchema.parse({
        email: req.body.name,
        password: req.body.passowrd
    })       

    const output = await this.userBusiness.login(input);
    res.status(200).send(output)

    } catch (error) {
        console.log(error);
        if(error instanceof ZodError){
            res.status(400).send(error.issues)
        } else if (error instanceof BaseError){
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Error inesperado")
        }
    }
}
}