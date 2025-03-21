import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents, deleteEvent } from '../services/eventService';

const styles = {
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem'
  },
  eventTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--text)'
  },
  eventMeta: {
    color: 'var(--text-secondary)'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh'
  },
  loadingDot: {
    width: '12px',
    height: '12px',
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)'
  }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event._id !== id));
      } catch (err) {
        setError('Failed to delete event');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <motion.div
          style={styles.loadingDot}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.1 }}
        />
        <motion.div
          style={styles.loadingDot}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2, delay: 0.2 }}
        />
        <motion.div
          style={styles.loadingDot}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3, delay: 0.4 }}
        />
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ color: '#ef4444', textAlign: 'center', padding: '2rem' }}
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        style={{ marginBottom: '1.5rem' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Events
      </motion.h2>
      
      {events.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No events found
        </motion.p>
      ) : (
        <motion.div 
          className="grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {events.map((event) => (
              <motion.div 
                key={event._id} 
                className="card"
                variants={cardVariants}
                exit="exit"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <p style={styles.eventMeta}>
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p style={styles.eventMeta}>Location: {event.location}</p>
                <p style={styles.eventMeta}>Organizer: {event.organizer}</p>
                <div style={styles.buttonGroup}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/events/${event._id}`} 
                      className="button"
                      style={{ padding: '0.35rem 0.85rem' }}
                    >
                      View
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/events/edit/${event._id}`} 
                      className="button"
                      style={{ backgroundColor: '#10b981', padding: '0.35rem 0.85rem' }}
                    >
                      Edit
                    </Link>
                  </motion.div>
                  
                  <motion.button 
                    onClick={() => handleDelete(event._id)}
                    className="button"
                    style={{ backgroundColor: '#ef4444', padding: '0.35rem 0.85rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default EventList; 