import { effectType, singleEffect } from "../../@types/types"

export type singleSettings = {
    name : string, min:number, max: number,steps:number,
    description: string
}
type allSettings = {
    distortion : singleSettings[],
    eq : singleSettings[],
    tremolo : singleSettings[],
    reverb : singleSettings[]
}
const EffectSettings:allSettings = {
    distortion : [
        {name : 'gain', min:0, max : 1,steps : 0.1,
        description : 'not set'}
    ],
    eq : [
        {name:'low', min:0, max:10,steps:1,
         description:'low part duh'},
        {name:'mid', min:0, max:10,steps:1,
         description:'mid part duh'},
        {name:'high', min:0, max:10,steps:1,
         description:'high part duh'},
    ],
    tremolo : [
        {name:'effect 1', min:0, max:10,steps:1,
         description:'not set'},
        {name:'effect 2', min:0, max:1,steps:0.1,
         description:'not set'},
    ],
    reverb : [
        {name:'Reverb', min:0, max:1,steps:0.1,
         description:'not set'},
        {name:'Delay', min:0, max:1,steps:0.1,
         description:'not set'},
    ],
}
export const defaultEffectData:effectType = {
    index : -1,
    title: '',
    distortion:{
        active : false,value : [0],type:"distortion"
    },
    reverb: {
        active : false,value : [0,0],type:"reverb"
    },
    tremolo: {
        active : false,value : [0,0],type:"tremolo"
    },
    eq: {
        active : false,value : [0,0,0],type:"eq"
    },
}
export const effectDefaults:effectType[] = [{
    index : 0,
    title: 'New Effect',
    distortion:{
        active : false,value : [0],type:"distortion"
    },
    reverb: {
        active : false,value : [0],type:"reverb"
    },
    tremolo: {
        active : false,value : [0],type:"tremolo"
    },
    eq: {
        active : false,value : [0],type:"eq"
    },
},
{
    index : 1,
    title: 'Add Effect',
    distortion:{
        active : false,value : [0],type:"distortion"
    },
    reverb: {
        active : false,value : [0],type:"reverb"
    },
    tremolo: {
        active : false,value : [0],type:"tremolo"
    },
    eq: {
        active : false,value : [0],type:"eq"
    },
},
{
    index : 2,
    title: 'distortion',
    distortion:{
        active : true,value : [0.5],type:"distortion"
    },
    reverb: {
        active : false,value : [0.3,0.7],type:"reverb"
    },
    tremolo: {
        active : false,value : [0.3],type:"tremolo"
    },
    eq: {
        active : false,value : [0.3],type:"eq"
    },
},
{
    index : 3,
    title: 'reverb',
    distortion:{
        active : false,value : [0.8],type:"distortion"
    },
    reverb: {
        active : true,value : [0.6,0.8],type:"reverb"
    },
    tremolo: {
        active : false,value : [0.1],type:"tremolo"
    },
    eq: {
        active : false,value : [0.3],type:"eq"
    },
},
{
    index : 4,
    title: 'tremolo',
    distortion:{
        active : false,value : [0.8],type:"distortion"
    },
    reverb: {
        active : false,value : [0.6],type:"reverb"
    },
    tremolo: {
        active : true,value : [9,0.7],type:"tremolo"
    },
    eq: {
        active : false,value : [0.3],type:"eq"
    },
},
{
    index : 5,
    title: 'crusher',
    distortion:{
        active : false,value : [0.8],type:"distortion"
    },
    reverb: {
        active : false,value : [0.6],type:"reverb"
    },
    tremolo: {
        active : false,value : [9,0.75],type:"tremolo"
    },
    eq: {
        active : true,value : [0.3],type:"eq"
    },
},]
export default EffectSettings;