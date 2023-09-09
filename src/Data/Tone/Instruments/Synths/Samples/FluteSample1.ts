import * as Tone from 'tone';
import D2 from '../../../../../Assets/Audio/Samples/Flute1/D.wav';

import { synthType } from '../../../../@types/types';

const FluteSample1:synthType = {
    title:'Flute1',
    synth:new Tone.Sampler({
        urls: {
            D2: D2,
            
        },
    }).toDestination()
}
export default FluteSample1;
