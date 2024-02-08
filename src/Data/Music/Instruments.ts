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
export type instrumentProperty = keyof typeof Instruments;

export const Instruments : InstrumentsProperties = {
    bass : {
        name:'bass',
        breakPoints : [0,5,10,15],
        stringNames : ['E','A','D','G'],
        stringAmount : 4,
        fretAmount : 26,
        rootNote : 'E0',
        fretBoard : {
            widths : {
                start : 92, change : -2.5
            },
            stringIds : ['BassE','BassA','BassD','BassG']
        },

    },
    guitar : {
        name:'guitar',
        breakPoints : [0,5,10,15,19,24],
        stringNames : ['E','A','D','G','B','e'],
        stringAmount : 6,
        fretAmount : 26,
        rootNote : 'E0',
        fretBoard : {
            widths : {
                start : 92, change : -2.5
            },
            stringIds : ['GuitarE','GuitarA','GuitarD','GuitarG','GuitarB','Guitare']
        },
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
            // Didn't see the point in looping over 3 objects, 3? I can only see 2
            return ['bass','guitar']; 
        }
    },
}

