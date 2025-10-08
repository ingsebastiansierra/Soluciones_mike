import React from 'react';

const Section = ({
  children,
  className = '',
  id,
  fullWidth = false,
  dark = false,
}) => {
  // Clases base para la sección
  const sectionClasses = `section ${dark ? 'bg-bg-dark text-text-light' : 'bg-bg-light text-text-primary'} ${className}`;

  // Contenido de la sección
  const content = (
    <div className={fullWidth ? '' : 'container-custom'}>
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={sectionClasses}
    >
      {content}
    </section>
  );
};

export default Section;