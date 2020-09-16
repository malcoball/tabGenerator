//DOM
let eOut = document.querySelector("#e");
let aOut = document.querySelector("#a");
let dOut = document.querySelector("#d");
let gOut = document.querySelector("#g");

let mainEOut    = document.querySelector("#bige");
let mainAOut    = document.querySelector("#biga");
let mainDOut    = document.querySelector("#bigd");
let mainGOut     = document.querySelector("#bigg");

// Inputs
let scaleIn     = document.querySelector("#scales");
let lengthIn    = document.querySelector("#length");
let rootIn      = document.querySelector("#root");

let btn1    = document.querySelector("#btn1");
let btn2    = document.querySelector("#btn2");

// Scales
let minorPentatonicScale    = [0,3,5,7,10];
let majorPentatonicScale    = [0,2,4,7,9];
let bluesScale              = [0,3,5,6,7,10,12];
let ionianScale             = [0,2,4,5,7,9,11,12];
let aeolianScale            = [0,2,3,5,7,8,10,12];
let dorianScale             = [0,2,3,5,7,9,10,12];
let phyrygianScale          = [0,1,3,5,7,8,10,12];
let lydianScale             = [0,2,4,6,7,9,11,12];

let scales = [minorPentatonicScale,majorPentatonicScale,bluesScale,ionianScale,aeolianScale,dorianScale,phyrygianScale,lydianScale];

let scalesObj = [
    {name: "minorPentatonic",   scale: scales[0]},
    {name: "majorPentatonic",   scale: scales[1]},
    {name: "blues",             scale: scales[2]},
    {name: "ionian",            scale: scales[3]},
    {name: "aeolian",           scale: scales[4]},
    {name: "dorian",            scale: scales[5]},
    {name: "phyrygian",         scale: scales[6]},
    {name: "lydian",            scale: scales[7]}
]

let tabTemp = []; // Used so the synth can play
let tabPerm = [];

const marker = "_";





function tabArray(pick, length, root, chance){
    let chose = scales[pick];
    let bars = (length*4);
    let len = chose.length;
    let riff = [];
    for (i=0; i<bars; i++){
        
        // Add the root note
        if (i==0){
            riff.push({note : root,leng : "8n"});
        } else {
            let lengChose = Math.floor(2*(Math.random()));
            if (lengChose == 0){
                // Random number
                let num = Math.floor(Math.random()*len);

                riff.push({note : chose[num]+root,leng : "8n"});
            } else {
                // Random number
                let num = Math.floor(Math.random()*len);

                riff.push({note : chose[num]+root,leng : "4n"});
            }
        }
    }
    tabTemp = riff;
    return riff;
}



function arrtoTab(tab){
    // Used to generate the tab format
    let e = [];
    let a = [];
    let d = [];
    let g = [];

    let len = tab.length;


    for(i=0;i<len;i++){
        let x = tab[i].note;
        // Push the note to a string and marker to other strings

        if (x < 5) e.push(x);
        else e.push(marker);
        if ((x >= 5) && (x <10)) a.push(x-5);
        else a.push(marker);
        if ((x >= 10) && (x <15)) d.push(x-10);
        else d.push(marker);
        if (x >= 15) g.push(x-15);
        else g.push(marker);
    }
    let arr = [e,a,d,g];
    return arr;
}

function outputTab(arr){
    eOut.innerHTML = "[";
    aOut.innerHTML = "[";
    dOut.innerHTML = "[";
    gOut.innerHTML = "[";
    // Verticle loop
    for (i=0; i<arr.length; i++){
        // Horizontal loop
        for (j=0; j<arr[0].length; j++){
            switch(i){
                case 0 : 
                    if (arr[i][j] != marker){
                        eOut.innerHTML += `<td id="note${j}">${arr[i][j]}</td>`;
                    } else {
                        eOut.innerHTML += `<td>${arr[i][j]}</td>`;
                    }
                    break;
                case 1 : 
                    if (arr[i][j] != marker){
                        aOut.innerHTML += `<td id="note${j}">${arr[i][j]}</td>`;
                    } else {
                        aOut.innerHTML += `<td>${arr[i][j]}</td>`;
                    }
                    break;
                case 2 : 
                    if (arr[i][j] != marker){
                        dOut.innerHTML += `<td id="note${j}">${arr[i][j]}</td>`;
                    } else {
                        dOut.innerHTML += `<td>${arr[i][j]}</td>`;
                    }
                    break;
                case 3 : 
                    if (arr[i][j] != marker){
                        gOut.innerHTML += `<td id="note${j}">${arr[i][j]}</td>`;
                    } else {
                        gOut.innerHTML += `<td>${arr[i][j]}</td>`;
                    }
                    break;
            }
            if (j == arr[0].length-1){
                switch(i){
                    case 0 : 
                        eOut.innerHTML += `<td>]</td>`;
                        break;
                    case 1 : 
                        aOut.innerHTML += `<td>]</td>`;
                        break;
                    case 2 : 
                        dOut.innerHTML += `<td>]</td>`;
                        break;
                    case 3 : 
                        gOut.innerHTML += `<td>]</td>`;
                        break;
                }
            }
        }
    }
}


function tabRefresh(){
    // Get number for scale
    let a = parseInt(scaleIn.value);
    let b = parseInt(lengthIn.value);
    let c ;
    if (rootIn.value == ""){
        c = 0;
    } else {
        c = parseInt(rootIn.value)
    }
    let d = parseInt(bpmIn.value);
    outputTab(arrtoTab(tabArray(a, b, c, d)));

}

function addToTab(){
    // Take the temp table and copy it to main table
    let e = eOut.innerHTML;
    let a = aOut.innerHTML;
    let d = dOut.innerHTML;
    let g = gOut.innerHTML;

    mainEOut.innerHTML += e;
    mainAOut.innerHTML += a;
    mainDOut.innerHTML += d;
    mainGOut.innerHTML += g;

    
}

btn1.addEventListener("click",()=>{
    tabRefresh();
})
btn2.addEventListener("click",()=>{
    addToTab();
})

function createOptions(){
    for (i=0;i<scales.length;i++){
        scaleIn.innerHTML += `<option value=${i}>${scalesObj[i].name}</option>`;
    }
}
createOptions();
