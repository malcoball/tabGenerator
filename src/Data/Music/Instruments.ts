import { instrument } from "../@types/types";
import { breakPoints } from "../StaticFunctions";

type InstrumentsProperties = {
    bass : instrument,
    guitar : instrument,
    getSingle : {
        breakPoints : (instrumentName : instrumentProperty)=> any
        stringNames : (instrumentName : instrumentProperty)=> any
        all :(instrumentName : instrumentProperty)=>any
    },
}
type instrumentProperty = keyof typeof Instruments;

export const Instruments : InstrumentsProperties = {
    bass : {
        name:'bass',
        breakPoints : [0,5,10,15],
        stringNames : ['E','A','D','G'],
        rootNote : 'E2'
    },
    guitar : {
        name:'guitar',
        breakPoints : [0,5,10,15,19,24],
        stringNames : ['E','A','D','G','B','e'],
        rootNote : 'E3'
    },
    getSingle : {
        breakPoints : (instrumentName : instrumentProperty)=>{
            return Instruments[instrumentName].breakPoints;
        },
        stringNames : (instrumentName : instrumentProperty)=>{
            return Instruments[instrumentName].stringNames;
        },
        all : (instrumentName : instrumentProperty) =>{
            return Instruments[instrumentName];
        },
    },
};
export const InstrumentsAll = {
    // Tried to put this in the object above but good ol TS wasn't having it, maybe future me can fix it. This ain't bad though
    getAll : {
        names : ()=>{
            // Didn't see the point in looping over 3 objects
            return ['bass','guitar']; 
        }
    }
}
