import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import MainPage from './components/MainPage/MainPage';
import ComicsList from './components/ComicsList/ComicsList';
import ComicPageInfo from './components/pages/ComicPageInfo';
import Page404 from './components/pages/Page404';


function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/comic' element={<ComicsList />}/>
        <Route path='/comic/:id' element={<ComicPageInfo />}/>
        <Route path='*' element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
