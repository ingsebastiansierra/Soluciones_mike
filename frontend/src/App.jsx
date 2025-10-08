import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LayoutNoFooter from './components/layout/LayoutNoFooter'
import LayoutEmpty from './components/layout/LayoutEmpty'
import './App.css'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const Specifications = lazy(() => import('./pages/Specifications'))
const Abogado = lazy(() => import('./paginas_simples/abogado/Abogado'))
const Barberia = lazy(() => import('./paginas_simples/barberia/Barberia'))
const Restaurante = lazy(() => import('./paginas_simples/restaurante/restaurante'))
const NotFound = () => <div className="container mx-auto p-8">404 - Page Not Found</div>

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-primary-600">Cargando...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="specifications" element={<Specifications />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/paginas_simples/abogado" element={<LayoutNoFooter />}>
            <Route index element={<Abogado />} />
          </Route>
          <Route path="/paginas_simples/barberia" element={<LayoutNoFooter />}>
            <Route index element={<Barberia />} />
          </Route>
          <Route path="/paginas_simples/restaurante" element={<LayoutEmpty />}>
            <Route index element={<Restaurante />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
