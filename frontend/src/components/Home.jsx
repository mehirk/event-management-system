import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const styles = {
  center: { 
    textAlign: 'center',
    padding: '2rem 0'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  features: {
    marginTop: '3rem',
    backgroundColor: 'var(--surface)',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: 'var(--shadow)'
  },
  featureList: {
    paddingLeft: '1.5rem',
    listStyleType: 'disc',
    color: 'var(--text)'
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Home() {
  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        style={styles.center}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1 
          style={{ marginBottom: '1rem' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Event Management System
        </motion.h1>
        
        <motion.p 
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A simple application to manage your events
        </motion.p>
        
        <motion.div 
          style={styles.buttons}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/events" className="button">
              View All Events
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/create-event" className="button" style={{ backgroundColor: '#10b981' }}>
              Create New Event
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        style={styles.features}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <motion.h2 
          style={{ marginBottom: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Features
        </motion.h2>
        
        <motion.ul 
          style={styles.featureList}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[
            "Create and manage events with details like title, description, date, time, and location",
            "View a list of all upcoming events",
            "See detailed information about each event",
            "Edit event details as needed",
            "Remove events that are no longer relevant"
          ].map((feature, index) => (
            <motion.li key={index} variants={item}>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export default Home; 