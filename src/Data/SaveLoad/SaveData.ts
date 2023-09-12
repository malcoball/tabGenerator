import { tabType } from "../@types/types";
import { keyMethods } from "../StaticFunctions";

const SaveData = {
    tabTo : {
        localStorage : (tabIn:tabType,saveName:string)=>{
            console.log("yee");
            const key = keyMethods.fileKey.create(saveName,'tab');
            const parseTab = JSON.stringify(tabIn);
            localStorage.setItem(key,parseTab);
            // console.log(`Stored as, Key : ${key}, Data : ${parseTab}`)
            console.log("key : ",key);
        }
    },
    effectTo : {

    }
};
export default SaveData;