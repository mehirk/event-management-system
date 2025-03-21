import { Link } from 'react-router-dom';

const styles = {
  center: { 
    textAlign: 'center',
    padding: '2rem 0'
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#666',
    marginBottom: '2rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem'
  },
  features: {
    marginTop: '3rem',
    backgroundColor: '#f3f4f6',
    padding: '1.5rem',
    borderRadius: '0.5rem'
  },
  featureList: {
    paddingLeft: '1.5rem',
    listStyleType: 'disc'
  }
};

function Home() {
  return (
    <div className="container">
      <div style={styles.center}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to Event Management System</h1>
        <p style={styles.subtitle}>
          A simple application to manage your events
        </p>
        
        <div style={styles.buttons}>
          <Link 
            to="/events" 
            className="button"
            style={{ backgroundColor: '#3b82f6' }}
          >
            View All Events
          </Link>
          <Link 
            to="/create-event" 
            className="button"
            style={{ backgroundColor: '#10b981' }}
          >
            Create New Event
          </Link>
        </div>
      </div>
      
      <div style={styles.features}>
        <h2 style={{ marginBottom: '1rem' }}>Features</h2>
        <ul style={styles.featureList}>
          <li>Create and manage events with details like title, description, date, time, and location</li>
          <li>View a list of all upcoming events</li>
          <li>See detailed information about each event</li>
          <li>Edit event details as needed</li>
          <li>Remove events that are no longer relevant</li>
        </ul>
      </div>
    </div>
  );
}

export default Home; 