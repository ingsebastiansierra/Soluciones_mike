import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';

const ProjectCard = ({ id, titleKey, title, descriptionKey, description, image, category, technologies, url }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Mouse position tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create gradient spotlight effect
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      650px circle at ${spotlightX}px ${spotlightY}px,
      rgba(var(--color-accent-rgb), 0.15),
      transparent 80%
    )
  `;
  
  // Handle mouse move for spotlight effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(x);
    spotlightY.set(y);
  };
  
  // Animación para la tarjeta
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    }
  };

  // Animación para el contenido
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  // Manejar el clic para navegar al proyecto
  const handleClick = (e) => {
    if (url) {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg relative"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Spotlight effect */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-10 transition duration-300"
        style={{ background: spotlightBackground }}
      />
      
      {/* Imagen del proyecto */}
      <motion.div 
        className="relative overflow-hidden group h-64 w-full"
        style={{ 
          position: "relative",
          top: 0,
          left: 0
        }}
      >
        {/* Imagen del proyecto con animación */}
        <motion.div
          className="w-full h-full"
          animate={{
            scale: isHovered ? 1.08 : 1
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <img 
            src={image} 
            alt="Imagen del proyecto" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
            }}
          />
        </motion.div>
        
        {/* Overlay con categoría */}
        <motion.div 
          className="absolute top-4 left-4 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="bg-accent text-white text-xs px-3 py-1.5 rounded-md font-medium">
            {category === 'simple' ? 'Sitio Web Simple' : 
             category === 'corporate' ? 'Sitio Web Corporativo' : 
             category === 'custom' ? 'Sitio Web Personalizado' : category}
          </span>
        </motion.div>
        
        {/* Overlay oscuro al hacer hover con animación */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.6 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Texto superpuesto en la imagen que aparece al hacer hover */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 text-white z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>


      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title || t(titleKey) || `Proyecto ${id}`}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description || t(descriptionKey) || `Descripción del proyecto ${id}`}
        </motion.p>
        
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {url ? (
              <a 
                href="#"
                className="text-accent hover:text-accent/80 font-medium transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(url, '_blank');
                }}
              >
                Ver proyecto →
              </a>
            ) : (
              <Link 
                to={`/projects/${id}`}
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Ver proyecto →
              </Link>
            )}
          </motion.div>
          
          {/* Tecnologías utilizadas */}
          <div className="flex space-x-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;