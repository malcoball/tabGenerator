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
export default EffectSettings;