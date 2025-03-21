import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../services/eventService';

const styles = {
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem'
  },
  eventTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  eventMeta: {
    color: '#666'
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

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: '1rem' }}>Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="grid">
          {events.map((event) => (
            <div key={event._id} className="card">
              <h3 style={styles.eventTitle}>{event.title}</h3>
              <p style={styles.eventMeta}>
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p style={styles.eventMeta}>Location: {event.location}</p>
              <p style={styles.eventMeta}>Organizer: {event.organizer}</p>
              <div style={styles.buttonGroup}>
                <Link 
                  to={`/events/${event._id}`} 
                  className="button"
                  style={{ backgroundColor: '#3b82f6', padding: '0.25rem 0.75rem' }}
                >
                  View
                </Link>
                <Link 
                  to={`/events/edit/${event._id}`} 
                  className="button"
                  style={{ backgroundColor: '#10b981', padding: '0.25rem 0.75rem' }}
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(event._id)}
                  className="button"
                  style={{ backgroundColor: '#ef4444', padding: '0.25rem 0.75rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList; 