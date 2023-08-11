import * as Tone from 'tone';
import B3 from '../../../../../Assets/Audio/Samples/Banjo1/B3.wav';
import D2 from '../../../../../Assets/Audio/Samples/Banjo1/D2.wav';
import D3 from '../../../../../Assets/Audio/Samples/Banjo1/D3.wav';
import G2 from '../../../../../Assets/Audio/Samples/Banjo1/G2.wav';
import G3 from '../../../../../Assets/Audio/Samples/Banjo1/G3.wav';


import { synthType } from '../../../../@types/types';

const BanjoSample1:synthType = {
    title:'Banjo1',
    synth:new Tone.Sampler({
        urls: {
            B3:B3,
            D2:D2,
            D3:D3,
            G2:G2,
            G3:G3
        },
    }).toDestination()
}
export default BanjoSample1;
