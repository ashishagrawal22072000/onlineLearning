import { ReactRouter } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <ReactRouter />
      <ToastContainer />
    </>
  );
}

export default App;
