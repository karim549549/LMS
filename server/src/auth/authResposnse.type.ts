import { ROLE } from "@prisma/client";



export type  AuthRepsonse = {
    user : {
        email  :string , 
        id : string , 
        role :ROLE , 
        isProfileCompleted  : boolean, 
    }
}