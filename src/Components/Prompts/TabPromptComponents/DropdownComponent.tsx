import BtnIcon from "../../Icons/Buttons/BtnIcon"
import {useState} from 'react';


type dropdownProps = {
    title:string,
    activeValue : string,
    values : string[],
    updateState : any
}


const DropDownComponent = (props:dropdownProps)=>{
    const {title,activeValue,values,updateState} = props;
    const [show,setShow] = useState(false);
    const Values = values.map((item,index)=>{
        const className =`bgCol${index%2 + 6} col5 col2H clickable`;
        return <span className={className} onClick={()=>{updateState(item)}}>{item}</span>
    }
    )
    const toggleMenu = ()=>{
        setShow(!show);
    }
    return (
        <div className="dropdownComponent newtabComponent col8" onClick={toggleMenu}>
            <section className="topSection">
                <span className="col1">{title}</span>
            </section>
            <section className="bottomSection borderCol7">
                <div className="activeValueContainer">
                    <span className="activeValue">{activeValue}</span>
                </div>
                    {show && <div className="dropDownMenu" >
                    {Values}
                </div>}
                <BtnIcon icon="arrowDown"/>
            </section>
            
            
        </div>
    )
}
export default DropDownComponent;