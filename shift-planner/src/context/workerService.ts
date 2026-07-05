    import { supabase } from "../lib/supabase"
    import type { Worker,NewWorker } from "../types/Worker"
    
    export async function loadWorkers() {
        const {data , error} = await supabase.from('workers').select('*')
        if(error) {
            throw error
        }
        return data as Worker[]
    }
    export async function updateWorker(worker:Worker) {
        const {data,error} = await supabase.from('workers').update(worker).eq('id',worker.id);
        if(error) {
            throw error;
        }
        
        return
    }
    export async function createWorker(newWorker:NewWorker) {
        const {data,error} = await supabase.from('workers').insert(newWorker).select().single()    
        if(error) {
            throw error;
        }
        

    }
    export async function removeWorker(selectedWorker:Worker) {

        const {error} = await supabase.from('workers').delete().eq('id',selectedWorker.id)
        if(error) {
            throw error;
        }
        
    }