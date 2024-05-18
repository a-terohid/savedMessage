import { ERROR, MESSAGE } from "@/types/enum";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { Types } from "mongoose";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";
import message from "@/models/Message";


export async function POST( req : Request ){

    try{

        await connectDB()

        const { 
            title,
            description,
            category,
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
            !description ||
            !category )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }

            const IsCategory = user.Categories.includes(category)
            if( !IsCategory ){
                return NextResponse.json(
                    { error: ERROR.INVALID_CATEGORY },
                    { status : 422 }
                )
            }            

            
            const newMessage = await message.create({
                Title : title,
                Description: description,
                Category: category,
                UserId : new Types.ObjectId(user._id),
            })
            

            console.log( newMessage );

            return NextResponse.json(
                { message: MESSAGE.NEW_ADVERTISEMENT },
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
            description,
            category,
            address  } = await req.json()


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
            !description ||
            !category )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }


            const Message = await message.findOne({ _id })

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


            Message.Title = title,
            Message.Description= description,
            Message.Category= category,
        
            Message.save()

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
