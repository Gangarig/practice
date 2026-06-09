export interface Worker {
    id:number,
    name:string,
    status: 'available' | 'sick' | 'vacation' | 'inactive'
    role: 'worker' | 'manager' | 'admin' | 'owner' | 'accountant',
    email:string,
    phoneNumber?:string,
    vacationDays?:number,
    plusHours?:number,
}