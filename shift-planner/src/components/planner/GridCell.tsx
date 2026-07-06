import { type MouseEvent } from 'react'
import { ActionIcon, Badge, Group, Stack, Text } from '@mantine/core'
import type { Station } from '../../types/Station'
import type { Worker } from '../../types/Worker'
import type { Assignment } from '../../types/Assignment'

interface GridCellProps {
  station: Station
  worker: Worker | null
  assignment: Assignment | null
  onRemoveAssignment: (value: Assignment) => void
  onSelectAssignment: (value: Assignment | null) => void
}

function GridCell({
  station,
  worker,
  assignment,
  onRemoveAssignment,
  onSelectAssignment,
}: GridCellProps) {
  function handleRemove(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (assignment) onRemoveAssignment(assignment)
  }

  return (
    <div
      className={`planner-grid-cell${assignment ? ' planner-grid-cell--assigned' : ''}`}
      onClick={() => assignment && onSelectAssignment(assignment)}
      style={{
        cursor: assignment ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Group justify="space-between" wrap="nowrap" w="100%">
        <Stack gap={2} style={{ minWidth: 0 }}>
          {worker ? (
            <Text size="sm" fw={600} truncate>{worker.name}</Text>
          ) : (
            <Badge color={station.active ? 'gray' : 'red'} variant="light" size="xs">
              {station.active ? 'Unassigned' : 'Inactive'}
            </Badge>
          )}
          {assignment?.note && <Text size="xs" c="dimmed" lineClamp={1}>{assignment.note}</Text>}
        </Stack>
        {assignment && (
          <ActionIcon aria-label="Remove assignment" color="red" variant="subtle" size="sm" onClick={handleRemove}>
            ×
          </ActionIcon>
        )}
      </Group>
    </div>
  )
}

export default GridCell
