import { Paper, Text } from '@mantine/core'
import type { Station } from '../../types/Station'
import type { Worker } from '../../types/Worker'
import type { Assignment , Weekdays } from '../../types/Assignment'
import GridCell from './GridCell'

interface PlannerGridProps {
  stations: Station[]
  workers: Worker[]
  assignments: Assignment[]
  onRemoveAssignment: (assignment: Assignment) => void
  onSelectAssignment: (value: Assignment | null) => void
  monday: Date
  weekDays: Weekdays
}

function PlannerGrid({
  stations,
  workers,
  assignments,
  onRemoveAssignment,
  onSelectAssignment,
  monday,
  weekDays,
}: PlannerGridProps) {

  return (
    <Paper withBorder className="planner-matrix">
      <div className="planner-matrix-grid">
        <div className="planner-corner">
          <Text size="xs" fw={700} c="dimmed">Station</Text>
        </div>
        {weekDays.map((day) => (
          <div className="planner-day-header" key={day.label}>
            <Text fw={700} size="sm">
              <span className="day-name-full">{day.label}</span>
              <span className="day-name-short">{day.label.slice(0, 3)}</span>
            </Text>
          </div>
        ))}

        {stations.map((station) => (
          <div className="planner-row" key={station.id}>
            <div className="planner-station-header">
              <Text fw={600} size="sm" truncate>{station.name}</Text>
            </div>
            {weekDays.map((day) => {
              const assignment = assignments.find(
                (item) => item.stationId === station.id && item.date.getTime() === day.date.getTime(),
              ) ?? null
              const worker = assignment
                ? workers.find((item) => item.id === assignment.workerId) ?? null
                : null

              return (
                <GridCell
                  key={`${station.id}-${day.label}`}
                  station={station}
                  worker={worker}
                  assignment={assignment}
                  onRemoveAssignment={onRemoveAssignment}
                  onSelectAssignment={onSelectAssignment}
                />
              )
            })}
          </div>
        ))}
      </div>
      {stations.length === 0 && <Text c="dimmed" ta="center" p="xl">No stations yet.</Text>}
    </Paper>
  )
}

export default PlannerGrid
