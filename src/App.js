import { CommonHeader } from './Components/Header/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.scss'
import { DataTables } from './Components/DataTable/DataTable';
import Dashboard from './Components/Dashboard/Dashboard';
import { TearSheets } from './Components/TearSheet/TearSheets';
import { SidePanels } from './Components/SidePanel/SidePanels';
import Signup from './pages/signup/signup';
import Signin from './pages/signin/signin';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { AuthProvider } from './sdk/context/AuthContext';

function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route exact path="/signup" element={<Signup />} /> 
          <Route path='/' element={<CommonHeader />}>
            <Route exact path="/dashboard" element={<Dashboard />} />    {/*A nested route!*/}
            <Route exact path="/datatable" element={<DataTables />} />
            {/* <Route exact path="/sidepanel" element={<SidePanels />} />
            <Route exact path="/tearsheet" element={<TearSheets />} />  */}

          </Route>
          <Route exact path="/signin" element={<Signin />} /> 
          <Route exact path="/forgotpassword" element={<ForgotPassword />} /> 
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;


