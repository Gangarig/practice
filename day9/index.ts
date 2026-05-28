// events[]
// reservations{}
// reserveSeat()
// cancelReservation()
// updateReservation()
// getEventSummary()
const events = [
  { id: 1, name: "Concert", capacity: 5, reserved: 0 },
  { id: 2, name: "Workshop", capacity: 10, reserved: 0 }
];

const reservations : Reservation = {};
interface Reservation {
    [eventId:number] : {
    eventName :string,
    capacity:number, 
    reserved :number,
    available:number,
    reservations :{
        [key:string]:number,
    },
    },
}
function findEventDetail (eventId:number) {
    return events.find(event => event.id === eventId)
}
function reserveSeat (userName:string,eventId:number , seatQuantity:number) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        return {
            success : false , 
            message : 'Event does not exist'
        }
    }
    if(reservations[eventDetail.id]){
            if(reservations[eventDetail.id].available >= seatQuantity) {
                reservations[eventDetail.id].available = reservations[eventDetail.id].available - seatQuantity;
                reservations[eventDetail.id].reserved = reservations[eventDetail.id].reserved + seatQuantity;
                if(reservations[eventDetail.id].reservations[userName]) {
                    reservations[eventDetail.id].reservations[userName] = reservations[eventDetail.id].reservations[userName] + seatQuantity;
                } else {
                    reservations[eventDetail.id].reservations[userName] = seatQuantity;
                }
            } else {
                return {
                    success:false,
                    message:'Not enough seats available'
                }
            }
    } else {
        if(eventDetail.capacity >= seatQuantity) {
            reservations[eventDetail.id] = {
                eventName:eventDetail.name,
                capacity:eventDetail.capacity,
                reserved:seatQuantity,
                available:eventDetail.capacity-seatQuantity,
                reservations : {
                    [userName] : seatQuantity,
                }
            }
        } else {
                return {
                    success:false,
                    message:'Event has not enough capacity'
                }
        }
    }

    return {
        success:true,
        message:'Reservation is created',
        data : reservations,
    }
     
}

function cancelReservation (userName:string,eventId:number,) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        return {
            success:false,
            message:'Event does not exist'
        }
    }
    if(!reservations[eventDetail.id]) {
        return {
            success:false,
            message:'There are no reservations on event'
        }
    } else {
        if(!reservations[eventDetail.id].reservations[userName]) {
            return {
                success:false,
                message:'User has not reservations on the Event'
            }
        } else {
            // updating available and reserved seats now because i think after deletion i might lose the values
            reservations[eventDetail.id].reserved = reservations[eventDetail.id].reserved - reservations[eventDetail.id].reservations[userName];
            reservations[eventDetail.id].available =  reservations[eventDetail.id].available + reservations[eventDetail.id].reservations[userName];
            // delete user reservation
            delete reservations[eventDetail.id].reservations[userName];
            const isEmpty = Object.keys(reservations[eventDetail.id].reservations).length;
            if(isEmpty === 0) {
                delete reservations[eventDetail.id]
            }
        }
    }
    
    return {
        success:true,
        message:'Reservation cancelled',
        data:reservations
    }

}

function updateReservation(userName:string, eventId:number , newSeatQuantity:number) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        return {
            success:false,
            message:'User has not reservations on the Event'
        }
    }
    if(newSeatQuantity === 0 ) {
        cancelReservation(userName,eventId);
        return {
            success:false , 
            message:'Seat quantity was equal to zero , reservation will be cancelled'
        }
    }
    if(!reservations[eventDetail.id]) {
        reserveSeat(userName,eventId,newSeatQuantity)
        return {
            success:true,
            message:'There were no older reservation but current request accepted'
        }
    }
    if(!reservations[eventDetail.id].reservations[userName]) {
        reserveSeat(userName,eventId,newSeatQuantity)
        return {
            success:true,
            message:'There were no older reservation but current request accepted'
        }
    }
    if(!(newSeatQuantity <= reservations[eventDetail.id].available + reservations[eventDetail.id].reservations[userName])){
        return {
            success:false,
            message:'There are not enough seats available'
        }
    }   
    if(!(newSeatQuantity <= reservations[eventDetail.id].capacity)){
        return {
            success:false,
            message:'Seat quantity extends over capacity'
        }
    }   
    reservations[eventDetail.id].available = reservations[eventDetail.id].available + reservations[eventDetail.id].reservations[userName] - newSeatQuantity;
    reservations[eventDetail.id].reserved = reservations[eventDetail.id].reserved - reservations[eventDetail.id].reservations[userName] + newSeatQuantity;
    reservations[eventDetail.id].reservations[userName] = newSeatQuantity;            
    return {
        success:true,
        message:'Reservation updated',
        data:reservations,
    }
}

function getEventSummary (eventId:number) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        return {
            success:false,
            message:'Event does not exist'
        }
    }
    if(reservations[eventDetail.id]) {
        return {
            success:true,
            message:'Event Summary',
            data:reservations[eventDetail.id]
        }
    } else {
        return { 
            success:false,
            message:'There are no current Reservations',
            data:reservations[eventDetail.id] = {
            eventName:eventDetail.name,
            capacity:eventDetail.capacity,
            reserved:0,
            available:0,
            reservations:{}
        }
    }
    }

}
console.log(reserveSeat("Ganaa",1,1))
