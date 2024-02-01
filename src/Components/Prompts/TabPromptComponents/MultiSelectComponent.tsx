
type sliderProps = {
    title : string,
    values : string[]|number[], activeValues:boolean[],
    updateValues : (index: number) => void
}
const MultiSelectComponent = (props:sliderProps)=>{
    const {title,values,activeValues,updateValues} = props;
    const Values = values.map((item,index)=>{
        const className = activeValues[index] ? "active" : "passive";
        return <span key={"select"+index} onClick={()=>{updateValues(index)}} className={className}>{item.toString().split("n")}</span>
    })
    return (
        <div className="multiSelectComponent newtabComponent col8">
            <section className="topSection">
                <span className="col1">{title}</span>
            </section>
            <section className="bottomSection borderCol7">
                {Values}
            </section>
        </div>
    )
}

export default MultiSelectComponent