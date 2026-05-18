interface ShiftWorker {
  id: number;
  name: string;
  status: "available" | "sick" | "vacation";
  active: boolean;
}

const shiftWorkers: ShiftWorker[] = [
  {
    id: 1,
    name: "John",
    status: "available",
    active: true,
  },
  {
    id: 2,
    name: "Anna",
    status: "available",
    active: true,
  },
  {
    id: 3,
    name: "Mark",
    status: "sick",
    active: true,
  },
];
interface Station {
    id: number;
    name: string;
    active: boolean;
    }

const stations :Station[] = [
  {
    id: 1,
    name: 'Aufsteckerei',
    active: true
  },
    {
    id: 2,
    name: 'Beizen',
    active: true
  },
    {
    id: 3,
    name: 'Badführung',
    active: true
  }
]

interface Shift {
  id: number;
  date: Date;
  workerId: number;
  stationId: number;
}
const shifts:Shift [] =[
    {
    id: 1,
    date: new Date("2026-05-19"),
    workerId: 1,
    stationId: 1   
    },
        {
    id: 2,
    date: new Date("2026-05-19"),
    workerId: 2,
    stationId: 2   
    },
        {
    id: 3,
    date: new Date("2026-05-19"),
    workerId: 3,
    stationId: 3   
    },
    {
    id: 4,
    date: new Date("2026-05-20"),
    workerId: 1,
    stationId: 2
    },
    {
      id: 5,
      date: new Date("2026-05-21"),
      workerId: 1,
      stationId: 3
    },
    {
      id: 6,
      date: new Date("2026-05-20"),
      workerId: 2,
      stationId: 1
    }
]


// function findSelectedWorker(shiftWorkerId:number) {
//  const selectedWorker:ShiftWorker | undefined = shiftWorkers.find(
//     shiftWorker => shiftWorker.id === shiftWorkerId
//  )
//  if (selectedWorker) {
//     selectedWorker.status = "sick";
//  } else {
//     console.log("Worker not found");
//  }
//  console.log (selectedWorker)
// };
// findSelectedWorker(2);

// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);

// const newShift: Shift = {
//     id: 4,
//     date: tomorrow,
//     workerId: 2,
//     stationId: 1   
// };

// shifts.push(newShift);
// console.log(shifts);

// function findStationById(stationId :number) {
//     const selectedStation : Station | undefined = stations.find(
//         station => station.id === stationId 
//     )
//     if(selectedStation){
//     console.log (selectedStation)
//     } else {
//         console.log('station not found')
//     }
// }
// findStationById(2);
function isWorkerAvailable(workerId:number):boolean {
const selectedWorker: ShiftWorker | undefined = shiftWorkers.find(
    worker => worker.id === workerId)
    if (!selectedWorker) 
        {return false} 
    return selectedWorker.status === "available";
}
isWorkerAvailable(2)

function assignWorkerToShift (workerId:number , stationId:number) {
    if(!isWorkerAvailable(workerId)){
    // console.log('Worker is not available');
      return;
    }     
    if (isWorkerAlreadyAssigned(workerId)) {
    // console.log("Worker already assigned");
    return;
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1);
    const newId:number = shifts.length+1;

    const newShift:Shift = {
        id:newId,
        date:tomorrow,
        workerId:workerId,
        stationId:stationId
    }
    shifts.push(newShift);
    // console.log("Shift assigned");
    // console.log(shifts);
}
assignWorkerToShift(1, 2);
assignWorkerToShift(1, 3);

function isWorkerAlreadyAssigned(workerId:number): boolean{
    return shifts.some(shift => shift.workerId === workerId)
}

// Session 3

function getSickWorkers() {
const sickWorkers : ShiftWorker[] = shiftWorkers.filter(sickWorkers => sickWorkers.status === 'sick' );
if(!sickWorkers) {
  console.log('There are no sick Workers')
  return
}
// console.log(sickWorkers)
}
getSickWorkers()

function getActiveStations() {
  const activeStations : Station [] = stations.filter(
    station => station.active === true
  )
  if(!activeStations) {
    console.log('There are no active stations')
    return;
  }
  // console.log('Active stations ',activeStations);
}
getActiveStations()

function getWorkerNames (){
  const workerNames: string[] = shiftWorkers.map(worker => worker.name)
  if(workerNames.length === 0) {
    console.log('No workers found');
    return
  }
  // console.log(workerNames);
}
getWorkerNames();

// function countAvailableWorkers():number  {
// const availableWorkers : ShiftWorker[] = shiftWorkers.filter(worker => worker.status === 'available')
//   return availableWorkers.length
// }

function countAvailableWorkers():number {
  return shiftWorkers.filter(worker => worker.status === 'available').length
}

// console.log('there are ' + countAvailableWorkers() + ' workers');

