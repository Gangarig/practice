import { Avatar, Box, Group, Paper, Text } from '@mantine/core'
import type { Worker } from '../../types/Worker'

interface PlannerWorkerCardProps {
  worker: Worker
  shiftCount: number
}

const statusColors = {
  available: 'green',
  sick: 'red',
  vacation: 'yellow',
  inactive: 'gray',
} as const

function PlannerWorkerCard({ worker, shiftCount }: PlannerWorkerCardProps) {
  return (
    <Paper withBorder px={6} py={4} radius="sm">
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
}

export default PlannerWorkerCard
