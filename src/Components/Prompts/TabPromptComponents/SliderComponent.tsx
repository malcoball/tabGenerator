import { Slider } from "@mui/material"

type sliderProps = {
    title : string,
    value : number, setValue: (event: Event, newValue: number | number[]) => void,
    min : number,max : number
}
const SliderComponent = (props:sliderProps)=>{
    const {title,value,setValue,min,max} = props;
    return (
        <div className="sliderComponent newtabComponent col8">
            <section className="topSection ">
                <span className="col1">{title}</span>
            </section>
            <section className="bottomSection borderCol7">
                <span className="bottomSpan">{value}</span>
                <Slider className="bottomSpan" aria-label={title} value={value} onChange={setValue} min={min} max={max}/> 
            </section>
        </div>
    )
}
SliderComponent.defaultProps = {
    min : 0
}
export default SliderComponent