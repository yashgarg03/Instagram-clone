import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account } from "./config";

export function createUserAccount(user: INewUser) {
  try {
    let users: any = localStorage.getItem("users");
    users = JSON.parse(users);
    if (!users) {
      users = [];
    }
    let userFound = users.filter((u: any) => user.username == u.username);
    if(userFound.length != 0) {
      alert("Username already in use, please use different username");
      return;
    }
    users.push(user);
    let newUser = JSON.stringify(users);
    localStorage.setItem("users", newUser);
    let allUsers: any = localStorage.getItem("users");
    allUsers = JSON.parse(allUsers);
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}
