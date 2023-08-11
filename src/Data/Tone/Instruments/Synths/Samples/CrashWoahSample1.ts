import * as Tone from 'tone';
import A1 from '../../../../../Assets/Audio/Samples/CrashWoah/A1.wav';



import { synthType } from '../../../../@types/types';

const CrashWoahSample:synthType = {
    title:'Woah',
    synth:new Tone.Sampler({
        urls: {
            A1:A1,
            
        },
    }).toDestination()
}
export default CrashWoahSample;
