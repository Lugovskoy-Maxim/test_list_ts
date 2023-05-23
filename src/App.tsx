import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import data from './utils/data.json';
import ListPage from './components/ListPage/ListPage';
import './App.css';



function App() {
  return (
    <div className="App">
      <header>
        <Link to="/navigator">Приложение</Link>
      </header>
      <Routes>
        <Route path="/navigator" element={<ListPage data={data.data} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
