
import { ROLE } from "@/types/enum";
import { USER } from "@/types/types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<USER , Schema.Types.ObjectId>({
    name : {
        type: String,
        default : ""
    },
    lastName : {
        type: String,
        default : ""
    },
    email : {
        type: String,
        required : true,
        default : ""
    },
    password : {
        type : String,
        required: true,
        default : ""
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
    role : {
        type : String,
        required: true,
        default : ROLE.USER
    },
    numberOfMessages : {
        type: Number,
        default : 0
    },
    Categories: {
        type : [String],
        default : []
    }

    
} , { collection : "saved-message-user" })


const User = models.User || model("User", UserSchema);

export default User;