import conf from '../conf/conf.js';
import {Client,ID,Databases,Storage,Query} from "appwrite"


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featureimage,status,userid}){
        try {
    
             return await this.databases.createDocument(conf.appwritedatabaseid,conf.appwritecollectionid,slug,{
                 title,
                 content,
                 featureimage,
                 status,
                 userid
             } )
            
        } catch (error) {
            console.log("appwrite service:: createPost error: " + error)
        }
    }
    async updatePost(slug,{title,content,featureimage,status}){
        try {
             return await this.databases.updateDocument(conf.appwritedatabaseid,conf.appwritecollectionid,slug,{
                 title,
                 content,
                 featureimage,
                 status
             } )
            
        } catch (error) {
            console.log("appwrite service:: updatePost error: " + error)
        }

    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwritedatabaseid,conf.appwritecollectionid,slug)
             return true;
            
        } catch (error) {
            console.log("appwrite service:: deletePost error: " + error)
            return false;
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(conf.appwritedatabaseid,conf.appwritecollectionid,slug)
            
        } catch (error) {
            console.log("appwrite service:: updatePost error: " + error)
            return false;
        }
    }

    async getAllPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwritedatabaseid,conf.appwritecollectionid,
            queries
            )
            
        } catch (error) {
            console.log("appwrite service:: getAllPosts error: " + error)
            return false;
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
            
            
        } catch (error) {
            console.log("appwrite service:: uploadfile error: " + error)
            return false;
        }
    }
    
    async deletefile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("appwrite service:: deletefile error: " + error)
            return false;
        }
    }

    getfilepreview(fileId){
       
        return this.bucket.getFilePreview(conf.appwritebucketid, fileId)
    }

}

const service=new Service();

export default service;