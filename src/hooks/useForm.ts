import { useState } from "react"


export const useForm = ( initialState:any = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ( event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
        
        setValues({
            ...values,
            [ event.target.name ]: event.target.value

        })
    }
    const newValueForm = (newState:any) => {
        setValues(newState)
    }

    return [ values, handleInputChange, reset, newValueForm];

}