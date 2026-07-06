import { useState } from 'react'
import AssignmentDetail from '../components/planner/AssignmentDetail';
import PlannerGrid from '../components/planner/PlannerGrid';
import AssignmentControls from '../components/planner/AssignmentControls';
import PlannerWorkerList from '../components/planner/PlannerWorkerList';
import type  { Assignment } from '../types/Assignment';
import useApp from '../hooks/useApp';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Box, Button, Grid, Group, Modal, Stack, Text, Title } from '@mantine/core';

function PlannerPage() {
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false)
    const {workers,
        stations,
        assignments,
        createAssignment,
        updateAssignment,
        removeAssignment,
        loadingAssignments
    } = useApp()
  return (
    <Box pos="relative" className="page-container">
      <LoadingOverlay visible={loadingAssignments} loaderProps={{ children: 'Loading...' }} />
      <Stack gap="lg">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={1}>Weekly planner</Title>
          <Text c="dimmed">Assign available workers to active stations.</Text>
        </div>
        <Button onClick={openCreate}>New assignment</Button>
      </Group>
      <Modal opened={createOpened} onClose={closeCreate} title="New assignment" size="sm" centered>
        <AssignmentControls
          assignments={assignments}
          onCreateAssignment={createAssignment}
          onCreated={closeCreate}
          workers={workers}
          stations={stations}
        />
      </Modal>
      {selectedAssignment && (
        <AssignmentDetail
          key={selectedAssignment.id}
          assignment={selectedAssignment}
          onEditAssignmentNote={updateAssignment}
          workers={workers}
          stations={stations}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
      <Grid align="flex-start" gap="lg">
        <Grid.Col span={{ base: 12, lg: 9 }}>
          <PlannerGrid
            stations={stations}
            workers={workers}
            assignments={assignments}
            onRemoveAssignment={removeAssignment}
            onSelectAssignment={setSelectedAssignment}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <PlannerWorkerList workers={workers} assignments={assignments} />
        </Grid.Col>
      </Grid>
      </Stack>
    </Box>
  )
}

export default PlannerPage
