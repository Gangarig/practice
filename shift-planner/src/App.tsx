import PlannerPage from "./pages/PlannerPage";
import WorkerForm from "./components/WorkerForm";
function App() {
  return <div 
  style={{
    padding:'10px',
    
  }}>
  <h1>Shift Planner</h1>
  <PlannerPage/>
  <WorkerForm/>
  </div>;
}

export default App;

