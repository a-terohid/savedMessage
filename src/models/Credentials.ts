import { Credentials_IF } from "@/types/types";
import { Schema, model, models } from "mongoose";

const Credentials_Schema = new Schema< Credentials_IF , Schema.Types.ObjectId >({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },

    password: {
        type : String,
        required : true,
    },

} , { collection : "saved-message-credentials" } )

const Credentials = models.Credentials || model("Credentials", Credentials_Schema);

export default Credentials;