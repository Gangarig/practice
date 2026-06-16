import type { Worker } from '../types/Worker'
interface WorkerCardProps {
    worker :Worker,
    selectedWorker:Worker | null,
    onSelectWorker:(value:Worker)=>void 
}

function WorkerCard({worker,selectedWorker,onSelectWorker}:WorkerCardProps) {
    const isSelected = worker.id === selectedWorker?.id;
    let bgColor = 'green';
        if(worker.status === 'sick') {
            bgColor = 'red';

    }
        if(worker.status === 'vacation') {
            bgColor = 'yellow';

    }
        if(worker.status === 'inactive') {
            bgColor = 'gray';

    }
  return (
    <div
    onClick={() => onSelectWorker(worker)}
    style={{border:'1px solid white' , width:'150px',borderRadius:'10px',
    cursor:'pointer',
    margin:'5px',
    color:'black',
    font:'15px',
    background:isSelected ? 'beige' : bgColor 
    }}
    >{worker.name}</div>
  )
}

export default WorkerCard