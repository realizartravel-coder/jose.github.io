import React, { useState, useEffect, useRef } from 'react';
import { TOURS, FAQS, TESTIMONIALS } from './constants';
import { Tour, FAQItem, Testimonial, Message } from './types';
import { getGeminiChatResponse } from './geminiService';

// Reusable Components
const Button = ({ children, onClick, className = "", variant = "primary" }: any) => {
  const variants: any = {
    primary: "bg-[#25d366] hover:bg-[#1ebe57] text-white shadow-lg hover:shadow-xl",
    secondary: "bg-[#0099cc] hover:bg-[#0088bb] text-white",
    outline: "border-2 border-[#0099cc] text-[#0099cc] hover:bg-[#0099cc] hover:text-white"
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 active:translate-y-0 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string }> = ({ children, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{children}</h2>
    {subtitle && <p className="text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou seu guia virtual. Tem alguma dúvida sobre os passeios em Porto de Galinhas?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiChatResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const whatsappUrl = "https://wa.me/558181645845?text=Olá! Gostaria de saber mais sobre o pacote promocional de 3 passeios.";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full text-lg flex items-center justify-center gap-2">
            Reservar via WhatsApp
          </Button>
        </a>
      </div>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-[#0099cc] via-[#00c2a8] to-[#00d4ff] text-white pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1920&auto=format&fit=crop" alt="background" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase">
            Promoção 3 em 1
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight drop-shadow-lg">
            3 Passeios Incríveis pelo <br />
            <span className="text-yellow-300">Preço de Apenas 1</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Maragogi, Santo Aleixo e Praia dos Carneiros em um único pacote promocional. Tudo o que você precisa para a viagem perfeita.
          </p>

          <div className="inline-flex flex-col items-center glass-effect p-8 rounded-3xl text-slate-800 shadow-2xl border border-white/50">
            <span className="text-red-500 font-bold mb-2 flex items-center gap-2">
              <span className="animate-ping w-2 h-2 bg-red-500 rounded-full"></span>
              30% DE DESCONTO DISPONÍVEL
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-lg opacity-50 line-through">R$ 715,00</span>
              <span className="text-5xl font-black text-[#00a86b]">R$ 499,99</span>
            </div>
            <p className="text-sm font-semibold opacity-70 mb-6">Transporte de ida e volta, com saídas diárias, de porto de galinhas.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="text-xl py-5 px-10">
                Garantir Meu Pacote Agora
              </Button>
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full leading-[0] transform translate-y-px">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,10,100,321.39,56.44Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </header>

      {/* Tours Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Os passeios mais desejados agora acessíveis para você.">
            Explore Seus Próximos Destinos
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOURS.map((tour) => (
              <div key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group border border-slate-100 flex flex-col h-full">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold tracking-tight">{tour.title}</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-slate-600 text-sm leading-relaxed">{tour.description}</p>
                  <ul className="space-y-4 mt-6">
                    {tour.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <span className="text-[#0099cc] mt-1 font-bold text-lg leading-none">✓</span>
                        <span className="text-sm font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#eaf8f6]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 leading-tight">
              A melhor logística para <br />as suas férias
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Preço Imbatível', desc: 'Comprando o combo, você economiza mais de 30% em comparação aos passeios avulsos.' },
                { title: 'Conforto Premium', desc: 'Vans e micro-ônibus com ar-condicionado e motoristas experientes.' },
                { title: 'Flexibilidade', desc: 'Agende os passeios para os dias que melhor se encaixarem no seu roteiro.' },
                { title: 'Atendimento VIP', desc: 'Suporte via WhatsApp em tempo real para qualquer dúvida durante sua estadia.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-xl font-bold text-[#0099cc]">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1">{benefit.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#0099cc] to-[#00c2a8] rounded-3xl blur-2xl opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop" 
              alt="Turismo Porto de Galinhas" 
              className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>O Que Nossos Clientes Dizem</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="text-xl">★</span>)}
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0099cc] rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <span className="font-bold text-slate-800">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>Dúvidas Frequentes</SectionTitle>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <summary className="p-6 cursor-pointer font-bold text-slate-800 list-none flex justify-between items-center hover:bg-slate-50 transition-colors">
                  {faq.question}
                  <span className="transition-transform group-open:rotate-180 text-[#0099cc] font-bold">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#00c2a8] to-[#0099cc] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Sua aventura começa agora</h2>
          <p className="text-xl opacity-90 mb-10 font-medium">Não deixe para a última hora. Garanta os melhores horários e preços.</p>
          <div className="glass-effect text-slate-800 p-8 rounded-3xl mb-10 inline-block shadow-2xl border border-white/40">
            <p className="text-sm font-bold mb-2 uppercase tracking-widest opacity-60 text-slate-500">Pacote Exclusivo 3 por 1</p>
            <p className="text-5xl font-black text-[#00a86b] mb-4">R$ 499,99</p>
            <p className="text-sm font-bold opacity-70">Reserve com apenas um sinal pelo WhatsApp</p>
          </div>
          <br />
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button className="text-xl py-6 px-12 bg-white !text-slate-800 hover:bg-slate-100">
              Garantir Meu Pacote Agora
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h4 className="text-xl font-black mb-4 tracking-tight">Realizartravel</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Referência em receptivos e passeios turísticos no Litoral Sul. Segurança e diversão para toda a sua família.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Fale Conosco</h4>
            <p className="text-slate-400 text-sm mb-2">WhatsApp: (81) 8164-5845</p>
            <p className="text-slate-400 text-sm mb-2">Email: realizartravel@gmail.com</p>
            <p className="text-slate-400 text-sm">Porto de Galinhas, Pernambuco</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Conecte-se</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <span className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-[#0099cc] transition-all cursor-pointer shadow-lg text-xs">IG</span>
              <span className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-[#0099cc] transition-all cursor-pointer shadow-lg text-xs">FB</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-xs tracking-widest uppercase">
          © 2026 Porto de Galinhas Realizartravel. Todos os direitos reservados.
        </div>
      </footer>

      {/* AI Concierge Float Button & Modal */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 bg-[#0099cc] text-white rounded-full shadow-2xl flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform animate-bounce border-4 border-white/20"
            title="Falar com Concierge AI"
          >
            CHAT
          </button>
        ) : (
          <div className="w-[350px] md:w-[400px] h-[550px] glass-effect border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
            {/* Chat Header */}
            <div className="bg-[#0099cc] text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xs text-[#0099cc] font-black shadow-inner">RT</div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">Concierge Digital</h4>
                  <p className="text-xs opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online agora
                  </p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-red-200 text-3xl font-light">×</button>
            </div>
            
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#0099cc] text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-5 bg-white border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Olá! Como posso ajudar?"
                  className="flex-1 bg-slate-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099cc] transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="w-12 h-12 bg-[#0099cc] text-white rounded-2xl flex items-center justify-center disabled:opacity-50 shadow-md hover:bg-[#0088bb] transition-colors"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;