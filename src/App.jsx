import { useState } from 'react'
import Home from './pages/home/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { createTheme, ThemeProvider } from '@mui/material'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Merriweather, serif',
  },
  palette: {
    primary: {
      main: '#102030',
    },
    secondary: {
      main: '#CE4420',
    },
    low:{
      main: '#00FF00',
    },
    moderate:{
      main: '#FFFF00'
    },
    high:{
      main: '#FF0000'
    }
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
          } />
        <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
          
          } />
          <Route path='/updateProfile' element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
          } />
      </Routes>
    </ThemeProvider>
  )
}

export default App
