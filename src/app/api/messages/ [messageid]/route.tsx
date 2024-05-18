import { ERROR, MESSAGE } from "@/types/enum";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { Types } from "mongoose";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";
import message from "@/models/Message";


export async function DELETE( req : Request, context : any ) {

    try{

        await connectDB()

        const id = context.params.messageid
        
        const session = await getServerSession( authOptions )
        if ( !session ) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        const user  = await User.findOne({ email : session?.user?.email })
        if( !user ) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        const Message = await message.findOne({ _id : id })

            if( !Message ){
                return NextResponse.json(
                    { error: ERROR.CANT_FIND_ADVERTISMEnT },
                    { status: 404 }
                );
            }


            if( !user._id.equals(Message.UserId) ) {
                return NextResponse.json(
                    { error: ERROR.AD_ACCESS },
                    { status: 403 }
                );
            }

            await Message.deleteOne({ _id: id });


            return NextResponse.json(
                { message: MESSAGE.MG_DELETE },
                { status: 200 }
              );

    } catch( e ) {
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}