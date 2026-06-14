export interface Assignment { 
    id:number,
    workerId:number,
    stationId:number,
    date:Weekday,
    note?:string | null,
}

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';