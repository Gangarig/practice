import { Avatar, Badge, Box, Group, Paper, Stack, Text } from '@mantine/core'
import type { Assignment } from '../../types/Assignment'
import type { Worker } from '../../types/Worker'

interface PlannerWorkerListProps {
  workers: Worker[]
  assignments: Assignment[]
}

const statusColors = {
  available: 'green',
  sick: 'red',
  vacation: 'yellow',
  inactive: 'gray',
} as const

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
            <Paper withBorder px={6} py={4} key={worker.id} radius="sm">
              <Group wrap="nowrap" gap={6}>
                <Avatar size={24} color={statusColors[worker.status]}>
                  {worker.name.slice(0, 2).toUpperCase()}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size="sm" fw={600} truncate>{worker.name}</Text>
                </div>
                <Text size="xs" c="dimmed">{shiftCount}</Text>
                <Box
                  w={7}
                  h={7}
                  title={worker.status}
                  aria-label={worker.status}
                  bg={`var(--mantine-color-${statusColors[worker.status]}-6)`}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                />
              </Group>
            </Paper>
          )
        })}

        {workers.length === 0 && <Text size="sm" c="dimmed">No workers yet.</Text>}
      </Stack>
    </Paper>
  )
}

export default PlannerWorkerList
