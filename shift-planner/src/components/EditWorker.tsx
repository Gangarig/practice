import React, { useState , useEffect } from 'react'
import type { Worker } from '../types/Worker'


interface WorkerFormProps {
    selectedWorker:Worker | null,
    onUpdateWorker:(value:Worker) => void
}
function EditWorker({selectedWorker,onUpdateWorker}:WorkerFormProps) {
    const [name,setName] = useState<string >(selectedWorker?.name ?? '')
    const [email,setEmail] = useState<string>(selectedWorker?.email ?? '')
    const [role,setRole] = useState<'worker' | 'manager' | 'admin' | 'owner' | 'accountant' | ''>(selectedWorker?.role ?? '')
    const [status,setStatus] = useState<'available' | 'sick' | 'vacation' | 'inactive' | '' >(selectedWorker
        ?.status ?? ''
    )

    function handeSubmit(e:React.FormEvent){
        e.preventDefault()
        if(!selectedWorker) return null
        if(name === '' ) return null
        if(email === '') return null
        if(role === '') return null
        if(status === '') return null
        const updatedWorker = {
        ...selectedWorker ,
        name,
        email,
        role,
        status
        }
        if(!updatedWorker){
            return null
        }
        onUpdateWorker(updatedWorker)
    console.log('Submitted')
    return
    }

    useEffect (() => {
        if(!selectedWorker) return ;

        setName(selectedWorker.name);
        setEmail(selectedWorker.email);
        setRole(selectedWorker.role);
        setStatus(selectedWorker.status);
    },[selectedWorker])
  return (
    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
        padding:'10px',
        flexDirection:'column',
        gap:'10px',
        width:'100%'
    }}>
        <form
        style={{
        display:'flex',
        border:'1px solid white',
        borderRadius:'10px',
        padding:'10px',
        flexDirection:'column',
        gap:'10px',
        width:'70%'
        }}
        onSubmit={handeSubmit}
        >
            <h2>Edit Form</h2>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={(e)=> setName(e.target.value)} value={name}  />
            <label htmlFor="name">Email</label>
            <input type="text" value={email}  onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="name">Role</label>
            <select onChange={(e)=>setRole(e.target.value as 'worker' | 'manager' | 'admin' | 'owner' | 'accountant')} value={role} name="selectRole" id="role">
                <option value="">Select role</option>
                <option value="worker">worker</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
                <option value="accountant">accountant</option>
                <option value="owner">owner</option>
            </select>
            <label htmlFor="name">Status</label>
            <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value as 'available' | 'sick' | 'vacation' | 'inactive')}>
                <option value="">Select status</option>
                <option value="available">available</option>
                <option value="sick">sick</option>
                <option value="vacation">vacation</option>
                <option value="inactive">inactive</option>
            </select>
            <button type='submit'>Save</button>
        </form>
        
    </div>
  )
}

export default EditWorker