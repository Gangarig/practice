import { createContext } from "react";
import type { Worker,NewWorker } from "../types/Worker";
import type { Station,NewStation } from "../types/Station";
import type { Assignment,NewAssignment } from "../types/Assignment";

export interface AppContextValue {
    workers : Worker[]  ,
    stations : Station[] ,
    assignments : Assignment[] ,

    createWorker :(worker: NewWorker) => void
    updateWorker : (worker: Worker) => void
    removeWorker : (worker: Worker) => void

    createStation : (station: NewStation) => void
    updateStation : (station: Station) => void
    removeStation : (station: Station) => void

    createAssignment : (assignment : NewAssignment) => void
    updateAssignment : (assignment : Assignment) => void
    removeAssignment : (assignment : Assignment) => void

    loadingWorkers : boolean,
    workersError : string | null,
    loadingStations :boolean,
    stationsError : string | null,
    loadingAssignments : boolean
    assignmentsError :string |null,
}

export const AppContext = createContext<AppContextValue | null>(null)
