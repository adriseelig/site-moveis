import React from 'react';
import { motion } from 'motion/react';

/**
 * Portfolio section for EME Móveis.
 * Displays a gallery of custom furniture projects.
 * Images are loaded from public/images/ (simulated here with Unsplash for visual quality).
 */
export default function Portfolio() {
  // Static list of projects. In a real scenario, this could be easily updated by students.
  const projects = [
    {
      id: 1,
      title: 'Cozinha Gourmet Anthracite',
      category: 'Cozinha',
      image: 'https://images.unsplash.com/photo-1556911223-e1534ecdb531?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      title: 'Suíte Master Walk-in',
      category: 'Dormitório',
      image: 'https://images.unsplash.com/photo-1595428774751-267868770857?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      title: 'Home Office Executivo',
      category: 'Escritório',
      image: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 4,
      title: 'Living Integrado',
      category: 'Sala',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 5,
      title: 'Área Gourmet Externa',
      category: 'Lazer',
      image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 6,
      title: 'Banheiro Spa',
      category: 'Banheiro',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Portfólio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight text-gray-900">
            Nossos Projetos <span className="text-gray-400 font-light">Realizados</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Confira alguns dos ambientes que transformamos. Cada projeto é único e pensado exclusivamente para o estilo de vida de nossos clientes.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
                  {project.category}
                </span>
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
              </div>
              
              {/* Static Content (Mobile/Fallback) */}
              <div className="p-4 md:hidden">
                <span className="text-red-700 text-[10px] font-bold uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="text-gray-900 font-bold">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Note for Students */}
        <div className="mt-16 text-center text-gray-400 text-sm italic">
          <p>Dica: Para adicionar mais projetos, basta adicionar novos objetos ao array 'projects' no código fonte.</p>
        </div>
      </div>
    </section>
  );
}
