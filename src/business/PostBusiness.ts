import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Post } from "../models/post";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager

    ) { }
    // metodos
    public createPost = async (
        input: CreatePostInputDTO
    ): Promise<CreatePostOutputDTO> => {
       const { name, token } = input;

       const payload = this.tokenManager.getPayload(token)

       if(!payload){
        throw new UnauthorizedError()
       }

       const id = this.idGenerator.generate()
       
       const post = new Post(
        id,
        name,
        0,
        0,
        new Date().toISOString(),
        new Date().toISOString(),
        payload.id,
        payload.name
       )
       const postDB = post.toDBModel()
        await this.postDatabase.insertPost(postDB)
        const output: CreatePostOutputDTO = undefined
        
        return output
    }
    public getPost = async ( 
        input: GetPostInputDTO
        ): Promise<GetPostOutputDTO> =>{
            const { token } = input
            const payload = this.tokenManager.getPayload(token)

            if(!payload){
             throw new UnauthorizedError()
            }
            const postAllDB = 
            await 
            this.postDatabase.getAllPost()            
            
            const posts = postAllDB
            .map((postAll)=>{
                const post = new Post(
                    postAll.id,
                    postAll.name,
                    postAll.likes,
                    postAll.dislikes,
                    postAll.created_at,
                    postAll.updated_at,
                    postAll.creator_id,
                    postAll.creator_name 
                )
                return post.toBusinessModel()
            })
            
            const output: GetPostOutputDTO = posts
            return output
        }    
}