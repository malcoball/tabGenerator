import { FormEvent } from "react"

type DropDownProps = {
    onChangeFunc : (e:React.ChangeEvent<HTMLSelectElement>)=>void,
    options : string[],
    defaultOption : string,
}

const DropDown = (props:DropDownProps)=>{
    const Options = props.options.map((item,index) => <option key={index} value={item}>{item}</option>)
    return (
        <select defaultValue={props.defaultOption} onChange={(e)=>{props.onChangeFunc(e)}}>
            {Options}
        </select>
    )
}

export default DropDown;