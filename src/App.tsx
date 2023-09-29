import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent';

function App() {

  return (<Router>
<Header/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/MainComponent' element={<MainComponent/>}/>
    </Routes>
      <Footer/>
    </Router>
  )
}
export default App
