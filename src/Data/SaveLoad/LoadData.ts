import { tabType } from "../@types/types";
import { keyMethods } from "../StaticFunctions";

const LoadData = {
    localStorage : {
        tab : {
            getAll : ()=>{
                // Show what's available to load
                const keys = localStorage;
                const tabItems:string[] = [];
                for (let i = 0; i < keys.length; i++){
                    const current = keys.key(i);
                    if (current !== null) tabItems.push(current);
                }
                return tabItems;
            },
            loadSingle : (key : string) : tabType | null => {
                const load = localStorage.getItem(key);
                const out = typeof(load) === "string" ? JSON.parse(load) : null;
                return out;
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
            }
        }
    }
}
export default LoadData;