import axios from "axios";


class PostService{
    constructor(){
        this.apiClient = axios.create({
            baseURL:'http://localhost:5555',
           
        })
        
    }


    async  getAllPosts(){
        const {data} =  await this.apiClient.get('/post/all')
        console.log(data);
        return data
    }
}



export const postService = new PostService()