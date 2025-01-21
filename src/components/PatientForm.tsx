import { useForm } from 'react-hook-form'
import {toast} from 'react-toastify'
import { DraftPatient } from '../types'
import Error from './Error'
import { usePatientStore } from '../store'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
const PatientForm = () => {

const {addPatient, editingId, patients,editPatient}=usePatientStore()
const {register, handleSubmit, setValue,formState:{errors}, reset}=useForm<DraftPatient>()

useEffect(()=>{
  if(editingId){
    const editingPatient=patients.filter(currentPatient=>currentPatient.id===editingId)[0]
    setValue('name',editingPatient.name)
    setValue('caretaker',editingPatient.caretaker)
    setValue('date',editingPatient.date)
    setValue('email',editingPatient.email)
    setValue('symptoms',editingPatient.symptoms)
  }
},[editingId])

const registerPatient=(data:DraftPatient)=>{
  
  if(editingId){
    editPatient(data)
    toast.success('Paciente actualizado correctamente')
  }else{
    addPatient(data)
    toast.success('Paciente registrado correctamente')
  }
  reset()
}




return (
<div className="md:w-1/2 lg:w-2/5 mx-5">
    <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
    <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
    </p>
        <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' noValidate onSubmit={handleSubmit(registerPatient)}>
        <div className='mb-5'>
        <label htmlFor="name" className='text-sm uppercase font-bold'>PACIENTE</label>
        <input type="text" id='name' className='w-full p-3 border border-gray-100' placeholder='Nombre del paciente'
        {...register('name',{required:'El nombre del paciente es obligatorio', maxLength:{value:8, message:'Máximo 8 caracteres'}})}
        />
        {errors.name && (
          <Error>{errors.name?.message}</Error>
        )}
        {
          errors.maxLength && (
            <Error>{errors.maxLength?.message}</Error>
          )
        }
      </div>
      <div className='mb-5'>
        <label htmlFor="caretaker" className='text-sm uppercase font-bold'>PROPIETARIO</label>
        <input type="text" id='caretaker' className='w-full p-3 border border-gray-100' placeholder='Nombre del Propietario'
        {...register('caretaker',{required:'El nombre del propietario es obligatorio', maxLength:{value:8, message:'Máximo 8 caracteres'}})}/>
        {errors.caretaker && (
          <Error>{errors.caretaker?.message}</Error>
        )}
        {errors.maxLength &&(
          <Error>{errors.maxLength?.message}</Error>
        )}
      </div>
      <div className='mb-5'>
        <label htmlFor="email" className='text-sm uppercase font-bold'>EMAIL</label>
        <input type="email" id='email' className='w-full p-3 border border-gray-100' placeholder='Email de Registro'
        {...register('email',{required:'El email es obligatorio',pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:'Email no valido'}})}
        />
        {errors.email && (
          <Error>{errors.email?.message}</Error>
        )}
      </div>
      <div className='mb-5'>
        <label htmlFor="date" className='text-sm uppercase font-bold'>Fecha Alta</label>
        <input type="date" id='date' className='w-full p-3 border border-gray-100'
        {...register('date',{required:'La fecha de alta es obligatoria'})}
        />
        {errors.date && (
          <Error>{errors.date?.message}</Error>
        )}
      </div>
      <div className='mb-5'>
        <label htmlFor="symptoms" className='text-sm uppercase font-bold'>Sintomas</label>
        <textarea id="symptoms" className='w-full p-3 border border-gray-100' placeholder='Síntomas del paciente'
        {...register('symptoms',{required:'Los síntomas son obligatorios'})}
        />
        {errors.symptoms && (
          <Error>{errors.symptoms?.message}</Error>
        )}
      </div>
      <div>
        <input type="submit" className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors' value="Guardar Paciente" />
      </div>
    </form>
    </div>
   
  )
}

export default PatientForm
