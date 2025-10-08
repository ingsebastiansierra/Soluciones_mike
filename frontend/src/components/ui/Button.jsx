import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Clases base para todos los botones
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none';
  
  // Variantes de botones con mejor contraste
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl border-0',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 shadow-lg hover:shadow-xl border-0',
    accent: 'bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:from-accent-700 hover:to-accent-800 shadow-lg hover:shadow-xl border-0',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white bg-transparent shadow-md hover:shadow-lg',
    ghost: 'bg-white/10 backdrop-blur-sm text-primary-700 hover:bg-primary-50 hover:text-primary-800 border border-primary-200 hover:border-primary-300',
    light: 'bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl border border-primary-200 hover:border-primary-300',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 shadow-lg hover:shadow-xl border-0',
    success: 'bg-gradient-to-r from-success-600 to-success-700 text-white hover:from-success-700 hover:to-success-800 shadow-lg hover:shadow-xl border-0',
    warning: 'bg-gradient-to-r from-warning-600 to-warning-700 text-white hover:from-warning-700 hover:to-warning-800 shadow-lg hover:shadow-xl border-0',
  };
  
  // Tamaños de botones
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Clases para estado deshabilitado
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combinar todas las clases
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  // Animación con framer-motion
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };
  
  // Renderizar como Link si se proporciona 'to'
  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={buttonClasses} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  // Renderizar como anchor si se proporciona 'href'
  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={buttonClasses} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      </motion.div>
    );
  }
  
  // Renderizar como button por defecto
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;