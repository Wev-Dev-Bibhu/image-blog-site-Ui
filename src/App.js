import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import LikesPics from './components/LikesPics';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import OnBoarding from './components/OnBoarding';
import Explore from './components/Explore';
import Dashboard from './components/Dashboard';


const App = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(100)
  }, [])

  // setProgress(() => {
  //   setTimeout(() => {
  //     return 100
  //   }, 600);
  // })
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
          <Navbar progress={progress} setProgress={setProgress} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/signin" element={<SignIn setProgress={setProgress} />} />
            <Route path="/signup" element={<SignUp setProgress={setProgress} />} />
            <Route path="/:userID" element={<Home />} />
            <Route path="/explore/:username/:total" element={<Explore />} />
            <Route path="/about" element={<About />} setProgress={setProgress} />
            <Route path="/:userID/favourites" exact element={<LikesPics />} setProgress={setProgress} />
            <Route path="/:userID/dashboard" element={<Dashboard />} setProgress={setProgress} />
          </Routes>
        </SnackbarProvider>

      </BrowserRouter>
    </>
  )
}

export default App
