import { Message } from "@/types/types";
import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema< Message , Schema.Types.ObjectId >({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    Title:{
        type: String,
        required: true,
    },
    Description : {
        type: String,
        required: true,
    },

    Category: {
        type : String,
        required : true,
        default: ""
    },

} , { collection : "saved-message-user" } )

const MESSAGE = models.MESSAGE || model("MESSAGE", MessageSchema);

export default MESSAGE;