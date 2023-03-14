import AddCategory from "./components/AddCategory"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { CategoriesProvider } from "./context";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

function App() {

  return (
    <div className="App">
      <CategoriesProvider>
      <ToastContainer/>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<AddCategory/>}/>
          <Route path="/contact/:categoryId" element={<Contact/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
      <Footer/>
      </CategoriesProvider>
    </div>
  )
}

export default App
