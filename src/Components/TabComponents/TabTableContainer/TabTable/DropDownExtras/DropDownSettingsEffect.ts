import { iconTypes } from "../../../../Icons/Buttons/BtnIcon";

export const effectIcons = (effectNames : string[])=>{
    const outMain : iconTypes[][] = [];
    effectNames.forEach(item=>{
        let out:iconTypes[] = ['null'];
        switch(item.toLocaleLowerCase()){
            case 'new effect' : break;
            case 'add effect' : break;
            default : out = ['remove','settings']; break;
        }
        outMain.push(out);
    });
    return outMain;
}