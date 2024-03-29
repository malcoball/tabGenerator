import { instrumentName, note, noteLengths } from "./@types/types";
import { Instruments } from "./Music/Instruments";

interface breakPointLine {
    parseFull : (noteIn : string,instrument:instrumentName)=>string[]
}
interface breakPointType {
    get : (noteIn:string,breakPoints:number[])=>number,
    parseNote : (noteIn:string,breakPoint:number)=>string,
    parseFull : (noteIn:string,breakPointInput:breakPointInput)=>{note:string,breakPoint:number},
    line : breakPointLine
}
type breakPointInput = number[];

const marker1 = '-';

export const breakPoints : breakPointType = {
    get : (noteIn:string,breakPoints:breakPointInput)=>{
        // Pass a note in "12" and returns which string to play on "2"
        let out = breakPoints.length-1;
        for (let i =0; i < breakPoints.length-1; i++){
            let noteNumber = parseInt(noteIn);
            if (noteNumber >= breakPoints[i] && noteNumber < breakPoints[i+1]){
                out = i;
            }
        }
        return out;
    },
    parseNote : (noteIn:string,breakPoint:number)=>{
        const noteInParse = parseInt(noteIn);
        return breakPoint === 0 ? (noteInParse).toString() : (noteInParse-5).toString();
    },
    parseFull : (noteIn:string,breakPointsInput:breakPointInput)=>{
        // Takes the note and breakpoints and returns the changed note and the single breakpoint
        const breakPointOut = breakPoints.get(noteIn,breakPointsInput);
        const noteOut = breakPoints.parseNote(noteIn,breakPointOut);
        return {note:noteOut,breakPoint:breakPointOut};
    },
    line :{
        parseFull : (noteIn:string,instrument:instrumentName)=>{
            // Place note in the correct line pretty much
            let breakpoints = Instruments[instrument].breakPoints;
            const noteString = breakPoints.get(noteIn,breakpoints);
            let out = [];
            for (let i = 0; i < breakpoints.length; i++){
                noteString === i ? out.push(parseInt(noteIn)-breakpoints[noteString]+"") : out.push(marker1)
            }
            return out;
        }
    }
}

export const conversions = {
    noteTo : {
        tone : (noteIn:note) :note =>{
            // Get the ocatave and note
            let octave = 0;
            let noteNum = parseInt(noteIn.note);
            while (noteNum >= 12){
                octave ++;
                noteNum -= 12;
            }
            const out = {
                note : conversions.misc.numberToNote(noteNum)+octave.toString(),
                length : noteIn.length}
            return out;
        },
        noteLetter : (noteIn:string) : string=>{
            return conversions.noteTo.tone({note:noteIn,length:'1n'}).note;
        }
    },
    noteLetterTo:{
        number:(noteLetter:string)=>{
            const letter = conversions.misc.noteToNumber(noteLetter.charAt(0));
            const number = parseInt(noteLetter.slice(1)) * 12;
            return letter + number;
        }
    },
    length : {
        bpm : {
            bpmToMilisecond : (bpm:number)=>{
                // Get the difference of bpm and 60
                let diff = bpm / 60; // 120 / 60 = 0.5;
                return 4000 / diff;
            },
        },
        note :{
            noteToMilisecond : (noteLength:noteLengths,bpm:number)=>{
                const bpmDiff = conversions.length.bpm.bpmToMilisecond(bpm);
                const noteLengthNumber = parseInt(noteLength.slice(0,noteLength.length-1));
                return bpmDiff / noteLengthNumber;
            }
        },
        toNumber:(noteLength:noteLengths)=>{
            // Used in other functions to help parse data.
            // Should not be used for display as it wont make sense
            switch (noteLength){
                case "32n": return 0;
                case "16n": return 1;
                case "8n":  return 2;
                case "4n":  return 3;
                case "2n":  return 4;
                case "1n":  return 5;
            }
        },
        toTabShorten : (noteLength:noteLengths,shortestNote:noteLengths)=>{
            // Tells the display how many times to repeat a note to show it's timing.
            const shortestNoteIn = conversions.length.toNumber(shortestNote);
            const numberIn = conversions.length.toNumber(noteLength);
            const dataIn = numberIn - shortestNoteIn;
            switch (dataIn){
                case 0:  return 0;
                case 1:  return 1; // +1
                case 2:  return 3; // +2
                case 3:  return 7; // +4
                case 4:  return 15;// +8
                case 5:  return 31;// +16
                default : return 0;
            }
        },
        toBooleans : (noteLength:noteLengths|string)=>{
            const test = ['1n','2n','4n','8n','16n','32n']
            const out:boolean[] = [];
            test.forEach((item)=>{
                noteLength === item ? out.push(true) : out.push(false);
            })
            return out;
        }
    },
    lengths : {
        booleansToLengths : (booleans:boolean[]):noteLengths[]=>{
            const out:noteLengths[] = [];
            const getValue = (index:number)=>{
                switch(index){
                    case 0 :    return '1n'; 
                    case 1 :    return '2n'; 
                    case 2 :    return '4n'; 
                    case 3 :    return '8n'; 
                    case 4 :    return '16n';
                    case 5 :    return '32n';
                    default : console.log("weird stuff here dude");   return '32n';
                }
            }
            booleans.forEach((item,index)=>{
                if (item === true){
                    out.push(getValue(index));
                }
            })
            return out;
        },
    },
    misc : {
        noteToNumber : (note:string)=>{
            switch(note.toUpperCase()){
                case  "C" : return 0;
                case "C#" : return 1;
                case  "D" : return 2;
                case "D#" : return 3;
                case  "E" : return 4;
                case  "F" : return 5;
                case "F#" : return 6;
                case  "G" : return 7;
                case "G#" : return 8;
                case  "A" : return 9;
                case "A#" : return 10;
                case  "B" : return 11;
                default : console.error(note, " not recognised."); return 0;
            }
        },
        numberToNote : (number:number)=>{
            switch(number){
                case 0  : return "C";
                case 1  : return "C#";
                case 2  : return "D";
                case 3  : return "D#";
                case 4  : return "E";
                case 5  : return "F";
                case 6  : return "F#";
                case 7  : return "G";
                case 8  : return "G#";
                case 9  : return "A";
                case 10 : return "A#";
                case 11 : return "B";
                case 12 : return "C";
                default : console.error (number + "not recognised.");return "";
            }
        }
    },
}
export const getShortestNote = (notesIn:noteLengths[])=>{
    type lengthType = {
        length : noteLengths,
        number : number
    }
    let shortestLength :lengthType ={
        length : notesIn[0],
        number : conversions.length.toNumber(notesIn[0])
    } ;
    
    notesIn.forEach(note =>{
        if (conversions.length.toNumber(note) < shortestLength.number){
            shortestLength = {
                length : note,
                number : conversions.length.toNumber(note)
            }
        }
    });
    return shortestLength;
}
export const keyMethods = {
    fileKey : {
        create : (title:string,type:'tab'|'effect')=>{
            
            const fileType = type === 'tab' ? '.tb' : '.et';
            return title + fileType;
        },
        parse : (key : string)=>{
            return key.slice(0,key.length-3);
        },
        getType : (key : string|null)=>{
            if (key === null) return console.error("null innit");
            const type = key.charAt(key.length-1) === 'b' ? 'tab' : 'effect';
            return type;
        }
    }
}