import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, createEvent, updateEvent } from '../services/eventService';

// Shared styles
const styles = {
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  group: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.5rem' },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem'
  },
  error: {
    backgroundColor: '#fee2e2',
    border: '1px solid #ef4444',
    color: '#b91c1c',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    marginBottom: '1rem'
  },
  buttonGroup: { display: 'flex', gap: '0.5rem' }
};

function EventForm({ isEditing = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: ''
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchEvent(id);
    }
  }, [isEditing, id]);

  const fetchEvent = async (eventId) => {
    try {
      setLoading(true);
      const data = await getEvent(eventId);
      
      // Format date for the input field (YYYY-MM-DD)
      const eventDate = new Date(data.date);
      const formattedDate = eventDate.toISOString().split('T')[0];
      
      setFormData({
        ...data,
        date: formattedDate
      });
    } catch (err) {
      setError('Failed to fetch event details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (isEditing) {
        await updateEvent(id, formData);
      } else {
        await createEvent(formData);
      }
      
      navigate('/events');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} event`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={styles.form}>
      <h2 style={{ marginBottom: '1rem' }}>
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </h2>
      
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.group}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.group}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{...styles.input, height: '120px'}}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          
          <div>
            <label style={styles.label}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>
        
        <div style={styles.group}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.group}>
          <label style={styles.label}>Organizer</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.buttonGroup}>
          <button
            type="submit"
            disabled={loading}
            className="button"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="button"
            style={{ backgroundColor: '#6b7280' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm; 