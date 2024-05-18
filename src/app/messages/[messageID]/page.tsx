import message from "@/models/Message";
import DetailsPag from "@/template/DetailsPag";
import { ERROR } from "@/types/enum";
import connectDB from "@/utils/ConnectDB";


const page = async ({ params: { messageID } }:any) => {

    await connectDB()
    
    const Message = await message.findOne({ _id : messageID })
    

    if( !Message ) {
        return( <div className='flex items-center justify-center h-[500px]' >
                    <h3 className='font-bold text-2xl border-b-4 border-lightBlue py-2' >{ERROR.PROBLEM}2</h3>
                </div>)
    }

    return ( <DetailsPag Message={ Message } dashboard={ false } /> );
};

export default page;