import * as Tone from 'tone';
import A3 from '../../../../../Assets/Audio/Samples/Piano1/A3.mp3';
import B3 from '../../../../../Assets/Audio/Samples/Piano1/B3.mp3';
import C4 from '../../../../../Assets/Audio/Samples/Piano1/C4.mp3';
import D4 from '../../../../../Assets/Audio/Samples/Piano1/D4.mp3';
import E4 from '../../../../../Assets/Audio/Samples/Piano1/E4.mp3';
import F4 from '../../../../../Assets/Audio/Samples/Piano1/F4.mp3';
import G4 from '../../../../../Assets/Audio/Samples/Piano1/G4.mp3';

import { synthType } from '../../../../@types/types';

const PianoSample:synthType = {
    title:'Piano1',
    synth:new Tone.Sampler({
        urls: {
            A3: A3,
            B3:B3,
            C4:C4,
            D4:D4,
            E4:E4,
            F4:F4,
            G4:G4
        },
    }).toDestination()
}
export default PianoSample;
