import { Request } from 'express';
import { TokenPayload } from './token-payload.type';


export interface  CustomRequest extends Request { 
    user : TokenPayload
}