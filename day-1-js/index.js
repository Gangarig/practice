const workers = [
  { id: 1, name: "Anna", status: "available", station: "Beizen" },
  { id: 2, name: "Mark", status: "sick", station: "HE-Bad" },
  { id: 3, name: "Lisa", status: "available", station: "Färben" },
  { id: 4, name: "Tom", status: "vacation", station: "Beschichtung" },
];

function getAvailableWorkers () {
    const availableWorkers = workers.filter (
        worker => worker.status === "available"
    );
    console.log (availableWorkers);
}
getAvailableWorkers();

function getNames () {
    const names = workers.map(
        worker => worker.name
    )
    console.log (names)
}
getNames();

function getNumberOfAvailableWorkers() {
    let i = 0 
    const availAbleWorkers = workers.filter (
        worker => worker.status === "available" 
    )
    console.log(availAbleWorkers.length);
    for (const worker of workers ) {
        if (worker.status ==="available")
            i++;
    }
    console.log (i);
}
getNumberOfAvailableWorkers();

function getWorkerById (chosenWorkerId) {
    const chosenWorker = workers.find(worker => worker.id === chosenWorkerId);
    console.log(chosenWorker);
}   
getWorkerById(4);

function markWorkerSick (workerId) {
    const worker = workers.find(
        worker => worker.id === workerId
    )
    worker.status = "sick";
    console.log(workers)
  
}
markWorkerSick(4)