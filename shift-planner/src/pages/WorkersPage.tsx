import useWorker from "../hooks/useWorker"
import { useState } from "react"
import WorkerSort from "../components/workers/WorkerSort"
import WorkerDetail from "../components/workers/WorkerDetail"
import WorkerList from "../components/workers/WorkerList"
import WorkerEdit from "../components/workers/WorkerEdit"
import WorkerForm from "../components/workers/WorkerForm"
import useApp from "../hooks/useApp"
import type { Worker } from "../types/Worker"
import Search from "../components/Search"
function WorkersPage() {
  const [search,setSearch]=useState<string>('')
  const [selectedWorker,setSelectedWorker] = useState<Worker | null>(null)
  const {
        sortedWorkers,
        setSortOrderWorker,
        sortOrderWorker
  } = useWorker(search)
      const {workers,
          assignments,
          createWorker,
          updateWorker,
          removeWorker,
      } = useApp()

  function handleUpdateWorker(worker:Worker) {
    updateWorker(worker);
    setSelectedWorker(worker);
    return
  }
  return (
    <div>
        <Search search={search} onSearch={setSearch}/>
        <WorkerSort sortOrder={sortOrderWorker} onSort={setSortOrderWorker} />
        <WorkerList
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        workers={sortedWorkers}
        />
        { selectedWorker ? 
        <WorkerDetail 
        worker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        onRemoveWorker={removeWorker}
        onChangeOfStatus={handleUpdateWorker}
        assignments={assignments}
        updateWorkerState={handleUpdateWorker}
        />
        : null}
        <WorkerForm
        workers={workers}
        onCreateWorker={createWorker}
        />
        <WorkerEdit
        selectedWorker={selectedWorker ?? null}
        onUpdateWorker={updateWorker}
        />
    </div>
  )
}

export default WorkersPage