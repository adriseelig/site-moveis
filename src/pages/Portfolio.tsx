import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * Portfolio section for eMe Móveis.
 * Features a clickable gallery that opens a Modal (Lightbox) with multiple images per project.
 */
export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Updated projects list with "album" support
  const projects = [
    {
      id: 1,
      title: 'Cozinha',
      category: 'Onde a casa realmente acontece.',
      mainImage: '/images/cozinha/cozinha1.png',
      album: [
        '/images/cozinha/cozinha1.png',
        '/images/cozinha/cozinha3.png',
        '/images/cozinha/cozinha4.png',
        '/images/cozinha/cozinha5.png',
        '/images/cozinha/cozinha6.png',
        '/images/cozinha/cozinha7.png',
        '/images/cozinha/cozinha8.png',
        '/images/cozinha/cozinha9.png',
        '/images/cozinha/cozinha10.png',
        '/images/cozinha/cozinha11.png',
        '/images/cozinha/cozinha12.png',
        '/images/cozinha/cozinha13.png',
        '/images/cozinha/cozinha14.png',
        '/images/cozinha/cozinha15.png',
        '/images/cozinha/cozinha16.png',
        '/images/cozinha/cozinha17.png',
        '/images/cozinha/cozinha18.png',
        '/images/cozinha/cozinha19.png'
      ],
      description: 'Cozinhas que unem convivência, praticidade e personalidade, desenhadas para acompanhar cada momento da casa.'
    },
    {
      id: 2,
      title: 'Quarto',
      category: 'Conforto que começa no ambiente.',
      mainImage: '/images/quarto/quarto1.png',
      album: [
        '/images/quarto/quarto2.png',
        '/images/quarto/quarto3.png',
        '/images/quarto/quarto4.png',
        '/images/quarto/quarto5.png'
      ],
      description: 'Espaços criados para desacelerar, descansar e refletir a personalidade de quem vive ali.'
    },
    {
      id: 3,
      title: 'Banheiro',
      category: 'Funcionalidade com cara de spa.',
      mainImage: '/images/banheiro/banheiro1.png',
      album: [
        '/images/banheiro/banheiro1.png',
        '/images/banheiro/banheiro2.png',
        '/images/banheiro/banheiro3.png',
        '/images/banheiro/banheiro4.png'
      ],
      description: 'Projetos que equilibram conforto, organização e estética para criar um espaço leve, elegante e prático no dia a dia.'
    },
    {
      id: 4,
      title: 'Sala',
      category: 'Design para receber e viver.',
      mainImage: '/images/sala/sala1.png',
      album: [
        '/images/sala/sala1.png',
        '/images/sala/sala2.png',
        '/images/sala/sala3.png',
        '/images/sala/sala4.png',
        '/images/sala/sala5.png'
      ],
      description: 'Ambientes que conectam elegância e aconchego, feitos para transformar encontros em experiências memoráveis.'
    },
    {
      id: 5,
      title: 'Adega',
      category: 'Seu vinho, no cenário certo.',
      mainImage: '/images/adega/adega1.png',
      album: [
        '/images/adega/adega1.png',
        '/images/adega/adega2.png',
        '/images/adega/adega3.png',
        '/images/adega/adega4.png'
      ],
      description: 'Ambientes pensados para transformar rótulos em experiência, unindo sofisticação, iluminação e design sob medida.'
    },
    {
      id: 6,
      title: 'Closet',
      category: 'Tudo no lugar, sem perder o estilo.',
      mainImage: '/images/closet/closet1.png',
      album: [
        '/images/closet/closet1.png',
        '/images/closet/closet2.png'
      ],
      description: 'Closets planejados para valorizar cada detalhe da rotina, com soluções inteligentes e acabamento que impressiona.'
    }
  ];

  const openModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Disable scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.album.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.album.length) % selectedProject.album.length);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-red-800 font-bold uppercase tracking-widest text-sm">Portfólio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight text-gray-900">
            Nossos Projetos <span className="text-gray-400 font-light">Realizados</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Clique em um projeto para ver mais detalhes e o álbum completo de fotos.
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
              onClick={() => openModal(project)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm text-white">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>
              
              {/* Mobile Content Display */}
              <div className="p-4 md:hidden flex justify-between items-center">
                <div>
                  <span className="text-red-800 text-[10px] font-bold uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="text-gray-900 font-bold">{project.title}</h3>
                </div>
                <span className="text-gray-400 text-xs">{project.album.length} fotos</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={40} />
            </button>

            {/* Main Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full flex flex-col items-center"
            >
              <div className="relative w-full aspect-video md:h-[70vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl bg-black">
                {/* Navigation Arrows if album has more than 1 image */}
                {selectedProject.album.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 p-3 bg-black/50 hover:bg-red-800 text-white rounded-full transition-all z-10"
                    >
                      <ChevronLeft size={30} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 p-3 bg-black/50 hover:bg-red-800 text-white rounded-full transition-all z-10"
                    >
                      <ChevronRight size={30} />
                    </button>
                  </>
                )}

                {/* Main Image */}
                <img
                  key={currentImageIndex}
                  src={selectedProject.album[currentImageIndex]}
                  alt={selectedProject.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Project Details below Image */}
              <div className="mt-8 text-center text-white max-w-2xl px-4">
                <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">
                  {selectedProject.category} • Foto {currentImageIndex + 1} de {selectedProject.album.length}
                </span>
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-gray-400 text-lg italic">
                  {selectedProject.description}
                </p>
                <a 
                  href="#contato"
                  onClick={closeModal}
                  className="inline-block mt-8 bg-red-800 hover:bg-red-900 text-white px-8 py-3 rounded-full font-bold transition-all"
                >
                  Gostou? Peça um igual
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
