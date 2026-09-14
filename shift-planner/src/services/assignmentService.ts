import { supabase } from "../lib/supabase";
import type { Assignment,NewAssignment } from "../types/Assignment";

export async function createAssignment(newAssignment:NewAssignment) {
    const {error} = await supabase.from('assignments').insert(newAssignment).select().single();
    if(error) {
        throw error;    
    }
}
export async function removeAssignment(assignment:Assignment) {
    const {error} = await supabase.from('assignments').delete().eq('id',assignment.id);
    if(error) {
        throw error;       
    }
}
export async function updateAssignment(assignment:Assignment) {
    const {error} = await supabase.from('assignments').update(assignment).eq('id',assignment.id);
    if(error) {
        throw error;     
    }
}
export async function loadAssignments() {
    const {data,error} = await supabase.from('assignments').select('*');
    if(error) {
        throw error;     
    }
    return data as Assignment[]
}

export async function loadAssignmentsByWeek(monday:Date) {
    
}
