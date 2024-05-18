import { Schema } from "mongoose"
import { ROLE } from "./enum"

export interface USER  {
    name ?: string,
    lastName ?: string,
    email : string,
    password : string,
    createdAt : Date,
    role : ROLE ,
    Categories: String[]
    numberOfMessages ?: number
}

export interface Message {    
   UserId : Schema.Types.ObjectId,
   Title : string
   Description : string
   Category : string 
}

export type InputType = {
    value : string,
    label : string,
    changeHandler : Function,
    type : string,
    name : string,
    textarea: boolean;
}


export type AuthType = {
    email : string,
    password : string,
}


export type dashboardLayoutProps ={
    children: React.ReactNode
    role: ROLE,
    email: string,
}

export type ProfilePageProps = {
    user : USER
}

type MessageMOGO = Message & {
    _id:  Schema.Types.ObjectId
}

type userMOGO = USER & {
    _id:  Schema.Types.ObjectId
}

export type cardProps = {
    data : MessageMOGO ,
    dashboard ?: boolean , 
    waiting ?: boolean ,
    admin ?: boolean,
    userID ?: string
}


export type DetailsPageProps = {
    Message : MessageMOGO
    dashboard ?: boolean , 
}
