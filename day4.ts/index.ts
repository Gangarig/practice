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
// console.log(isWorkerAssignedOnDate(
//     1,
//     new Date('2026-05-20T00:00:00Z')
// ))

// console.log("Day 4 TypeScript is running");

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
    // const ids = shifts.map (shift => shift.id);
    // const sortedIds = ids.sort((a,b) => b-a);
    const maxId = shifts.reduce(
        (max,shift) => shift.id > max ? shift.id : max ,0
    )
    const newShift: Shift = {
    id: maxId + 1,
    workerId,
    stationId,
    date
    };
    // return shifts.push(...newShift)
    shifts.push(newShift)
    return true

}

function isWorkerEligible(worker:ShiftWorker):boolean {
    return (worker.active && worker.status === 'available')
}

function stationExists (stationId:number):boolean {
    return stations.some(station => station.id === stationId)
}
// console.log(assignWorkerToShift(1, 2, new Date("2026-05-22")));
// console.log(shifts);
// console.log(assignWorkerToShift(1, 3, new Date("2026-05-22")));

function removeShiftById(shiftId:number) :boolean {
    const index = shifts.findIndex(shift => shift.id === shiftId);
    if (index === -1) {
        console.log('Shift not found') 
        return false
    }
    shifts.splice(index,1)
    return true
}