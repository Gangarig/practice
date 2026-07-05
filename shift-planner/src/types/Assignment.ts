export interface Assignment { 
    id:string,
    workerId:string,
    stationId:string,
    date:Weekday,
    note?:string | null,
}

export type NewAssignment = Omit<Assignment,"id">

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';