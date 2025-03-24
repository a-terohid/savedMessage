import Credentials from "@/models/Credentials";
import User from "@/models/User";
import { ERROR, MESSAGE } from "@/types/enum";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST( req : Request ){

    try{

        await connectDB()

        const { 
            title,
            username,
            password,
        } = await req.json()

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

        if( !title ||
            !username ||
            !password )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }
     
            
            const newCredentials = await Credentials.create({
                title,
                username,
                password,
                UserId : new Types.ObjectId(user._id),
            })
            

            console.log( newCredentials );

            return NextResponse.json(
                { message: MESSAGE.NEW_CREDENTIALS },
                { status: 201 }
            );

    } catch( err ){
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}


export async function PATCH( req : Request ) {

    try{

        await connectDB()

        const { 
            _id,
            title,
            username,
            password,
        } = await req.json()


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


        if( !title ||
            !username ||
            !password )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }
     

            const Credential = await Credentials.findOne({ _id })

            if( !Credential ){
                return NextResponse.json(
                    { error: ERROR.CANT_FIND_Credential },
                    { status: 404 }
                );
            }


            if( !user._id.equals(Credential.UserId) ) {
                return NextResponse.json(
                    { error: ERROR.AD_ACCESS },
                    { status: 403 }
                );
            }


            Credential.title = title,
            Credential.username= username,
            Credential.password= password,
        
            Credential.save()

            return NextResponse.json(
                { message: MESSAGE.AD_EDITE },
                { status: 200 }
            );


    }  catch ( err ) {
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}
