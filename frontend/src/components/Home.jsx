import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const styles = {
  hero: { 
    textAlign: 'center',
    padding: '3rem 0',
    position: 'relative'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    backgroundImage: 'linear-gradient(135deg, #e5e5e5, #a3a3a3)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: '700',
    letterSpacing: '-0.05em',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    marginBottom: '2.5rem',
    maxWidth: '700px',
    margin: '0 auto 2.5rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  features: {
    marginTop: '4rem',
    backgroundColor: 'var(--surface)',
    padding: '3rem 2rem',
    borderRadius: '1rem',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
  },
  featureSection: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
    backgroundColor: 'rgba(23, 23, 23, 0.5)',
    borderRadius: '0.75rem',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: 'var(--primary)',
    background: 'linear-gradient(135deg, #e5e5e5, #a3a3a3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.75rem'
  },
  featureDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5'
  },
  heroShape: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: '-1',
    opacity: '0.5',
  },
  circle: {
    position: 'absolute', 
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #404040 0%, transparent 70%)',
    filter: 'blur(60px)'
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
        style={styles.hero}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1 
          style={styles.title}
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