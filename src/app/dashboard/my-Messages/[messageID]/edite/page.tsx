import message from '@/models/Message';
import User from '@/models/User';
import EditMessagePage from '@/template/EditMessagePage';
import { ERROR } from '@/types/enum';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async ({ params: { messageID } }:any) => {

    await connectDB()
    const session = await getServerSession( authOptions )
    const user = await User.findOne({ email : session?.user?.email })
    const Message = await message.findOne({ _id : messageID });


    if( !Message ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-lightBlue py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }
    return (<EditMessagePage Message={Message} user={user}  />);
};

export default page;