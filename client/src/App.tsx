import AddCategory from "./components/AddCategory"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { CategoriesProvider } from "./context";

function App() {

  return (
    <div className="App">
      <CategoriesProvider>
      <ToastContainer/>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<AddCategory/>}/>
        </Routes>
      </Router>
      <Footer/>
      </CategoriesProvider>
    </div>
  )
}

export default App
