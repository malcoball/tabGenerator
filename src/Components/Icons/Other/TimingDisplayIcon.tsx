import './Styles/TimingDisplayIconStyle.css';

type props = {
    left : number
}
const TimingDisplayIcon = (props:props)=>{
    return <div id="TimingDisplayIcon" style={{left:`${props.left}%`}}>
        <span></span>
    </div>
}
export default TimingDisplayIcon;