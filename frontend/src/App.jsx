import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EventForm from './components/EventForm';
import './index.css';

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--background)',
    color: 'var(--text)'
  },
  main: {
    flexGrow: 1,
    padding: '2rem 0'
  }
};

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <main style={styles.main} className="container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/create-event" element={<EventForm isEditing={false} />} />
              <Route path="/events/edit/:id" element={<EventForm isEditing={true} />} />
            </Routes>
          </AnimatePresence>
        </main>
        <footer className="footer">
          <p>Event Management System &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 