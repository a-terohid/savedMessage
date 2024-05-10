import { InputType } from "@/types/types";


const Input = ( { changeHandler , value, label , type , name , textarea = false  } : InputType ) => {

    return (
        <div className="flex flex-col gap-y-2 " >
            <label >{ label }</label>
            {
                textarea ? 
                    <textarea 
                    value={ value }
                    name={ name }  
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-4 rounded text-Dark py-2 pl-3 text-sm w-[200px] h-[100px] "  />
                : 
                    <input 
                    type={ type }
                    value={ value }
                    name={ name }  
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-4 rounded text-Dark py-2 pl-3  text-sm w-[200px]"  /> 
            }
        </div>
    );
};

export default Input;