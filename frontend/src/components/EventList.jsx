import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getEvents, deleteEvent } from '../services/eventService';
import ConfirmationModal from './ConfirmationModal';

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
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  eventIcon: {
    marginRight: '0.5rem',
    opacity: 0.7
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

const loadingVariants = {
  initial: {
    scale: 1
  },
  animate: {
    scale: [1, 1.5, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 0.2
    }
  }
};

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      await deleteEvent(eventToDelete._id);
      setEvents(events.filter(event => event._id !== eventToDelete._id));
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
      setIsDeleteModalOpen(false);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect"
          style={{ padding: '2rem', textAlign: 'center', borderRadius: '0.5rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', opacity: 0.5 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p>No events found</p>
          <Link to="/create-event" className="button">Create your first event</Link>
        </motion.div>
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
                  <span style={styles.eventIcon}>📅</span>
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p style={styles.eventMeta}>
                  <span style={styles.eventIcon}>📍</span>
                  Location: {event.location}
                </p>
                <p style={styles.eventMeta}>
                  <span style={styles.eventIcon}>👤</span>
                  Organizer: {event.organizer}
                </p>
                <div style={styles.buttonGroup}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/events/${event._id}`} 
                      className="button"
                      style={{ padding: '0.35rem 0.85rem' }}
                    >
                      View Details
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/events/edit/${event._id}`} 
                      className="button button-success"
                      style={{ padding: '0.35rem 0.85rem' }}
                    >
                      Edit
                    </Link>
                  </motion.div>
                  
                  <motion.button 
                    onClick={() => handleDeleteClick(event)}
                    className="button button-danger"
                    style={{ padding: '0.35rem 0.85rem' }}
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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={eventToDelete ? `Are you sure you want to delete "${eventToDelete.title}"? This action cannot be undone.` : 'Are you sure you want to delete this event?'}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </motion.div>
  );
}

export default EventList; 