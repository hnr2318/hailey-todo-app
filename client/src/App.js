import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Search from './components/Search';
import Profile from './pages/Profile';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Lists from './pages/Lists';
import AddTaskToList from './components/AddTaskToList';
import Main from './components/Main';
import SingleList from './pages/SingleList';
import Notes from './pages/Notes';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) ?? {});

  return (
    <>
      <BrowserRouter>
        <Main user={user} />
        <Routes>
          {user ? <Route exact path="/" element={<Home />} /> : <Route exact path="/" element={<SignUp />} />}
          <Route exact path="/addTaskToList" element={<AddTaskToList />} />
          <Route exact path="/collection/tasks" element={<Tasks />} />
          <Route exact path="/collection/lists" element={<Lists />} />
          <Route exact path="/collection/notes" element={<Notes />} />
          <Route exact path="/single/list/:id" element={<SingleList />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/me" element={<Profile />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
