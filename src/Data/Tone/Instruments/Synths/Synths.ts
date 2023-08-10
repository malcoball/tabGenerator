import * as Tone from 'tone';
import { synthName } from '../../../@types/types';
type synthObj = {
    title : synthName,
    synth : any // This will be a different synth nearly every time
}
const synth1 :synthObj = {
    title : "Synth",
    synth : new Tone.Synth().toDestination()
}
const duoSynth1: synthObj = {
    title:'Duo',
    synth : new Tone.DuoSynth().toDestination()
}
const fmSynth:synthObj = {
    title:'FMSynth',
    synth : new Tone.FMSynth().toDestination()
}
const amSynth:synthObj ={
    title:'AMSynth',
    synth : new Tone.AMSynth().toDestination()
}
const membraneSynth : synthObj ={
    title:'MembraneSynth',
    synth : new Tone.MembraneSynth().toDestination()
}
const metalSynth : synthObj = {
    title:'MetalSynth',
    synth : new Tone.MetalSynth().toDestination()
}
const monoSynth : synthObj ={
    title:'MonoSynth',
    synth : new Tone.MonoSynth().toDestination()
}
const noiseSynth : synthObj ={
    title : 'NoiseSynth',
    synth : new Tone.NoiseSynth().toDestination()
} 
const pluckSynth : synthObj = {
    title:'PluckSynth',
    synth : new Tone.PluckSynth().toDestination()
}
const polySynth : synthObj = {
    title : 'PolySynth',
    synth : new Tone.PolySynth().toDestination()
}
const Synths = {
    synth1 : synth1,
    duoSynth1 : duoSynth1,
    fmSynth : fmSynth,
    amSynth : amSynth,
    membraneSynth : membraneSynth,
    metalSynth : metalSynth,
    monoSynth : monoSynth,
    noiseSynth : noiseSynth,
    pluckSynth : pluckSynth,
    polySynth : polySynth
}
export default Synths