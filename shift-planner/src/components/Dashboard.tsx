
import type { Worker } from '../types/Worker'
import type { Station } from '../types/Station'
import type { Assignment } from '../types/Assignment'


interface DashboardProps {
  workers:Worker[],
  stations:Station[],
  assignments:Assignment[]
}

function Dashboard({
  workers,
  stations,
  assignments
}:DashboardProps) {
  const workerCounts = workers.reduce((sum, worker) => {
    sum[worker.status] = (sum[worker.status] ?? 0) + 1;
    return sum
  }, {
    available: 0,
    sick: 0,
    vacation: 0,
    inactive: 0,
  })

  const activeStation = stations.filter(item => item.active === true).length

  const workersWithoutAssignments : Worker[] = workers.filter(worker => 
    !assignments.some(assignment => assignment.workerId === worker.id)
  )
  const statisticAssignments = assignments.reduce<Record<number, number>>((sum, assignment) => {
    sum[assignment.workerId] = (sum[assignment.workerId] ?? 0) + 1;
    return sum
  },{});
  const sortedStatistic = Object.entries(statisticAssignments).sort((a,b)=> b[1] - a[1])
  const lastItemIndex = sortedStatistic.length-1;

  function findWorkerById(workerId:number) {
    return workers.find(worker => worker.id === workerId)
  }

  const mostLoadedWorker:Worker | undefined = sortedStatistic.length > 0 ? findWorkerById(Number(sortedStatistic[0][0])) : undefined;
  const  leastLoadedWorker :Worker | undefined =  
  workersWithoutAssignments.length > 0 ? 
  workersWithoutAssignments[0] : sortedStatistic.length > 0 ?
                                  findWorkerById(Number(sortedStatistic[lastItemIndex][0])) : 
                                  undefined


  return (
    <div
    style={{display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          padding:'10px',
          border:'1px solid white',
          borderRadius:'10px'
    }}
    >
      <h2>Dashboard</h2>
      <div>
        <h2>Stat</h2>
          <div>
            <h3>Worker --- {workers.length}</h3>
            <p>available Workers - {workerCounts.available}</p>
            <p>sick Workers - {workerCounts.sick}</p>
            <p>vacation Workers - {workerCounts.vacation}</p>
            <p>inactive Workers - {workerCounts.inactive}</p>          
          </div>
          <div>
            <h3>Stations --- {stations.length}</h3>
            <p>Active Stations - {activeStation}</p>
          </div>
          <div>
            <h3>Assignments --- {assignments.length}</h3>
          </div>
          <div>
            <h3>Workers Without assignments --- </h3>
            {workersWithoutAssignments.length > 0 ? 
                workersWithoutAssignments.map(item => 
                <p key={item.id}>{item.name}</p>):
                'list empty' }
          </div>
          <div>
            {mostLoadedWorker && <p>Most Loaded Worker {mostLoadedWorker.name}</p> }
            {leastLoadedWorker && <p>Least Loaded Worker {leastLoadedWorker.name}</p> }
          </div>
      </div>
    </div>
  )
}

export default Dashboard