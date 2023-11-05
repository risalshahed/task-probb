import { createContext, useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Header from './components/Shared/Header'

export const DataContext = createContext();

function App() {
  const [images, setImages] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch('data.json')
    .then(res => res.json())
    .then(data => setImages(data))
  }, [])

  return (
    <DataContext.Provider value={{ images, setImages, isChecked, setIsChecked }}>
      <div className='app'>
        <Header />
        <Home />
      </div>
    </DataContext.Provider>
  )
}

export default App