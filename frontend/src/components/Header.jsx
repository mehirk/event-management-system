import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const location = useLocation();
  
  // Define navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/events', label: 'Events', icon: '📅' },
    { path: '/create-event', label: 'Create Event', icon: '✨' }
  ];
  
  return (
    <motion.header 
      className="header glass-effect"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0.5rem 0'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            style={{ 
              marginRight: '0.75rem', 
              background: 'linear-gradient(135deg, #525252, #262626)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(64, 64, 64, 0.5)'
            }}
          >
            <span style={{ fontSize: '18px' }}>📅</span>
          </motion.div>
          <Link to="/">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Event Manager
            </motion.h1>
          </Link>
        </motion.div>

        <nav>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: 'flex',
              gap: '1.5rem'
            }}
          >
            {navItems.map((link) => (
              <motion.li 
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'relative' }}
              >
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span style={{ 
                    fontSize: '0.9rem',
                    opacity: location.pathname === link.path ? 1 : 0.7
                  }}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                  
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '1px'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header; 