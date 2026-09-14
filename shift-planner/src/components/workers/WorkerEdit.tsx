import React, { useState } from 'react'
import type { Worker } from '../../types/Worker'
import { Button, Paper, Select, Stack, Text, TextInput } from '@mantine/core'


interface WorkerFormProps {
    selectedWorker:Worker | null,
    onUpdateWorker:(value:Worker) => void
}
function WorkerEdit({selectedWorker,onUpdateWorker}:WorkerFormProps) {
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
        setName('')
        setEmail('')
        setRole('')
        setStatus('')
        return
    }
  return (
    <Paper withBorder p="lg">
      <form onSubmit={handeSubmit}>
        <Stack>
          <Text fw={600}>Edit worker</Text>
          <TextInput required label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
          <TextInput required type="email" label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <Select required label="Role" value={role} data={['worker', 'manager', 'admin', 'accountant', 'owner']}
            onChange={(value) => setRole((value ?? '') as typeof role)} />
          <Select required label="Status" value={status} data={['available', 'sick', 'vacation', 'inactive']}
            onChange={(value) => setStatus((value ?? '') as typeof status)} />
          <Button type="submit" variant="light">Save changes</Button>
        </Stack>
      </form>
    </Paper>
  )
}

export default WorkerEdit
