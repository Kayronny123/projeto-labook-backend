import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
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
  public editPost = async (
        input: EditPostInputDTO
    ): Promise<EditPostOutputDTO> => {
       const {name, token, idToEdit } = input;

       const payload = this.tokenManager.getPayload(token)

       if(!payload){
        throw new UnauthorizedError()
       }
       const postDB = await this.postDatabase.findPostById(idToEdit)
       
        if(!postDB){
            throw new NotFoundError("Não existe post com essa ID")
        }
        if(payload.id !== postDB.creator_id){
            throw new ForbiddenError("Somento usuario criador pode editar post")
        }
    
        const post = new Post(
            postDB.id,
            postDB.name,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            payload.name
        );
        post.setName(name)    
        const updatedPostDB = post.toDBModel()
        await this.postDatabase.updatePost(updatedPostDB)
        const output: EditPostOutputDTO = undefined
        return output
    }       
}