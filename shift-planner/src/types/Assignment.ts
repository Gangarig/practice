export interface Assignment { 
    id:string,
    workerId:string,
    stationId:string,
    date:string,
    note?:string | null,
}

export type NewAssignment = Omit<Assignment,"id">

export type Weekday = { label: string; date: Date }
export type WorkWeek =  Weekday[]
