import {BrowserRouter} from "react-router-dom";
import AppLayout from "./components/Layout";
// import "./styles.module.scss";

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
