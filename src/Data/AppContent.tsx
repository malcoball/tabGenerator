import * as React from 'react';
import { tabType, AppContextType, note, instrumentName, scaleName } from './@types/types';
import { newTab } from './TabGeneration/TabGeneration';

interface Props {
    children : React.ReactNode;
}


export const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<Props> = ({children}) =>{
    const [tabIndex,setTabIndex] = React.useState<number>(3);
    const [tabs,setTabs] = React.useState<tabType[]>([
        {
            title:'For whom the bell tolls intro - bass',
            index:0,
            tab:[
                {note:'34',length:'8n'},
                {note:'33',length:'8n'},
                {note:'32',length:'8n'},
                {note:'31',length:'2n'},
                {note:'27',length:'8n'},
                {note:'26',length:'8n'},
                {note:'34',length:'8n'},
                {note:'22',length:'8n'},
                {note:'21',length:'2n'},
            ],
            scale:'aeolian',
            instrumentName : 'bass',
            tempo:120,
            change:false
        },
        {
            title:'Dueling Banjos',
            index:1,
            tab:[
                {note:'29',length:'4n'},
                {note:'29',length:'4n'},
                {note:'29',length:'4n'},
                {note:'30',length:'4n'},
                {note:'29',length:'4n'},
                // {note:'24',length:'4n'},
            ],
            scale:'aeolian',
            instrumentName : 'guitar',
            tempo:120,
            change:false
        },
        {
            title:'Jasmine',
            index:2,
            tab:[
                {note:'5',length:'16n'},
                {note:'3',length:'16n'},
                {note:'2',length:'16n'},
                {note:'16',length:'16n'},
            ],
            scale:'aeolian',
            instrumentName : 'guitar',
            tempo:120,
            change:false
        },
    ])
    const getTabs = {
        single:{
            full : (tabIndex:number)=>{
                // Returns all of the single tab info
                let tabOut = {...tabs[0]};
                for (let i = 0; i < tabs.length;i++){
                    if (tabs[i].index === tabIndex) {
                        tabOut = {...tabs[i]}
                        i = tabs.length;
                    }
                }
                return tabOut;
            },
            arrIndex : (tabIndex:number)=>{
                let out = -1;
                for (let i = 0; i < tabs.length; i++){
                    if (tabs[i].index === tabIndex){
                        out = i; 
                        i = tabs.length;
                    } 
                }
                return out;
            },
            note : (tabIndex:number,noteIndex:number):note=>{
                const tab = getTabs.single.full(tabIndex);
                return tab.tab[noteIndex];
            }
        }
    }
    const changeTabs = {
        singleNote : {
            change : (tabIndex:number,noteIndex:number,changeValue:note)=>{
                const index = getTabs.single.arrIndex(tabIndex);
                const tabsNew = [...tabs];
                tabsNew[index].tab[noteIndex] = changeValue;
                tabsNew[index].change = !tabsNew[index].change;
                setTabs(tabsNew);
            },
            add : (tabIndex:number,newValue:note)=>{
                const index = getTabs.single.arrIndex(tabIndex);
                const tabsNew = [...tabs];
                tabsNew[index].tab.push(newValue);
                tabsNew[index].change = !tabsNew[index].change;
                setTabs(tabsNew);
            },
            remove :(tabIndex:number)=>{
                const index = getTabs.single.arrIndex(tabIndex);
                const tabsNew = [...tabs];
                tabsNew[index].tab.pop();
                tabsNew[index].change = !tabsNew[index].change;
                setTabs(tabsNew);
            }
        },
        instrument : (tabIndex:number,instrumentName : instrumentName)=>{
            const index = getTabs.single.arrIndex(tabIndex);
            const tabsNew = [...tabs];
            tabsNew[index].instrumentName = instrumentName;
            tabsNew[index].change = !tabsNew[index].change;
            setTabs(tabsNew);
        },
        add : (title:string,scale:scaleName,instrument:instrumentName,length:number,rootNote:number,octave:number,noteLengths:boolean[],deadNoteChance:number)=>{
            const tabOut : tabType = {
                tab : newTab(scale,length,rootNote,octave,noteLengths,deadNoteChance),
                index : tabIndex,
                title:title,
                scale : scale,
                instrumentName: instrument,
                change : false,
                tempo:120,
            }
            setTabIndex(tabOut.index+1);
            const tabsNew = [...tabs];
            tabsNew.push(tabOut);
            setTabs(tabsNew);
        },
        remove : (tabIndex:number)=>{
            let tabsNew = [...tabs];
            tabsNew = tabsNew.filter(item => {
                item.change = !item.change;
                return item.index !== tabIndex
            });
            setTabs(tabsNew);
        },
        changeTitle : (tabIndex:number,title:string)=>{
            const index = getTabs.single.arrIndex(tabIndex);
            const tabsNew = [...tabs];
            tabsNew[index].title = title;
            tabsNew[index].change = !tabsNew[index].change;
            setTabs(tabsNew);
        },
        changeTempo : (tabIndex:number,tempo:number)=>{
            const index = getTabs.single.arrIndex(tabIndex);
            const tabsNew = [...tabs];
            tabsNew[index].tempo = tempo;
            tabsNew[index].change = !tabsNew[index].change;
            setTabs(tabsNew);
        }

    }
    return (
        <AppContext.Provider value={{tabs,getTabs,changeTabs}}>
            {children}
        </AppContext.Provider>
    )
}
export const TabDefault = {
    
    title:'default1',
    index:0,
    tab:[
        {note:'1',length:'16'},
        {note:'6',length:'16'},
        {note:'11',length:'16'},
        {note:'15',length:'16'},
    ],
    scale:'notSet'
}

export default AppContextProvider;