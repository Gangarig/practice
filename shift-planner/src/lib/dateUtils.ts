import type { Weekday } from "../types/Assignment"

export function getMondayOfWeek (selectedDate:Date){
    const day = selectedDate.getDay()
    const daysBack = day === 0 ? 6 : day - 1
    const monday = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() - daysBack
    )
    return monday
}

export function getWeekDays(monday:Date):Weekday[]{
    const weekdays = [
        {label:'Monday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate())},
        {label:'Tuesday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1)},
        {label:'Wednesday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2)},
        {label:'Thursday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3)},
        {label:'Friday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4)},
    ];
    return weekdays 
}

export function formatDate(date:Date):string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}