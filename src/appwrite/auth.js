import { Navigate } from "react-router-dom";
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.account = new Account(this.client);
  }

  async CreateAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
       // ✅ Add this line
      if (userAccount) {
        await this.LoginAccount({ email, password });
        console.log("User created:", userAccount);
        return userAccount;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async LoginAccount({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Session created:", session); // ✅ Add this line
      return session;
    } catch (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  }

  async getCurrentuser() {
    try {
        const session = await this.account.getSession('current');
        console.log("✅ Session found:", session);  // ✅ Log for confirmation
        return await this.account.get(); 
    } catch (err) {
        console.warn("⚠️ No active session found — likely logged out user.");
        return null;  // ✅ Return `null` instead of crashing
    }
}


  async LogoutAccount() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      throw new Error("Failed to logout");
    }
    return null;
  }
}
const authService = new Authservice();

export default authService;
