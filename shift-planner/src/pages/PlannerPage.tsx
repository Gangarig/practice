import { useState } from 'react'
import AssignmentDetail from '../components/planner/AssignmentDetail';
import PlannerGrid from '../components/planner/PlannerGrid';
import AssignmentControls from '../components/planner/AssignmentControls';
import PlannerWorkerList from '../components/planner/PlannerWorkerList';
import type  { Assignment } from '../types/Assignment';
import useApp from '../hooks/useApp';
import { useDisclosure } from '@mantine/hooks';
import { Alert, LoadingOverlay, Box, Button, Grid, Group, Modal, Stack, Text, Title } from '@mantine/core';
import {loadAssignmentsByWeek} from '../services/assignmentService';

function PlannerPage() {
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false)
    const {workers,
        stations,
        assignments,
        createAssignment,
        updateAssignment,
        removeAssignment,
        loadingAssignments,
        assignmentsError,
        loadingWorkers,
        workersError,
        loadingStations,
        stationsError,
        monday,
        weekDays,
    } = useApp()
    const isLoadingPlanner = loadingAssignments || loadingWorkers || loadingStations;
    const [selectedWeekDate, setSelectedWeekDate] = useState<Date>(monday);
    function previousWeek(selectedWeekDate:Date) {
      
    }
    function nextWeek(selectedWeekDate:Date) {

    }
  return (
    <Box pos="relative" className="page-container">
      <LoadingOverlay visible={isLoadingPlanner} loaderProps={{ children: 'Loading...' }} />
      <Stack gap="lg">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={1}>Weekly planner</Title>
          <Text c="dimmed">Assign available workers to active stations.</Text>
        </div>
        <Button onClick={openCreate}>New assignment</Button>
      </Group>
        <Group justify="space-between" align="flex-end">
        <Button onClick={() => previousWeek(selectedWeekDate)}>New assignment</Button>
        <Button onClick={() => nextWeek(selectedWeekDate)}>New assignment</Button>
      </Group>
      {(assignmentsError || workersError || stationsError) && (
        <Stack gap="xs">
          {assignmentsError && (
            <Alert color="red" title="Assignments could not be loaded">
              Existing assignments may be missing from the planner.
            </Alert>
          )}
          {workersError && (
            <Alert color="red" title="Workers could not be loaded">
              Worker names and availability may be missing.
            </Alert>
          )}
          {stationsError && (
            <Alert color="red" title="Stations could not be loaded">
              Station rows may be missing from the planner.
            </Alert>
          )}
        </Stack>
      )}
      {!assignmentsError && assignments.length === 0 && !loadingAssignments && (
        <Alert color="gray" title="No assignments this week">
          Use New assignment to fill the planner grid.
        </Alert>
      )}
      {!workersError && workers.length === 0 && !loadingWorkers && (
        <Alert color="yellow" title="No workers available">
          Add workers before creating assignments.
        </Alert>
      )}
      {!stationsError && stations.length === 0 && !loadingStations && (
        <Alert color="yellow" title="No stations available">
          Add stations before creating assignments.
        </Alert>
      )}
      <Modal opened={createOpened} onClose={closeCreate} title="New assignment" size="sm" centered>
        <AssignmentControls
          assignments={assignments}
          onCreateAssignment={createAssignment}
          onCreated={closeCreate}
          workers={workers}
          stations={stations}
          monday={monday}
          weekDays={weekDays}
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
            weekDays={weekDays}
            monday={monday}
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
