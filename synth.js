//create a synth and connect it to the main output (your speakers)
const synth = new Tone.PolySynth().toDestination();

let i = 0;




let Snotes = ['c','c#','d','d#','e','f','f#','g','g#','a','a#','b'];

let SfullNotes = fullNotes(Snotes);

function fullNotes(notesIn){
    arr = [];
    for (i=0;i<7;i++){
        for(j=0;j<notesIn.length;j++){
            arr.push(Snotes[j]+i);
        }
    }
    return arr;
}

function notetoSynth(note){
    let out = SfullNotes[(note+40)];
    return out;
}

function StabtoSynth(tab){
    // Take in a tab and coverts to 'c4'
    let out = [];
    for (i=0;i<tab.length;i++){
        out.push(notetoSynth(tab[i]));
    }
    return out;
}






let timer = null; // Used for the interval


function startNotes(state){
    switch (state) {
        case true:  
            if (timer == null){
                startTimer();
            }
            break;
        case false:
            stopTimer();
            break;
        default:
            console.log("default");
            break;
    }
}
let noteTimer = -1; // Used to keep track of notes
let tempo = 60;

function startTimer(tab){
    timer = setInterval(()=>{
        // Output array on beat
        let tab = StabtoSynth(tabTemp);
        if (noteTimer < tab.length-1){
            noteTimer ++;
            console.log(tab[noteTimer]);
            synth.triggerAttackRelease(tab[noteTimer],'8n');
        } else {
            stopTimer();
        }
    },Math.floor(1000/6)/tempo);
    
}

function stopTimer(){
    clearInterval(timer);
    timer = null;
    noteTimer = -1;
}

let start = document.querySelector("#play1");
let stop = document.querySelector("#stop");

start.addEventListener("click",()=>{
    console.log(tabTemp);
    startNotes(true);
})
stop.addEventListener("click",()=>{
    startNotes(false);
})
