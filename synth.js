//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

// Sampler
const sampler = new Tone.sampler({
    urls: {
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
    },
    baseUrl: "Assets/Snd/Bass 1",
}).toDestination();

Tone.loaded().then(() => {
    sampler.triggerAttackRelease(["E3", "G3", "B3"], 0.5);
})

const bpmIn = document.querySelector("#bpm");

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
        out.push(notetoSynth(tab[i].note));
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

const bpm = (bpm)=>{
    const num = 500;
    let out = (num)/(bpm/60);
    return out;
}


// Plays the synth/music
function startTimer(tab){
    noteTimer = 0;
    let playLast = false;
    timer = setInterval(()=>{


        // Output array on beat
        let tab = StabtoSynth(tabTemp);
        if (noteTimer < tab.length){
            let timing = tabTemp[noteTimer].leng;

            // Show the note that's being played
            showNote(`#note${noteTimer}`);
            if (noteTimer > 0){
                hideNote(`#note${noteTimer-1}`);
            }

            if (timing == "4n"){
                // Long note playing
                if (playLast == false){
                    sampler.triggerAttackRelease(tab[noteTimer],"4n");
                    playLast = true;
                } else {
                    // Empty frame
                    playLast = false;
                    noteTimer ++;
                }
            } else {

                // Short note playing
                sampler.triggerAttackRelease(tab[noteTimer],"8n");
                noteTimer ++;
            }
            
        } else {
            hideNote(`#note${noteTimer-1}`);
            stopTimer();
        }
    },bpm(parseInt(bpmIn.value)));
    
}

function stopTimer(){
    clearInterval(timer);
    timer = null;
    noteTimer = -1;
}

function showNote(target){
    let a = document.querySelector(target);
    a.className = "playing";
}
function hideNote(target){
    if (target != null){
        let a = document.querySelector(target);
        a.classList.remove("playing");
    }
}


let start = document.querySelector("#play1");
let stop = document.querySelector("#stop");

start.addEventListener("click",()=>{
    startNotes(true);
})
stop.addEventListener("click",()=>{
    startNotes(false);
})
