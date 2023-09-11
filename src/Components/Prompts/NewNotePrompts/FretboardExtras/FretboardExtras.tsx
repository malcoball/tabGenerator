export const getFretMarkers = (fretNumber:number)=>{
    let fretNumberParse = fretNumber;
    if (fretNumberParse > 12){
        fretNumberParse -= 12;
    }
    let out = 0;
    if (fretNumberParse > 2 && fretNumberParse < 10) {
        if (fretNumberParse % 2 === 1) out = 1;
    } else 
    if (fretNumberParse === 12) out = 2;
    return out;
}