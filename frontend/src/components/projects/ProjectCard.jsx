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
      400px circle at ${spotlightX}px ${spotlightY}px,
      rgba(14, 165, 233, 0.15),
      rgba(217, 70, 239, 0.1),
      transparent 70%
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
      className="card group cursor-pointer relative overflow-hidden h-full"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Spotlight effect */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-10 transition duration-300 rounded-2xl"
        style={{ background: spotlightBackground }}
      />
      
      <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Imagen del proyecto */}
        <motion.div 
          className="relative overflow-hidden h-48 w-full"
        >
          {/* Imagen del proyecto con animación */}
          <motion.div
            className="w-full h-full"
            animate={{
              scale: isHovered ? 1.1 : 1
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
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
              {category === 'simple' ? 'Simple' : 
               category === 'corporate' ? 'Corporativo' : 
               category === 'custom' ? 'Personalizado' : category}
            </span>
          </motion.div>
          
          {/* Overlay oscuro al hacer hover con animación */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Botón de acción que aparece al hacer hover */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Proyecto
            </motion.button>
          </motion.div>
        </motion.div>


        
        {/* Contenido del proyecto */}
        <div className="p-6 flex-grow flex flex-col">
          <motion.h3 
            className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary-600 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title || t(titleKey) || `Proyecto ${id}`}
          </motion.h3>
          
          <motion.p 
            className="text-text-secondary mb-4 leading-relaxed flex-grow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description || t(descriptionKey) || `Descripción del proyecto ${id}`}
          </motion.p>
          
          {/* Tecnologías utilizadas */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {technologies && technologies.slice(0, 3).map((tech, index) => (
              <motion.span 
                key={index}
                className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium"
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
            {technologies && technologies.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                +{technologies.length - 3}
              </span>
            )}
          </motion.div>
          
          {/* Botón de acción */}
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {url ? (
              <motion.a 
                href="#"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(url, '_blank');
                }}
                whileHover={{ x: 5 }}
              >
                Ver proyecto 
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            ) : (
              <Link 
                to={`/projects/${id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
              >
                Ver detalles
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;