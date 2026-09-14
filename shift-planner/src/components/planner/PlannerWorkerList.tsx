import { Badge, Group, Paper, Stack, Text } from '@mantine/core'
import type { Assignment } from '../../types/Assignment'
import type { Worker } from '../../types/Worker'
import PlannerWorkerCard from './PlannerWorkerCard'

interface PlannerWorkerListProps {
  workers: Worker[]
  assignments: Assignment[]
}

function PlannerWorkerList({ workers, assignments }: PlannerWorkerListProps) {
  const sortedWorkers = [...workers].sort((a, b) => {
    if (a.status === 'available' && b.status !== 'available') return -1
    if (a.status !== 'available' && b.status === 'available') return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <Paper withBorder p="sm" className="planner-workers">
      <Stack gap={5}>
        <Group justify="space-between">
          <div>
            <Text fw={700} size="sm">Workers</Text>
          </div>
          <Badge variant="light">{workers.length}</Badge>
        </Group>

        {sortedWorkers.map((worker) => {
          const shiftCount = assignments.filter((item) => item.workerId === worker.id).length
          return (
            <PlannerWorkerCard key={worker.id} worker={worker} shiftCount={shiftCount} />
          )
        })}

        {workers.length === 0 && <Text size="sm" c="dimmed">No workers yet.</Text>}
      </Stack>
    </Paper>
  )
}

export default PlannerWorkerList
