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
  
  // Variantes de botones
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-md',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    ghost: 'bg-transparent text-text-primary dark:text-text-light hover:bg-light-bg/50 dark:hover:bg-dark-bg/50',
    light: 'bg-light-bg text-text-primary hover:bg-border-light shadow-sm',
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