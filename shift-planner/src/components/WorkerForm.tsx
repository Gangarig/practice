import React, { useState } from 'react'
import type { Worker } from '../types/Worker'

interface WorkerFormProps {
    workers:Worker[],
    onCreateWorker:(value:Worker) => void
}
function WorkerForm({workers,onCreateWorker}:WorkerFormProps) {
    
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [role,setRole] = useState<'worker' | 'manager' | 'admin' | 'owner' | 'accountant' | ''>('')
    const [status,setStatus] = useState<'available' | 'sick' | 'vacation' | 'inactive' | ''>('')

    function handeSubmit(e:React.FormEvent){
        e.preventDefault()
        if(name === '' ) return null
        if(email === '') return null
        if(role === '') return null
        if(status === '') return null
        const worker: Worker = {
        id: workers.length + 1,
        name,
        email,
        role,
        status
        }
        onCreateWorker(worker)
        setName('')
        setEmail('')
        setRole('')
        setStatus('')
    console.log('Submitted')
    return
    }





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
            <h2>Worker Form</h2>
            <label htmlFor="name">Name</label>
            <input type="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Worker Name' />
            <label htmlFor="name">Email</label>
            <input type="email" value={email} placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="name">Role</label>
            <select value={role} onChange={(e)=>setRole(e.target.value as 'worker' | 'manager' | 'admin' | 'owner' | 'accountant')} name="selectRole" id="role">
                <option value="">Select role</option>
                <option value="worker">worker</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
                <option value="accountant">accountant</option>
                <option value="owner">owner</option>
            </select>
            <label htmlFor="name">Status</label>
            <select value={status} name="status" id="status" onChange={(e)=>setStatus(e.target.value as 'available' | 'sick' | 'vacation' | 'inactive')}>
                <option value="">Select status</option>
                <option value="available">available</option>
                <option value="sick">sick</option>
                <option value="vacation">vacation</option>
                <option value="inactive">inactive</option>
            </select>
            <button type='submit'>Create</button>
        </form>
        
    </div>
  )
}

export default WorkerForm