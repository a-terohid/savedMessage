import User from "@/models/User";
import { ERROR, MESSAGE } from "@/types/enum";
import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/ConnectDB";


export const POST= async ( req : Request ) => {
    
    try{

        await connectDB()

        const { email , password } = await req.json();
        console.log({ email , password });
        if( !email || !password ) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status : 422 }
            )
        }

        const existUser = await User.findOne({ email })
        if( existUser ){
            return NextResponse.json(
                { error: ERROR.USER_EXIST },
                { status : 422 }
            )
        }


        const hashedPassword = await hashPassword( password )

        const newUser = await User.create({
            email , 
            password : hashedPassword 
        })
        console.log( newUser );
    

        return NextResponse.json(
            { message : MESSAGE.NEW_USER },
            { status : 201 },
        )
        

    } catch( err ){

        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}