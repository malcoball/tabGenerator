import * as Tone from 'tone';
import A2 from '../../../../../Assets/Audio/Samples/Bass2/A2.mp3';
import C3 from '../../../../../Assets/Audio/Samples/Bass2/C3.mp3';
import D3 from '../../../../../Assets/Audio/Samples/Bass2/D3.mp3';
import E2 from '../../../../../Assets/Audio/Samples/Bass2/E2.mp3';
import G3 from '../../../../../Assets/Audio/Samples/Bass2/G3.mp3';
import G4 from '../../../../../Assets/Audio/Samples/Bass2/G4.mp3';
import { synthType } from '../../../../@types/types';

const BassSample2:synthType = {
    title:'Bass2',
    synth:new Tone.Sampler({
        urls: {
            A2: A2,
            E2: E2,
            C3: C3,
            D3: D3,
            G3: G3,
            G4: G4
        },
    }).toDestination()
}
export default BassSample2;