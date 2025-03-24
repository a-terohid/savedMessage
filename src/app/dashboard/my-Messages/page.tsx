import User from "@/models/User";
import MymessagePage from "@/template/MymessagePage";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";
import { getServerSession } from "next-auth";


const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    const [user] = await User.aggregate([ 
        { $match: { email: session?.user?.email } } , 
        {
            $lookup: {
                from: "saved-message-message",
                foreignField: "UserId",
                localField: "_id",
                as: "message",
            }
        }
    ])

    const userMessage = user.message;
    
    
    return ( <MymessagePage userMessage={ userMessage }  /> );
};

export default page;