import React from 'react';

const Section = ({
  children,
  className = '',
  id,
  fullWidth = false,
  dark = false,
}) => {
  // Clases base para la sección
  const sectionClasses = `py-8 md:py-16 ${dark ? 'bg-dark-bg text-text-light' : 'bg-light-bg text-text-primary'} ${className}`;

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