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
    backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary))',
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
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '0.75rem',
    border: '1px solid var(--border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: 'var(--primary)',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
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
    background: 'linear-gradient(135deg, var(--primary) 0%, transparent 70%)',
    filter: 'blur(60px)'
  }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const features = [
  {
    icon: '📅',
    title: 'Event Creation',
    description: 'Create events with details like title, description, date, time, and location'
  },
  {
    icon: '🔍',
    title: 'Event Discovery',
    description: 'View a list of all upcoming events with quick access to details'
  },
  {
    icon: '✏️',
    title: 'Easy Editing',
    description: 'Edit event details anytime to keep your information up-to-date'
  },
  {
    icon: '🗑️',
    title: 'Event Management',
    description: 'Remove events that are no longer relevant or have been cancelled'
  }
];

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
        <div style={styles.heroShape}>
          <motion.div 
            style={{...styles.circle, top: '-150px', left: '-100px', width: '600px', height: '600px'}}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <motion.div 
            style={{...styles.circle, bottom: '-80px', right: '-80px', width: '500px', height: '500px'}}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        </div>
      
        <motion.h1 
          style={styles.title}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Streamline Your Event Management
        </motion.h1>
        
        <motion.p 
          style={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A powerful yet simple application to create, manage, and organize events all in one place
        </motion.p>
        
        <motion.div 
          style={styles.buttons}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/events" className="button" style={{ padding: '0.8rem 1.5rem' }}>
              Browse Events
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/create-event" 
              className="button button-success" 
              style={{ padding: '0.8rem 1.5rem' }}
            >
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
        className="glass-effect"
      >
        <div style={styles.featureSection}>
          <motion.h2 
            style={{ marginBottom: '1rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Powerful Features
          </motion.h2>
          
          <motion.p
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Everything you need to manage events efficiently
          </motion.p>
        </div>
        
        <motion.div 
          style={styles.featureGrid}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              style={styles.featureCard}
              variants={item}
              whileHover={{ 
                y: -5, 
                boxShadow: 'var(--shadow-lg)',
                borderColor: 'var(--border-light)' 
              }}
            >
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home; 