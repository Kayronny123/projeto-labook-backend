export interface PostDB {
    id: string,
    creator_id: string,
    name: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
};

export interface PostAllDB{
    id: string,
    creator_id: string,
    name: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_name: string
}

export interface PostModel {
    id: string,
    name: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
};
export class Post {
    constructor(
        private id: string,
        private name: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) { }
    public getId(): string{
        return this.id
    };
    public setId(value: string): void{
        this.id = value
    };
    public getName(): string{
        return this.name
    };
    public setName(value: string): void{
        this.name = value
    };
    public getLikes(): number{
        return this.likes
    };
    public setLikes(value: number): void{
        this.likes = value
    };
    public getDislikes(): number{
        return this.dislikes
    };
    public setDislikes(value: number): void{
        this.dislikes = value
    };
    public getCreatedAt(): string{
        return this.createdAt
    };
    public setCreatedAt(value: string): void{
        this.createdAt = value
    };
    public getUpdateAt(): string{
        return this.updatedAt
    };
    public setUpdateAt(value: string): void{
        this.updatedAt = value
    };
    public getCreatorId(): string{
        return this.creatorId
    };
    public setCreatorId(value: string): void{
        this.creatorId = value
    };
     public getCreatorName(): string{
        return this.creatorName
    };
    public setCreatorName(value: string): void{
        this.creatorName = value
    };
    public toDBModel(): PostDB{
        return {
            id: this.id,
            creator_id: this.creatorId,
            name: this.name,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    };
    public toBusinessModel(): PostModel{
        return {
            id: this.id,
            name: this.name,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator:{
                id: this.id,
                name: this.name
            }
        }
    }

}