import { Badge, Group, Paper, Spoiler, Text } from '@mantine/core'
import type { Assignment, Weekday } from '../../types/Assignment'
import type { Worker } from '../../types/Worker'
import { Weekdays } from '../../data/Weekdays'
import useApp from '../../hooks/useApp'

const statusColors = {
  available: 'green',
  sick: 'red',
  vacation: 'yellow',
  inactive: 'gray',
} as const

function WorkerAvailability() {
  const { workers, assignments, stations } = useApp()
  const week: Weekday[] = Weekdays

  function getAvailability(worker: Worker, assignment: Assignment | undefined) {
    if (worker.status !== 'available') {
      return { label: worker.status, color: statusColors[worker.status] }
    }

    if (assignment) {
      const station = stations.find((item) => item.id === assignment.stationId)
      return { label: station?.name ?? 'Unknown', color: 'blue' }
    }

    return { label: 'Free', color: 'green' }
  }

  return (
    <Paper withBorder p={{ base: 'sm', sm: 'md' }}>
      <Group justify="space-between" mb="sm">
        <div>
          <Text fw={700}>Weekly availability</Text>
          <Text size="xs" c="dimmed">Team coverage at a glance</Text>
        </div>
        <Badge variant="light" size="sm">{workers.length}</Badge>
      </Group>

      <Spoiler maxHeight={276} showLabel="Show all workers" hideLabel="Show less">
        <div className="availability-grid">
          <div className="availability-header availability-worker">Worker</div>
          {week.map((day) => (
            <div className="availability-header" key={day}>{day.slice(0, 3)}</div>
          ))}

          {workers.map((worker) => (
            <div className="availability-row" key={worker.id}>
              <div className="availability-worker">
                <Text size="xs" fw={600} truncate title={worker.name}>{worker.name}</Text>
              </div>
              {week.map((day) => {
                const assignment = assignments.find(
                  (item) => item.date === day && item.workerId === worker.id,
                )
                const availability = getAvailability(worker, assignment)
                return (
                  <div className="availability-cell" key={`${worker.id}-${day}`}>
                    <Badge
                      color={availability.color}
                      variant="light"
                      size="xs"
                      fullWidth
                      title={availability.label}
                    >
                      {availability.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Spoiler>
    </Paper>
  )
}

export default WorkerAvailability
