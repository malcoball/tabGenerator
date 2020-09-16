/*  Make an interval, pass value, hold 1 frame depending on what is read*/

function makeArr(length){
    let arr = [];
    for(i=0;i<length;i++){
        let choose = Math.floor(2*(Math.random()));
        let num = Math.floor(length*(Math.random()));
        if (choose == 0){
            arr.push({number:num,timing:"4n"});
        } else {
            arr.push({number:num,timing:"8n"});
        }
    }
    return arr;
}

console.log(makeArr(5));
let inter = null;
let counter = 0;
function start(length){
    inter = setInterval(()=>{
        // Timing
        counter ++;
        if (counter >= length*2){
            stop();
        }

        console.log("passed");
    },1000);
}
function stop(){
    clearInterval(inter);
    inter = null;
}
start();