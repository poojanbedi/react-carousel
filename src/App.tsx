import React from 'react'
import Crousel from './component'
import data from './example/mockData/data'
import './App.css'

function App() {
  return (<Crousel config={data.crousel.config} images={data.crousel.images} />)
}

export default App;
