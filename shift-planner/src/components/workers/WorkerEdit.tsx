import React, { useEffect, useState } from 'react'
import type { Worker, WorkerStatus } from '../../types/Worker'
import { Button, Paper, Select, Stack, Text, TextInput } from '@mantine/core'

interface WorkerFormProps { selectedWorker: Worker | null; onUpdateWorker: (value: Worker) => void }
function WorkerEdit({ selectedWorker, onUpdateWorker }: WorkerFormProps) {
  const [name, setName] = useState(selectedWorker?.name ?? '')
  const [email, setEmail] = useState(selectedWorker?.email ?? '')
  const [role, setRole] = useState<Worker['role']>(selectedWorker?.role ?? 'worker')
  const [status, setStatus] = useState<WorkerStatus>(selectedWorker?.status ?? 'available')
  useEffect(() => { if (selectedWorker) { setName(selectedWorker.name); setEmail(selectedWorker.email); setRole(selectedWorker.role); setStatus(selectedWorker.status) } }, [selectedWorker])
  function handleSubmit(event: React.FormEvent) { event.preventDefault(); if (!selectedWorker || !name || !email) return; onUpdateWorker({ ...selectedWorker, name, email, role, status }) }
  return <Paper withBorder p="lg"><form onSubmit={handleSubmit}><Stack><Text fw={600}>Edit worker</Text><TextInput required label="Name" value={name} onChange={(event) => setName(event.currentTarget.value)} /><TextInput required type="email" label="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} /><Select required label="Role" value={role} data={['worker', 'manager', 'admin', 'accountant', 'owner']} onChange={(value) => setRole((value ?? 'worker') as Worker['role'])} /><Select required label="Status" value={status} data={['available', 'sick', 'vacation', 'holiday', 'inactive']} onChange={(value) => setStatus((value ?? 'available') as WorkerStatus)} /><Button type="submit" variant="light">Save changes</Button></Stack></form></Paper>
}
export default WorkerEdit
