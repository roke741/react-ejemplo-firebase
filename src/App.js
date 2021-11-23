import MarcoLista from './components/MarcoLista';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="container p-3">
      <div className="row ">
        <MarcoLista/>
      </div>
        <ToastContainer/>
    </div>
  );
}


export default App;
