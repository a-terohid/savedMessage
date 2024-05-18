
import { Capitaliz } from "@/utils/capitalize";
import Link from "next/link";
import { HiFilter } from "react-icons/hi";

const Sidebar = ({params , Categories}:any) => {

    return (
        <div className='flex overflow-auto gap-x-2 lg:flex-col lg:gap-y-3 h-fit bg-Dark font-Exo_2 text-f6 lg:w-fit lg:min-w-[230px] lg:py-4 px-4 rounded-xl shadow-xl py-3 ' >
            <p className="flex items-center gap-x-1" ><HiFilter/>Category:</p>
            <div className="flex font-bold md:gap-y-2 lg:flex-col gap-x-3 lg:pl-3" >
                <Link className= {` w-fit px-3 py-1 rounded-lg text-sm lg:text-base ${ !params ? "bg-Yellow text-Dark": "bg-Dark lg:bg-pinkBrown" } `} href='./messages' >All</Link>
                {
                    Categories.length ? Categories.map( (cat:any , index:any ) => (
                        <Link
                            key={ index }
                            href={{
                                pathname: "/messages",
                                query: { category: cat },
                            }}
                            className= {` w-fit px-3 py-1 rounded-lg text-sm lg:text-base ${ params == cat ? "bg-Yellow text-Dark": "bg-Dark" } `}
                            >
                            { Capitaliz( cat ) }
                            </Link> 
                    ) ) : null
                }
            </div>
        </div>
    );
};

export default Sidebar;