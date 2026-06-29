import { createContext } from "react";
import type { Worker } from "../types/Worker";
import type { Station } from "../types/Station";
import type { Assignment } from "../types/Assignment";

export interface AppContextValue {
    workers : Worker[],
    stations : Station[],
    assignments : Assignment[],

    createWorker : (worker: Worker) => void
    updateWorker : (worker: Worker) => void
    removeWorker : (worker: Worker) => void

    createStation : (station: Station) => void
    updateStation : (station: Station) => void
    removeStation : (station: Station) => void

    createAssignment : (assignment : Assignment) => void
    updateAssignment : (assignment : Assignment) => void
    removeAssignment : (assignment : Assignment) => void
    resetLocalData :() => void
}

export const AppContext = createContext<AppContextValue | null>(null)
