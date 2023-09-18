import { effectType, tabType } from "../@types/types";
import { keyMethods } from "../StaticFunctions";

const LoadData = {
    localStorage : {
        getAll : ()=>{
            // Show what's available to load
            const keys = localStorage;
            const saveData:string[] = [];
            for (let i = 0; i < keys.length; i++){
                const current = keys.key(i);
                if (current !== null) saveData.push(current);
            }
            return saveData;
        },
        
        getKey : {
            byTitle : (title:string):string|null=>{
                const keys = localStorage;
                let out = null;
                for (let i = 0;i < keys.length; i++){
                    const current = keys.key(i);
                    // Null can be slightly annoying
                   if (current !== null){
                    const target = localStorage.getItem(current);
                    if (target !== null){
                        if (JSON.parse(target).title === title) out = i.toString();
                    }
                   }
                }
                return out;
            }
        },
        getAllFilter : (type : 'tab' | 'effect')=>{
            const out = LoadData.localStorage.getAll().filter((item)=>{ 
                return keyMethods.fileKey.getType(item) === type});
            return out;
        },
        tab : {
            loadSingle : (key : string) : tabType | null => {
                const load = localStorage.getItem(key);
                const out = typeof(load) === "string" ? JSON.parse(load) : null;
                if (keyMethods.fileKey.getType(load) !== 'tab') return null;
                return out;
            },
            getAll : ()=>{
                return LoadData.localStorage.getAllFilter('tab'); 
            }
        },
        effect : {
            loadSingle : (key : string) : effectType | null => {
                const load = localStorage.getItem(key);
                const out = typeof(load) === "string" ? JSON.parse(load) : null;
                if (keyMethods.fileKey.getType(load) !== 'effect') return null;
                return out;
            },
            getAll : ()=>{
                return LoadData.localStorage.getAllFilter('effect'); 
            }
        }
    }
}
export default LoadData;