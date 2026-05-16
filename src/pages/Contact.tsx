import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Instagram, Mail, Send, CheckCircle2 } from 'lucide-react';

/**
 * Contact section for EME Móveis.
 * Includes contact info cards and a simple status-handled form.
 */
export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contato" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-red-700 font-bold uppercase tracking-widest text-sm">Contato</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Vamos planejar seu <span className="text-red-700 italic">próximo projeto?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 leading-tight">
              Fale com um de nossos <br />especialistas agora mesmo.
            </h3>
            
            <div className="space-y-6">
              {/* Social/Link Cards */}
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-red-700/30 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">WhatsApp</p>
                  <p className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">(11) 99999-9999</p>
                </div>
              </a>

              <a 
                href="#" 
                className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-red-700/30 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Instagram</p>
                  <p className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">@ememoveis</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-2xl border border-transparent hover:bg-white hover:shadow-sm transition-all group">
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-lg font-bold text-gray-900">contato@ememoveis.com.br</p>
                </div>
              </div>
            </div>
            
            <p className="mt-12 text-gray-500 italic">
              * Atendimento de Segunda a Sexta, das 09h às 18h.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: João Silva"
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all placeholder:text-gray-300" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="(00) 00000-0000"
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all placeholder:text-gray-300" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="voce@exemplo.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all placeholder:text-gray-300" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Mensagem</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Conte-nos um pouco sobre o projeto que você tem em mente..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all placeholder:text-gray-300 resize-none" 
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                  formStatus === 'success' 
                    ? 'bg-green-600 text-white' 
                    : formStatus === 'sending'
                    ? 'bg-red-800 text-white opacity-70 cursor-wait'
                    : 'bg-black text-white hover:bg-red-900 shadow-lg'
                }`}
              >
                {formStatus === 'success' ? (
                  <>
                    <CheckCircle2 size={24} />
                    Mensagem Enviada!
                  </>
                ) : formStatus === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar Orçamento
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
