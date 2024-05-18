import { ERROR, MESSAGE } from "@/types/enum";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";


export async function POST( req : Request ){

    try{

        await connectDB()

        const { category } = await req.json()
        

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


        if( !category )
            {
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }
            
            const IsCategory = user.Categories.includes(category)
            if( IsCategory ){
                return NextResponse.json(
                    { error: ERROR.REPETE_CATEGORY },
                    { status : 422 }
                )
            }        

            

            const categories = [...user.Categories , category] 
            console.log("categories" , categories);
            
            
            user.Categories = categories
            user.save()
            


            return NextResponse.json(
                { message: MESSAGE.NEW_CATEGORY },
                { status: 201 }
            );

    } catch( err ){
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}


export async function DELETE( req : Request ){

    try{

        await connectDB()

        const { category } = await req.json()
        

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


        if( !category )
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

            

            const categories = user.Categories.filter((cat : String) => cat !== category);

        
            user.Categories = categories
            user.save()
            


            return NextResponse.json(
                { message: MESSAGE.CATEGORY_DELETE },
                { status: 201 }
            );

    } catch( err ){
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}