import * as Tone from 'tone';
import A3 from '../../../../../Assets/Audio/Samples/Guitar1/A3.mp3';
import B4 from '../../../../../Assets/Audio/Samples/Guitar1/B4.mp3';
import D3 from '../../../../../Assets/Audio/Samples/Guitar1/D3.mp3';
import E3 from '../../../../../Assets/Audio/Samples/Guitar1/E3.mp3';
import E4 from '../../../../../Assets/Audio/Samples/Guitar1/E4.mp3';
import G4 from '../../../../../Assets/Audio/Samples/Guitar1/G4.mp3';
import { synthType } from '../../../../@types/types';

const GuitarSample1:synthType = {
    title:'Guitar1',
    synth:new Tone.Sampler({
        urls: {
            A3: A3,
            B4:B4,
            D3:D3,
            E3:E3,
            E4:E4,
            G4:G4
        },
    }).toDestination()
}
export default GuitarSample1;
