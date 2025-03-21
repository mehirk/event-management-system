import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const location = useLocation();
  
  return (
    <motion.header 
      className="header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Event Management System
        </motion.h1>
        <nav>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/events', label: 'Events' },
              { path: '/create-event', label: 'Create Event' }
            ].map((link) => (
              <motion.li key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                  {link.label}
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