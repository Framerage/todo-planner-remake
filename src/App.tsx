import {BrowserRouter} from "react-router-dom";
import AppLayout from "./components/Layout";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
