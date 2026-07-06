import React, { useState } from 'react'
import type { Worker,NewWorker } from '../../types/Worker'
import { Button, Select, Stack, TextInput } from '@mantine/core'

interface WorkerFormProps {
    workers:Worker[],
    onCreateWorker:(value:NewWorker) => void
}
function WorkerForm({onCreateWorker}:WorkerFormProps) {
    
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [role,setRole] = useState<'worker' | 'manager' | 'admin' | 'owner' | 'accountant' | ''>('worker')
    const [status,setStatus] = useState<'available' | 'sick' | 'vacation' | 'inactive' | ''>('available')

    function handeSubmit(e:React.FormEvent){
        e.preventDefault()
        if(name === '' ) return null
        if(email === '') return null
        if(role === '') return null
        if(status === '') return null
        const worker : NewWorker = {
        name,
        email,
        role,
        status
        }
        onCreateWorker(worker)
        setName('')
        setEmail('')
        setRole('worker')
        setStatus('available')
    console.log('Submitted')
    return
    }





  return (
    <form onSubmit={handeSubmit}>
      <Stack>
        <TextInput required label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} placeholder="Worker name" />
        <TextInput required type="email" label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="name@company.com" />
        <Select required label="Role" value={role} data={['worker', 'manager', 'admin', 'accountant', 'owner']}
          onChange={(value) => setRole((value ?? '') as typeof role)} />
        <Select required label="Status" value={status} data={['available', 'sick', 'vacation', 'inactive']}
          onChange={(value) => setStatus((value ?? '') as typeof status)} />
        <Button type="submit">Create worker</Button>
      </Stack>
    </form>
  )
}

export default WorkerForm
