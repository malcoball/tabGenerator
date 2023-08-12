import * as Tone from 'tone';
import E1 from '../../../../../Assets/Audio/Samples/Guitar2/E1.wav';
import A1 from '../../../../../Assets/Audio/Samples/Guitar2/A1.wav';
import D1 from '../../../../../Assets/Audio/Samples/Guitar2/D1.wav';
import G2 from '../../../../../Assets/Audio/Samples/Guitar2/G2.wav';
import B2 from '../../../../../Assets/Audio/Samples/Guitar2/B2.wav';
import { synthType } from '../../../../@types/types';

const AcousticGuitarSample1:synthType = {
    title:'AcousticGuitar1',
    synth:new Tone.Sampler({
        urls: {
            E1:E1,
            A1:A1,
            D1:D1,
            G2:G2,
            B2:B2,
        },
    }).toDestination()
}
export default AcousticGuitarSample1;
