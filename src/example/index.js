import React from 'react'
import {createRoot} from 'react-dom/client'
import Crousel from '../component/index'
import data from './mockData/data'


const App = () => (<Crousel config={data.crousel.config} images={data.crousel.images} />)

const mainContainer = createRoot(document.getElementById('root') | document.getElementsByTagName('body')[0])
// console.log("mainContainer", mainContainer)
// mainContainer.render(<App />)

mainContainer.render(<App />)