import { FormEvent } from "react"

type DropDownProps = {
    onChangeFunc : (e:React.ChangeEvent<HTMLSelectElement>)=>void,
    options : string[]
}

const DropDown = (props:DropDownProps)=>{
    const Options = props.options.map((item,index) => <option key={index} value={item}>{item}</option>)
    return (
        <select onChange={(e)=>{props.onChangeFunc(e)}}>
            {Options}
        </select>
    )
}

export default DropDown;