function getShiftsForWorker (workerId:number) :Shift[]{
  const shiftsForWorker : Shift [] = shifts.filter(
    shift => shift.workerId === workerId) 
  if(shiftsForWorker.length === 0){
    console.log('Worker has no assigned shifts')
    return [] ;
  }
  return (shiftsForWorker);
}
// console.log(getShiftsForWorker(2));

function hasSickWorkers():boolean{
  return shiftWorkers.some(worker => worker.status === 'sick')
}

// console.log(hasSickWorkers())

function getStationNameFromShift(shiftId:number):string {
  const assignedShift :Shift | undefined = shifts.find(shift => shift.id === shiftId )
 
  if(!assignedShift){
    return "Shift not found";
  } 
  const station : Station | undefined = stations.find(station => station.id === assignedShift.stationId)
  return station?.name ?? "Station not found"
}
// console.log(getStationNameFromShift(1))

function getWorkerNameFromShift (shiftId:number):string{
const assignedShift :Shift | undefined = shifts.find(shift => shift.id === shiftId)
if (!assignedShift) {
  return "Shift not found"
}
const worker : ShiftWorker | undefined = shiftWorkers.find(worker => worker.id === assignedShift.workerId )
return worker?.name ?? "Worker not Found"
}
// console.log(getWorkerNameFromShift(1));

// function getShiftDetails(shiftId:number): string {
//   if(getWorkerNameFromShift(shiftId) === 'Shift not found' || getWorkerNameFromShift(shiftId) ==='Worker not Found') {
//     return ' Either shift or worker doesnt exist'
//   }
//   if(getStationNameFromShift(shiftId) === 'Shift not found' || getStationNameFromShift(shiftId) ==='Station not found') {
//     return ' Either shift or worker doesnt exist'
//   }
//   return getWorkerNameFromShift(shiftId) + ' is assigned to ' + getStationNameFromShift(shiftId)
// }
// console.log(getShiftDetails(1))

function getShiftById(shiftId:number) : Shift | undefined{
  return shifts.find(shift => shift.id === shiftId) 
}

function getWorkerById(workerId:number) : ShiftWorker |undefined{
  return shiftWorkers.find(worker => worker.id === workerId)
}
function getStationById(stationId:number) : Station | undefined {
  return stations.find(station => station.id === stationId)
}
function getShiftDetails(shiftId:number) :string |undefined {
  const shift = getShiftById(shiftId);
  if(!shift){
    return 'Shift not found';
  }
  const worker = getWorkerById(shift.workerId);
  if(!worker){
    return 'Worker not found';
  }
  const station = getStationById(shift.stationId)
  if(!station){
    return 'Statin not found';
  }
  return `${worker.name} is assigned to ${station.name}`;
 }
// console.log(getShiftDetails(1))
function getAvailableWorkersForStation(): ShiftWorker[] {
  // const activeWorkers : ShiftWorker [] = shiftWorkers.filter(worker => worker.active === true);
  // return activeWorkers.filter(worker => worker.status === 'available') 
  return shiftWorkers.filter(worker =>
    worker.active === true && 
    worker.status === 'available'
  )
}
// console.log(getAvailableWorkersForStation());
// reduce() method One final accumulated value
function countAvailableWorkerWithReduce() : number {
  const totalAvailableWorkers = shiftWorkers.reduce(
    (count :number , worker) =>
    (worker.status === 'available' && worker.active === true) ? count+1 : count,
    0
  );
  return totalAvailableWorkers;
}
// console.log(countAvailableWorkerWithReduce());
function countSickWorkersWithReduce() :number {
  const totalSickWorkers = shiftWorkers.reduce(
    (count:number,worker) =>
    worker.status === 'sick' ? count+1 : count,
    0
  )
  return totalSickWorkers;
}

// console.log(countSickWorkersWithReduce())

function getTotalShiftId():number {
  return shifts.reduce(
    (sum,shift) => sum + shift.id ,0
  )
}
// console.log(getTotalShiftId())

function countShiftsForEachWorker(): Record<number, number> {
  return shifts.reduce((account, shift) => {
    const workerId = shift.workerId;

    account[workerId] = (account[workerId] ?? 0) + 1;

    return account;
  }, {} as Record<number, number>);
 }
// console.log (countShiftsForEachWorker())

function countShiftsForEachStation():Record<number,number> {
  return shifts.reduce((total,shift) => {
    const stationId:number = shift.stationId;
    total[stationId] = (total[stationId] ?? 0) + 1;
    return total 
  },{} as Record<number,number>);
 } 
// console.log(countShiftsForEachStation())

function countWorkersByStatus () :Record <string,number>{
  return shiftWorkers.reduce((sum,worker)=>{
    const status = worker.status ;
    sum[status] = (sum[status] ?? 0 ) +1;
    return sum;
  },{} as Record<string,number>);
}

console.log (countWorkersByStatus())