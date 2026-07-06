import { useState } from 'react'
import AssignmentDetail from '../components/planner/AssignmentDetail';
import PlannerGrid from '../components/planner/PlannerGrid';
import AssignmentControls from '../components/planner/AssignmentControls';
import type  { Assignment } from '../types/Assignment';
import useApp from '../hooks/useApp';
import { LoadingOverlay, Box } from '@mantine/core';

function PlannerPage() {
    const [ selectedAssignment , setSelectedAssignment] = useState<Assignment | null> (null)
    const {workers,
        stations,
        assignments,
        createAssignment,
        updateAssignment,
        removeAssignment,
        loadingAssignments
    } = useApp()
  return (
    <Box pos="relative">
      <LoadingOverlay visible={loadingAssignments} loaderProps={{ children: 'Loading...' }} />
      <AssignmentControls
        assignments={assignments}
        onCreateAssignment={createAssignment}
        workers={workers}
        stations={stations}
      />
      {selectedAssignment && (
        <AssignmentDetail
          assignment={selectedAssignment}
          onEditAssignmentNote={updateAssignment}
          workers={workers}
          stations={stations}
        />
      )}
      <PlannerGrid
        stations={stations}
        workers={workers}
        assignments={assignments}
        onRemoveAssignment={removeAssignment}
        onSelectAssignment={setSelectedAssignment}
      />
    </Box>
  )
}

export default PlannerPage
