import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';

const SimpleWebsites = () => {
  const { t } = useTranslation();

  const websites = [
    {
      id: 'abogado',
      title: 'Bufete de Abogados',
      description: 'Sitio web profesional para un bufete de abogados con secciones para servicios, equipo legal, testimonios y contacto.',
      image: '/images/websites/lawyer.svg',
      path: '/paginas_simples/abogado'
    },
    {
      id: 'barberia',
      title: 'Barbería',
      description: 'Sitio web moderno para una barbería con secciones para servicios, galería, precios, testimonios y reserva de citas.',
      image: '/images/websites/barbershop.svg',
      path: '/paginas_simples/barberia'
    }
  ];

  // Animación para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="py-12 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('projects.simpleWebsites.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('projects.simpleWebsites.subtitle')}
          </p>
        </motion.div>

        {/* Websites Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {websites.map((website) => (
            <motion.div
              key={website.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center p-4">
                <img src={website.image} alt={website.title} className="h-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{website.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{website.description}</p>
                <Link
                  to={website.path}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                >
                  {t('projects.simpleWebsites.viewButton')}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
};

export default SimpleWebsites;