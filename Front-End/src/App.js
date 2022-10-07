import './App.css';
import SearchBar from './Components/SearchBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import CompanyList from './Components/CompanyList';

function App() {
  return (
    <Router >
    <div className="my-4">
      <div className='row justify-content-md-center my-4'>
        
      </div>
      <Routes>
                 <Route exact path='/' element={< SearchBar />}></Route>
                 <Route exact path='/companyList' element={< CompanyList />}></Route>
          
          </Routes>
    </div>
    
    </Router>
  );
}

export default App;
