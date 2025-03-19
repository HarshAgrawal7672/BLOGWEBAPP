import conf from '../conf/conf.js';
import {Client,Account ,ID} from "appwrite"


export class Authservice {
    client = new Client();
    account;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid);

        this.account = new Account(this.client)

    }

    async CreateAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            if (userAccount){
                this.LoginAccount({email, password} )
            }
            else{
                return userAccount ;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async LoginAccount({email, password}) {
        try {

             return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw new Error(error.message);
        }
                
    }

    async getCurrentuser(){
        try{
             return await this.account.get(); 
        }
        catch(err){
            return null;
        }
        
    }
    async LogoutAccount(){
        try{
             await this.account.deleteSessions(); 
        }
        catch(err){
            throw new Error('Failed to logout')
        }
        return null;
    }

}
const authService= new Authservice();

export default authService