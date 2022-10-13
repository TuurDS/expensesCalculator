import './style/main.scss';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { EventsProvider } from './contexts/EventsProvider';
import { EventsDataProvider } from './contexts/EventDataProvider';
import { SearchProvider } from './contexts/SearchProvider';
import PrivateRoute from './components/PrivateRoute';
//pages
import Home from './pages/home/Home';
import Error from './pages/error/Error';
//routes
import Login from './pages/login/Login';
import EventPage from './pages/event/EventPage';

function App() {

  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <EventsProvider>
            <Routes>
              <Route exact path="/login/" element={<Login />} />
              <Route exact path="/" element={
                <PrivateRoute roleBlacklist={[]}>
                  <Home />
                </PrivateRoute>
              } />
              <Route exact path="/event/:id" element={
                <PrivateRoute roleBlacklist={[]}>
                  <EventsDataProvider>
                    <EventPage />
                  </EventsDataProvider>
                </PrivateRoute>
              } />
              <Route exact path="*" element={<Error />} />
            </Routes>
          </EventsProvider>
        </SearchProvider>
      </AuthProvider>
    </>
  )
}

export default App;
