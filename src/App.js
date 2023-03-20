import Routers from './navigation/Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthModeContextProvider } from "./contexts";
function App() {
  return (
    <AuthModeContextProvider>
      <Routers />
      <ToastContainer />
    </AuthModeContextProvider>
  );
}
export default App;