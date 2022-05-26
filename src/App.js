import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './components/MainPage/MainPage';


function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
