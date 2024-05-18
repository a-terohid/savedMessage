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
        default: "Uncategorized"
    },

} , { collection : "saved-message-message" } )

const message = models.message || model("message", MessageSchema);

export default message;