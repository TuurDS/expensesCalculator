import './style/main.scss';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
//pages
import Home from './pages/home/Home';
import Error from './pages/error/Error';
//routes
import Login from './pages/login/Login';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path="/login/" element={<Login />} />
          <Route exact path="/" element={
            <PrivateRoute roleBlacklist={[]}>
              <Home />
            </PrivateRoute>
          } />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
