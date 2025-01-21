import {create} from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {DraftPatient, Patient} from './types'
import {v4 as uuidv4} from 'uuid'



type PatientState={
    patients: Patient[]
    editingId:Patient['id']
    addPatient:(data:DraftPatient)=>void
    deletePatient:(id:Patient['id'])=>void
    getPatientById:(id:Patient['id'])=>void
    editPatient:(data:DraftPatient)=>void
}

const createPatient=(patient:DraftPatient):Patient=>{
    return {...patient, id:uuidv4()}
}

export const usePatientStore=create<PatientState>()(devtools(persist((set)=>({
    patients:[],
    editingId:'',
    addPatient:(data)=>{
        const newPatient=createPatient(data)
        set((state)=>({
            patients:[...state.patients, newPatient]
        }))
    },
    deletePatient:(id)=>{
        set((state)=>({
            patients:state.patients.filter(patient=>patient.id!==id)
        }))
    },

    getPatientById:(id)=>{
        set(()=>({
            editingId:id
        }))
    },
    editPatient:(data)=>{
        set((state)=>({
            patients:state.patients.map(patient=>patient.id===state.editingId?{id:state.editingId,...data}:patient),
            editingId:""
        }))
}
}),{
    name:'patient-storage'
})
))