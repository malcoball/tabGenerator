import { scale } from "../@types/types"

type scalesType = {
    ionian : scale,
    dorian : scale,
    phrygian : scale,
    lydian : scale,
    mixolydian : scale,
    aeolian : scale,
    locrian : scale,
}

const scales : scalesType = {
    ionian:{
        name : 'ionian',
        scale : [0,2,4,5,7,9,11]
    },
    dorian : {
        name : 'dorian',
        scale : [0,2,3,5,7,9,11]
    },
    phrygian : {
        name : 'phrygian',
        scale : [0,1,3,5,7,8,10]
    },
    lydian : {
        name : 'lydian',
        scale : [0,2,4,6,7,9,11]
    },
    mixolydian : {
        name : 'mixolydian',
        scale : [0,2,3,5,7,8,10]
    },
    aeolian : {
        name : 'aeolian',
        scale : [0,2,3,5,7,8,10]
    },
    locrian : {
        name : 'locrian',
        scale : [0,1,3,5,6,8,10]
    },
}
export const scaleMethods = {
    getAll : {
        name : ()=>{
            let out : string[] = [];
            for (let name in scales){
                out.push(name)
            }
            return out;
        }
    }
}
export default scales;