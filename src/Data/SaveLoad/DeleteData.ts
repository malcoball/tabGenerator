import LoadData from "./LoadData";

const DeleteData = {
    localStorage : {
        tab : {
            byKey : (key:string)=>{
                localStorage.removeItem(key);
            },
            byTitle : (title:string)=>{
                const key = LoadData.localStorage.getKey.byTitle(title);
                console.log("key : ",key);
                key !== null ? 
                    DeleteData.localStorage.tab.byKey(key) : 
                    console.error(`${title} not found in the local storage`);
            }
        }
    }
}
export default DeleteData;