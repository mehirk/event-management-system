import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvent, deleteEvent } from '../services/eventService';

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem'
  },
  metaItem: {
    marginBottom: '0.5rem',
    color: '#666'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem'
  }
};

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        navigate('/events');
      } catch (err) {
        setError('Failed to delete event');
        console.error(err);
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!event) return <div style={{ textAlign: 'center' }}>Event not found</div>;

  return (
    <div className="container" style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '0.5rem' }}>{event.title}</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <p style={styles.metaItem}>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p style={styles.metaItem}>
            <strong>Time:</strong> {event.time}
          </p>
          <p style={styles.metaItem}>
            <strong>Location:</strong> {event.location}
          </p>
          <p style={styles.metaItem}>
            <strong>Organizer:</strong> {event.organizer}
          </p>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Description:</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{event.description}</p>
        </div>
        
        <div style={styles.buttonGroup}>
          <Link 
            to={`/events/edit/${event._id}`}
            className="button"
            style={{ backgroundColor: '#10b981' }}
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="button"
            style={{ backgroundColor: '#ef4444' }}
          >
            Delete
          </button>
          <Link
            to="/events"
            className="button"
            style={{ backgroundColor: '#6b7280' }}
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetails; 