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
        console.log('Event does not exist');
        return;
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
                console.log ('Not enough seats available') 
                return
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
            console.log('Not enough seats');
            return
        }
    }
    console.log(reservations)
    return reservations
}

function cancelReservation (userName:string,eventId:number,) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        console.log('Event does not exist');
        return
    }
    if(!reservations[eventDetail.id]) {
        console.log('There are no reservations on event');
        return
    } else {
        if(!reservations[eventDetail.id].reservations[userName]) {
            console.log('User has not reservations on the Event');
            return
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
    console.log(reservations)  
    return reservations
}

function updateReservation(userName:string, eventId:number , newSeatQuantity:number) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        console.log('Event does not exist');
        return
    }
    if(newSeatQuantity === 0 ) {
        cancelReservation(userName,eventId);
        return
    }
    if(!reservations[eventDetail.id]) {
        reserveSeat(userName,eventId,newSeatQuantity)
        return
    }
    if(!reservations[eventDetail.id].reservations[userName]) {
        reserveSeat(userName,eventId,newSeatQuantity)
        return
    }
    if(!(newSeatQuantity <= reservations[eventDetail.id].available + reservations[eventDetail.id].reservations[userName])){
        console.log('There are not enough available seats');
        return
    }   
    if(!(newSeatQuantity <= reservations[eventDetail.id].capacity)){
        console.log('Seat quantity exceeds event capacity')
        return;
    }   
    reservations[eventDetail.id].available = reservations[eventDetail.id].available + reservations[eventDetail.id].reservations[userName] - newSeatQuantity;
    reservations[eventDetail.id].reserved = reservations[eventDetail.id].reserved - reservations[eventDetail.id].reservations[userName] + newSeatQuantity;
    reservations[eventDetail.id].reservations[userName] = newSeatQuantity;            
    console.log(reservations)
    return reservations
}

function getEventSummary (eventId:number) {
    const eventDetail = findEventDetail(eventId);
    if(!eventDetail) {
        console.log('Event does not exist');
        return
    }
    if(reservations[eventDetail.id]) {
        return reservations[eventDetail.id];
    } else {
        console.log('There are no current reservations')
        return reservations[eventDetail.id] = {
            eventName:eventDetail.name,
            capacity:eventDetail.capacity,
            reserved:0,
            available:0,
            reservations:{}
        }
    }

}
// reserveSeat('Ganaa',1,1)
// reserveSeat('John',1,1)
// updateReservation('Ganaa',1,2)
// updateReservation('Marie',1,2)
// updateReservation('John',1,1)
// updateReservation('John',1,0)
console.log(getEventSummary(1))
