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

export function getWeekDays(monday:Date){
    const weekdays = [
        {label:'Monday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate())},
        {label:'Tuesday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1)},
        {label:'Wednesday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2)},
        {label:'Thursday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3)},
        {label:'Friday', date: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4)},
    ];
    return weekdays;
}