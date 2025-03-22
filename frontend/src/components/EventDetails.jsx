import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEvent, deleteEvent } from '../services/eventService';
import ConfirmationModal from './ConfirmationModal';

const styles = {
  eventCard: {
    backgroundColor: 'var(--surface)',
    borderRadius: '1rem',
    boxShadow: 'var(--shadow)',
    padding: '2rem',
    border: '1px solid var(--border)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '2rem',
    position: 'relative'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    backgroundImage: 'linear-gradient(135deg, #e5e5e5, #a3a3a3)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  metaSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(23, 23, 23, 0.4)',
    border: '1px solid var(--border)'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    color: 'var(--text-secondary)'
  },
  metaIcon: {
    fontSize: '1.25rem',
    color: 'var(--primary)',
    marginTop: '0.15rem'
  },
  metaContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  metaLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem',
    color: 'var(--text-secondary)'
  },
  metaValue: {
    fontSize: '1rem',
    fontWeight: '500',
    color: 'var(--text)'
  },
  description: {
    backgroundColor: 'rgba(23, 23, 23, 0.4)',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
    border: '1px solid var(--border)',
    whiteSpace: 'pre-line',
    lineHeight: '1.7'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  decorativeLine: {
    height: '4px',
    background: 'linear-gradient(90deg, #525252, #262626)',
    width: '60px',
    borderRadius: '2px',
    marginBottom: '1.5rem'
  }
};

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await getEvent(id);
      setEvent(data);
    } catch (err) {
      setError('Failed to fetch event details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEvent(id);
      setIsDeleteModalOpen(false);
      navigate('/events');
    } catch (err) {
      setError('Failed to delete event');
      console.error(err);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="loading-dot"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect"
        style={{ color: 'var(--danger)', textAlign: 'center', padding: '2rem', borderRadius: '0.75rem', margin: '2rem auto', maxWidth: '800px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', display: 'block' }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h3 style={{ marginBottom: '1rem' }}>Error</h3>
        <p>{error}</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ marginTop: '1.5rem' }}>
          <Link to="/events" className="button">Back to Events</Link>
        </motion.div>
      </motion.div>
    );
  }
  
  if (!event) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect"
        style={{ textAlign: 'center', padding: '2rem', borderRadius: '0.75rem', margin: '2rem auto', maxWidth: '800px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3 style={{ marginBottom: '1rem' }}>Event Not Found</h3>
        <p>The event you're looking for doesn't exist or has been removed.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ marginTop: '1.5rem' }}>
          <Link to="/events" className="button">Browse Events</Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        style={styles.eventCard}
        variants={sectionVariants}
        className="glass-effect"
      >
        <motion.div style={styles.header} variants={sectionVariants}>
          <motion.h2 
            style={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {event.title}
          </motion.h2>
          <motion.div 
            style={styles.decorativeLine}
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>
        
        <motion.div 
          style={styles.metaSection}
          variants={sectionVariants}
        >
          <div style={styles.metaItem}>
            <div style={styles.metaIcon}>📅</div>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Date</span>
              <span style={styles.metaValue}>{new Date(event.date).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div style={styles.metaItem}>
            <div style={styles.metaIcon}>⏰</div>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Time</span>
              <span style={styles.metaValue}>{event.time}</span>
            </div>
          </div>
          
          <div style={styles.metaItem}>
            <div style={styles.metaIcon}>📍</div>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Location</span>
              <span style={styles.metaValue}>{event.location}</span>
            </div>
          </div>
          
          <div style={styles.metaItem}>
            <div style={styles.metaIcon}>👤</div>
            <div style={styles.metaContent}>
              <span style={styles.metaLabel}>Organizer</span>
              <span style={styles.metaValue}>{event.organizer}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          style={styles.description}
          variants={sectionVariants}
        >
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Description</h3>
          <p>{event.description}</p>
        </motion.div>
        
        <motion.div 
          style={styles.buttonGroup}
          variants={sectionVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to={`/events/edit/${event._id}`}
              className="button button-success"
            >
              Edit Event
            </Link>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeleteClick}
            className="button button-danger"
          >
            Delete Event
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/events"
              className="button"
              style={{ backgroundColor: 'var(--surface-lighter)' }}
            >
              Back to Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${event.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </motion.div>
  );
}

export default EventDetails; 