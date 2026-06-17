import React, { useState } from 'react'
import type { Worker } from '../types/Worker'
import mockWorkers from '../data/mockWorkers'
function WorkerForm() {
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [role,setRole] = useState<'worker' | 'manager' | 'admin' | 'owner' | 'accountant'|''>('')
    const [status,setStatus] = useState<'available' | 'sick' | 'vacation' | 'inactive'|''>('')
    const [newWorker,setNewWorker] = useState<Worker | null>(null)
    const [workers,setWorkers] = useState(mockWorkers)
    function handeSubmit(e:React.FormEvent){
        e.preventDefault()
        if(!newWorker){
            return null
        }
        setWorkers(prev => [
            ...prev,
            newWorker,
        ])
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
            <input type="name" onChange={(e)=> setName(e.target.value)} placeholder='Worker Name' />
            <label htmlFor="name">Email</label>
            <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
            <label htmlFor="name">Role</label>
            <select onChange={(e)=>setRole(e.target.value as 'worker' | 'manager' | 'admin' | 'owner' | 'accountant')} name="selectRole" id="role">
                <option value="">Select role</option>
                <option value="worker">worker</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
                <option value="accountant">accountant</option>
                <option value="owner">owner</option>
            </select>
            <label htmlFor="name">Status</label>
            <select name="status" id="status" onChange={(e)=>setStatus(e.target.value as 'available' | 'sick' | 'vacation' | 'inactive')}>
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

export default WorkerForm