import * as Tone from 'tone';
import A2 from '../../../../../Assets/Audio/Samples/Bass1/A2.wav';
import D2 from '../../../../../Assets/Audio/Samples/Bass1/D2.wav';
import E2 from '../../../../../Assets/Audio/Samples/Bass1/E2.wav';
import G2 from '../../../../../Assets/Audio/Samples/Bass1/G2.wav';
import { synthType } from '../../../../@types/types';

const BassSample1:synthType = {
    title:'Bass1',
    synth:new Tone.Sampler({
        urls: {
            A3: A2,
            D3: D2,
            E2: E2,
            G3: G2
        },
    }).toDestination()
}
export default BassSample1;
