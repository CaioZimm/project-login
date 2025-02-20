import { useState } from 'react'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <>
      <div className='App'>
        <header>
          <Login />
        </header>
      </div>
    </>
  );
}

export default App