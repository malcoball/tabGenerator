import {Slider} from '@mui/material';

type props = {
    title:string,
    active:boolean,
    changeValue : (event: Event, newValue: number | number[], valueTarget:number) => void,
    value : number[],
    settings : {
        name:string,
        min : number,
        max : number,
        steps: number
    }[]
}
const DataSection = (props:props)=>{
    const {value,title,changeValue,settings} = props;
    const Sliders = settings.map((item,index)=>{
           const currentValue = value[index];
            return <Slider className="slider" value={currentValue} step={settings[index].steps}
            min={settings[index].min} max={settings[index].max} onChange={(event,value)=>{changeValue(event,value,index)}}/>}
    )
    // const Sliders = value.map((item,index)=>
    //     <Slider className="slider" value={item} step={settings[index].steps}
    //     min={settings[index].min} max={settings[index].max} onChange={(event,value)=>{changeValue(event,value,index)}}/>
    // )
    const DataSection = value.map((item,index)=>{
        return <div className="dataSection">
            <span>{item}</span>
            <br/>
            <span className="valueName">{settings[index].name}</span>
        </div>
    })
    return (
        <>
            <div className="sliderContainer">
                {Sliders}
            </div>
            <div className="dataDisplay bgCol6">
                <span>{title}</span><br></br>
                <hr></hr>
                <div className="dataSectionContainer">
                    {DataSection}
                </div>
                <div className="dataDisplayOverlay"></div>
            </div>
        </>
    )
}
export default DataSection;