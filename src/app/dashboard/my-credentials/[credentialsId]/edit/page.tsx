import Credentials from '@/models/Credentials';
import User from '@/models/User';
import EditeCredentialPage from '@/template/EditeCredentialPage';
import { ERROR } from '@/types/enum';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async ({ params: { credentialsId } }:any) => {

    await connectDB()
    const session = await getServerSession( authOptions )
    const user = await User.findOne({ email : session?.user?.email })
    const Credential = await Credentials.findOne({ _id : credentialsId });


    if( !Credential ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-lightBlue py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }
    return (<EditeCredentialPage Credential={Credential} user={user}  />);
};

export default page;