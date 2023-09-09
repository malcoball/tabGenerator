import { tabType } from "../@types/types";

const LoadData = {
    localStorage : {
        tab : {
            getAll : ()=>{
                // Show what's available to load
                const keys = localStorage;
                const tabItems:string[] = [];
                for (let i = 0;i < keys.length; i++){
                    const current = keys.key(i);
                    if (current?.includes("tab")) tabItems.push(current);
                }
                return tabItems;
            },
            loadSingle : (key : string) : tabType | null => {
                const load = localStorage.getItem(key);
                const out = typeof(load) === "string" ? JSON.parse(load) : null;
                return out;
            }
        }
    }
}
export default LoadData;