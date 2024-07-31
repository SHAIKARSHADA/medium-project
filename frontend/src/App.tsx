import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Blog } from './pages/Blog'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
