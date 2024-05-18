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
            cost,
            category,
            address ,
            phone,
            realState,
            amenities ,
            rules,
            constructionDate,
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
            !cost ||
            !category ||
            !address  ||
            !phone ||
            !realState ||
            !constructionDate )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }


            const advertisement = await message.findOne({ _id })

            if( !advertisement ){
                return NextResponse.json(
                    { error: ERROR.CANT_FIND_ADVERTISMEnT },
                    { status: 404 }
                );
            }


            if( !user._id.equals(advertisement.UserId) ) {
                return NextResponse.json(
                    { error: ERROR.AD_ACCESS },
                    { status: 403 }
                );
            }


                advertisement.Title = title,
                advertisement.Description= description,
                advertisement.Cost= +cost,
                advertisement.Category= category,
                advertisement.Address= address ,
                advertisement.Phone= phone,
                advertisement.RealState= realState,
                advertisement.Amenities= amenities ,
                advertisement.Rules= rules,
                advertisement.ConstructionDate = constructionDate
                advertisement.Published = false
                advertisement.Rejected = true
                advertisement.RejectNUM = 0

                advertisement.save()

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


export async function DELETE( req : Request, context : any ) {

    try{

        await connectDB()

        const id = context.params.advetismentId

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