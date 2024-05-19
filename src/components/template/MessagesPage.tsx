import Sidebar from '@/layout/Sidebar';
import Card from '@/module/Card';
import { ERROR } from '@/types/enum';
import { Capitaliz } from '@/utils/capitalize';

const MessagesPage = ({ data , params , categories }:any) => {

    return (
        <div className='container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-4 mt-4 pb-10' >
            <div >
                <Sidebar params={params} Categories={categories} />
            </div>
            <div className=' bg-Dark_gray w-full  rounded-xl shadow-xl py-8 px-6 ' >
                { params ? <p className=' md:text-2xl text-lg mb-4 font-Grandstander  font-bold' >{ Capitaliz(params) }: </p> : null }
                <div className='flex flex-wrap gap-6 items-center justify-center' >
                    { data.length ? null : 
                            <p className=' font-bold ml-5 mt-4 text-sm text-orange' >{ ERROR.NO_MS }</p> }
                    { data.map(( message : any ) => (
                        <Card key={ message._id } data={message}  />))
                    }
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;