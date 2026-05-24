
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
      workerId: 3,
      stationId: 1
    },
        {
      id: 7,
      date: new Date("2026-05-20"),
      workerId: 1,
      stationId: 1
    },
        {
      id: 8,
      date: new Date("2026-05-20"),
      workerId: 2,
      stationId: 1
    }
]

function isWorkerAssignedOnDate(workerId: number, date: Date): boolean {
return shifts.some(shift => 
    shift.workerId === workerId &&
    isSameDay (shift.date , date)
);
}

function isSameDay(dateA: Date, dateB: Date): boolean {
    return dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
}

function assignWorkerToShift(workerId:number ,stationId:number ,date :Date):boolean {
    const worker = shiftWorkers.find( worker => worker.id === workerId)
    if(!worker) {
        console.log('Worker not Found');
        return false
    } 
    if(!isWorkerEligible(worker)) {
        console.log('Worker is not active or available');
        return false
    }
    if(isWorkerAssignedOnDate(workerId,date)){
        console.log('Worker is already assigned to Same Date')
        return false
    }
    if(!stationExists(stationId)) {
        console.log('Station Does not exist');
        return false
    }
    const maxId = shifts.reduce(
        (max,shift) => shift.id > max ? shift.id : max ,0
    )
    const newShift: Shift = {
    id: maxId + 1,
    workerId,
    stationId,
    date
    };
    shifts.push(newShift)
    return true

}

function isWorkerEligible(worker:ShiftWorker):boolean {
    return (worker.active && worker.status === 'available')
}

function stationExists (stationId:number):boolean {
    return stations.some(station => station.id === stationId)
}

function removeShiftById(shiftId:number) :boolean {
    const index = shifts.findIndex(shift => shift.id === shiftId);
    if (index === -1) {
        console.log('Shift not found') 
        return false
    }
    shifts.splice(index,1)
    return true
}

function updateShift (
  shiftId:number ,
  newWorkerId:number,
  newStationId:number,
  newDate:Date
):boolean {
  const shift = shifts.find(shift => shift.id === shiftId);
  if(!shift) {
    console.log('Shift Does not Exist')
    return false
  }
  const newWorker = shiftWorkers.find(worker => worker.id === newWorkerId )
  if(!newWorker){
    console.log('Worker Does not Exist')
    return false
  }
  if(!isWorkerEligible(newWorker)){
    console.log('Worker is not Eligible')
    return false
  }
  if(!stationExists(newStationId)){
    console.log('Station does not exist')
    return false
  }
  if(isWorkerAssignedOnDateExceptShift(
      shiftId,
      newWorkerId,
      newDate
  )) {
  console.log("Worker already has another shift on this date");
    return false
  }
  shift.workerId = newWorkerId;
  shift.stationId = newStationId;
  shift.date = newDate;
  return true
}

function isWorkerAssignedOnDateExceptShift(
  shiftId:number,
  workerId:number,
  date:Date,
):boolean { 
  return shifts.some(shift => 
    shift.id !== shiftId &&
    workerId === shift.workerId &&
    isSameDay(shift.date , date)
  );
}


function getShiftsForDate(date:Date) {
 return shifts.filter(shift => isSameDay(shift.date,date)
 )
}


function getWorkersWithoutShift(date:Date) {
return shiftWorkers.filter(worker =>
  !(shifts.some(shift => worker.id === shift.workerId &&
    isSameDay(shift.date,date))))
}

function sortDatesNewestToOldest() {
const sortedShiftsNewestToOldest =  [...shifts].sort((a,b) => b.date.getTime() - a.date.getTime())
return sortedShiftsNewestToOldest
}

function sortDatesOldestToNewest() {
const sortedShiftsOldestToNewst =  [...shifts].sort((a,b) => a.date.getTime() - b.date.getTime())
return sortedShiftsOldestToNewst
}

function sortWorkersAlphabetically () {
const sortedWorkersAlbphabetically = [...shiftWorkers].sort((a,b) => a.name.localeCompare(b.name))
return sortedWorkersAlbphabetically
}
function sortedWorkersReverseAlphabetically () {
const sortedWorkersReverseAlphabetically = [...shiftWorkers].sort((a,b) => b.name.localeCompare(a.name))
return sortedWorkersReverseAlphabetically
}

