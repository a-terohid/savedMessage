import message from '@/models/Message';
import User from '@/models/User';
import CredentialsPage from '@/template/CredentialsPage';
import MessagesPage from '@/template/MessagesPage';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async ({ searchParams }:any) => {

     await connectDB();
        const session = await getServerSession( authOptions )
        const [user] = await User.aggregate([ 
            { $match: { email: session?.user?.email } } , 
            {
                $lookup: {
                    from: "saved-message-credentials",
                    foreignField: "UserId",
                    localField: "_id",
                    as: "Credentials",
                }
            }
        ])

    const userCredentials = user.Credentials;  

    return (<CredentialsPage userCredentials={userCredentials}  /> );
};

export default page;