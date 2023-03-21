import { CommonHeader } from './Components/Header/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.scss'
import { DataTables } from './Components/DataTable/DataTable';
import Dashboard from './Components/Dashboard/Dashboard';
import { TearSheets } from './Components/TearSheet/TearSheets';
import { SidePanels } from './Components/SidePanel/SidePanels';
import Signup from './pages/signup/signup';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route exact path="/signup" element={<Signup />} /> 
          <Route path='/' element={<CommonHeader />}>
            <Route exact path="/" element={<Dashboard />} />    {/*A nested route!*/}
            <Route exact path="/datatable" element={<DataTables />} />
            <Route exact path="/sidepanel" element={<SidePanels />} />
            <Route exact path="/tearsheet" element={<TearSheets />} /> 

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