function getAvailableWorkersSortedAlphabetically(date: Date): ShiftWorker[] {
  return getWorkersWithoutShift(date)
    .filter(worker => isWorkerEligible(worker))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getStationLoadForDate(date:Date): Record<string,number> {
  const shiftsOnDate = shifts.filter(shift => isSameDay(shift.date,date))
  return shiftsOnDate.reduce((stationCounts,shift)=> {
    const stationName:string |undefined = findStationName(shift.stationId);
    if(!stationName){
      return stationCounts 
    }
    stationCounts[stationName] = (stationCounts[stationName] ?? 0)+1;
    return stationCounts
  },{} as Record<string,number>)
}

function findStationName(stationId:number) {
  const stationName = stations.find(station => 
    stationId === station.id
  )
  return stationName?.name
}

function getBusiestStation(date: Date): string | null{
  const stationsLoad = getStationLoadForDate(date);
  let highestCount :number =0;
  let bussiestStation:string |null =null;
  for (const [stationName , count] of Object.entries(stationsLoad)) {
    if(count>=highestCount) {
      highestCount = count;
      bussiestStation = stationName;
    }
  }
  return bussiestStation;
}

function getLeastBusyStation(date:Date):string |null {
  const stationsLoad = getStationLoadForDate(date);
  let lowestCount = Infinity;
  let leastBusyStation:string |null = null;
  for (const [stationName , count] of Object.entries(stationsLoad)){
    if(count<lowestCount){
      lowestCount = count;
      leastBusyStation = stationName;
    }
  }
  return leastBusyStation
}

function getAvailableStations (date:Date):Station[] {
  const shiftsOnDate = shifts.filter(shift => isSameDay(shift.date,date));
  return stations.filter(station => !shiftsOnDate.some(shift => shift.stationId === station.id))
}

function getWorkersGroupedByStation(date: Date):Record <string,string[]> {
  const shiftLoad = shifts.filter(shift=>isSameDay(shift.date,date));
  const obj : { [key: string]: string[] } ={};
  for (const shift of shiftLoad) {
    const tempStationName:string |undefined = getStationName(shift.stationId)
    const tempWorkerName:string |undefined =
    getWorkerName(shift.workerId)
    if(!tempWorkerName){
      continue
    }
    if(!tempStationName) {
      continue
    }
    if(obj[tempStationName]) {
    obj[tempStationName].push(tempWorkerName)
    } else {
    obj[tempStationName] = [tempWorkerName]
    }
}
  return obj;
}

function getStationName (stationId:number):string |undefined {
  return stations.find(station => station.id === stationId)?.name
}
function getWorkerName (workerId:number):string |undefined {
  return shiftWorkers.find(worker => worker.id === workerId)?.name
}
function getStationSummary(date:Date):ShiftSummary {
  const busiestStation = getBusiestStation(date);
  const leastBusyStation = getLeastBusyStation(date);
  const availableStations = getAvailableStations(date);
  const groupedWorkers =getWorkersGroupedByStation(date);

  const report : ShiftSummary = {
    busiest :busiestStation ,
    leastBusy:leastBusyStation ,
    availableStations:availableStations,
    groupedWorkers:groupedWorkers
  }
  return report
}
// console.log(getStationSummary(new Date('2026-05-20')))
interface ShiftSummary {
  busiest: string | null,
  leastBusy: string | null,
  availableStations:Station[],
  groupedWorkers: Record<string,string[]>
}

// const workers = [
//   { id: 1, name: "John", status: "available" },
//   { id: 2, name: "Anna", status: "sick" },
//   { id: 3, name: "Mark", status: "available" }
// ];

function availableWorkers():string[]{
  const availableWorkers = workers.filter(worker => worker.status === 'available');
  return availableWorkers.map(worker => worker.name);
}

// console.log(availableWorkers());

function reportWorkersStatus ():Record <string,number>{
  return workers.reduce((statusCount , worker) => {
  const status:string = worker.status;
  statusCount[status] = (statusCount[status] ?? 0 ) + 1;
  return statusCount;
  },{} as Record <string,number>)
}
// console.log(reportWorkersStatus())

const products = [
  { name: "Laptop", category: "Tech" },
  { name: "Mouse", category: "Tech" },
  { name: "Chair", category: "Furniture" }
];

// {
//   Tech: ["Laptop", "Mouse"],
//   Furniture: ["Chair"]
// }

function sortByCategory ():{[key:string] :string[]} {
  let sorthedProductsByCategory: {[key:string] : string[]} = {};
  for (const product of products) {
    
    if(sorthedProductsByCategory[product.category]){
      sorthedProductsByCategory[product.category].push(product.name);
    } else {
      sorthedProductsByCategory[product.category] = [product.name];
    }
  }
  return sorthedProductsByCategory
}


function sortByCategoryWithReduce():Record<string,string[]> {
  return products.reduce(
    (accumulatorProduct,currentValueOfProduct) => {
      if (accumulatorProduct[currentValueOfProduct.category]){
        accumulatorProduct[currentValueOfProduct.category].push(currentValueOfProduct.name)
      } else {  
        accumulatorProduct[currentValueOfProduct.category] = [currentValueOfProduct.name]
      } 
      return accumulatorProduct
    },{} as Record<string,string[]>)
}


const workers = [
  { name: "John", department: "IT", status: "available" },
  { name: "Anna", department: "IT", status: "sick" },
  { name: "Mark", department: "HR", status: "available" },
  { name: "Lisa", department: "HR", status: "vacation" }
];
function reportDepartment ():Record<string, Record<string, number>>{
  const data:Report = {};
for (const worker of workers) {
  if(!data[worker.department]) {
    data[worker.department]={};
  }
  data[worker.department][worker.status]=(data[worker.department][worker.status] ?? 0)+1;
}
  return data
}

interface Report {
  [department: string]: {
    [status: string]: number
  }
}
console.log(reportDepartment())
