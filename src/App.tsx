import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ChevronDown, 
  FileText, 
  ClipboardCheck, 
  Smartphone, 
  Printer, 
  Globe, 
  Target, 
  Zap, 
  Lightbulb, 
  GraduationCap, 
  Gamepad2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Volume2,
  Star,
  Users,
  Headphones,
  Clock,
  Gift,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface FAQItem {
  question: string;
  answer: string;
}

interface BonusItem {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  featured?: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  oldPrice: string;
  features: string[];
  bonuses?: { title: string; oldPrice: string }[];
  featured?: boolean;
  buttonText: string;
}

// --- Data ---
const FAQ_DATA: FAQItem[] = [
  {
    question: "Como vou acessar o material após a compra?",
    answer: "Você receberá o acesso por e-mail imediatamente após a confirmação do pagamento. O material é 100% digital e pode ser acessado de qualquer dispositivo."
  },
  {
    question: "O material é realmente compatível com a BNCC?",
    answer: "Sim, todas as atividades acompanham os códigos e competências da BNCC (Base Nacional Comum Curricular), garantindo conformidade total com as diretrizes educacionais brasileiras."
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer: "Se por qualquer motivo você não ficar satisfeito(a) com o material, basta solicitar o reembolso em até 7 dias e devolvemos 100% do seu investimento. Sem perguntas, sem burocracia."
  },
  {
    question: "As atividades servem para que idade?",
    answer: "O material é versátil e pode ser utilizado com alunos do Ensino Fundamental I, Fundamental II e Ensino Médio. As atividades são adaptáveis para diferentes faixas etárias e níveis de conhecimento."
  }
];

const BONUSES: BonusItem[] = [
  {
    number: 1,
    title: "Certificado de Geografia",
    description: "Certificado digital para comprovar suas horas de estudo e aprimoramento profissional.",
    icon: <GraduationCap className="w-12 h-12" />
  },
  {
    number: 2,
    title: "Jogos Interativos de Geografia",
    description: "Jogos digitais interativos para tornar o aprendizado ainda mais divertido e envolvente.",
    icon: <Gamepad2 className="w-12 h-12" />,
    featured: true
  },
  {
    number: 3,
    title: "100 Perguntas de Geografia",
    description: "Banco com 100 perguntas para revisar e fixar o conteúdo de geografia de forma prática.",
    icon: <HelpCircle className="w-12 h-12" />
  },
  {
    number: 4,
    title: "Suporte Premium 24 horas",
    description: "Atendimento prioritário para tirar qualquer dúvida a qualquer momento.",
    icon: <Headphones className="w-12 h-12" />
  },
  {
    number: 5,
    title: "Garantia estendida de 10 dias",
    description: "Mais tempo para você testar e aprovar todo o nosso material com tranquilidade.",
    icon: <Clock className="w-12 h-12" />
  }
];

const PLANS: PricingPlan[] = [
  {
    name: "Básico",
    price: "10,00",
    oldPrice: "47",
    features: [
      "+150 Dinâmicas de Geografia",
      "Garantia de 7 dias",
      "Acesso vitalício"
    ],
    buttonText: "QUERO O PLANO BÁSICO"
  },
  {
    name: "Premium",
    price: "27,90",
    oldPrice: "197",
    features: [
      "+500 Dinâmicas Interativas de Geografia PDF",
      "Acesso imediato após a compra",
      "Compatível com BNCC",
      "Acesso Vitalício",
      "Garantia de 7 dias"
    ],
    bonuses: [
      { title: "Certificado de Geografia", oldPrice: "19,90" },
      { title: "Jogos Interativos de Geografia", oldPrice: "14,90" },
      { title: "100 Perguntas de Geografia", oldPrice: "14,90" },
      { title: "Suporte Premium 24 horas", oldPrice: "19,90" },
      { title: "Garantia estendida de 10 dias", oldPrice: "47,00" }
    ],
    featured: true,
    buttonText: "GARANTIR O PLANO PREMIUM"
  }
];

// --- Components ---
const CountdownTimer = ({ isModal = false }: { isModal?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return {
      min: String(m).padStart(2, '0'),
      sec: String(s).padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  if (isModal) {
    return (
      <div className="bg-red-600 text-white text-center py-2 flex items-center justify-center gap-2 font-black italic tracking-wide text-xs">
        <Clock className="w-3.5 h-3.5" />
        OFERTA EXPIRA EM: {time.min}:{time.sec}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 px-8 py-4 rounded-2xl">
      <div className="flex flex-col items-center">
        <span className="font-display text-4xl font-black text-gray-900 leading-none min-w-[64px]">{time.min}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">min</span>
      </div>
      <span className="text-3xl text-orange-500 font-bold">:</span>
      <div className="flex flex-col items-center">
        <span className="font-display text-4xl font-black text-gray-900 leading-none min-w-[64px]">{time.sec}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">seg</span>
      </div>
    </div>
  );
};

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBonusesExpanded, setIsBonusesExpanded] = useState(false);
  const wistiaVideoRef = useRef<any>(null);
  const [currentDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
  });

  useEffect(() => {
    // Wistia API initialization
    (window as any)._wq = (window as any)._wq || [];
    (window as any)._wq.push({
      id: '9w62yzw1p1',
      onReady: (video: any) => {
        wistiaVideoRef.current = video;
        if (!videoUnmuted) {
          video.mute();
          video.play();
        }
      }
    });
  }, []); // Run only once

  const handleUnmute = () => {
    setVideoUnmuted(true);
    if (wistiaVideoRef.current) {
      wistiaVideoRef.current.unmute();
      wistiaVideoRef.current.time(0);
      wistiaVideoRef.current.play();
    } else {
      (window as any)._wq.push({
        id: '9w62yzw1p1',
        onReady: (video: any) => {
          video.unmute();
          video.time(0);
          video.play();
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-orange-100 selection:text-orange-900">
      {/* Top Promo Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2.5 px-4 text-sm font-semibold tracking-wider relative z-[100]">
        <p>🔥 DESCONTO SÓ HOJE — {currentDate} 🔥 OFERTA LIMITADA — ACESSO IMEDIATO</p>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#fff7ed_0%,#ffffff_60%)]">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-5 max-w-4xl"
          >
            <span className="inline-block font-display font-bold text-xs px-4.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-sm text-gray-800 uppercase tracking-wider">
              ✅ Alinhado à BNCC
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-4">
              +500 Dinâmicas que Fazem Seus Alunos <span className="bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent">Amarem Geografia</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-6">
              Atividades interativas que exploram técnicas geográficas, o mundo ao redor e a realidade dos seus alunos. Pra você ser o professor que eles nunca vão esquecer.
            </p>

            <div className="w-full max-w-[320px] md:max-w-[360px] aspect-[9/16] relative rounded-3xl overflow-hidden shadow-2xl border-6 border-white bg-gray-100 group transition-all duration-500 hover:shadow-orange-500/10 hover:border-orange-200 mb-8">
              <div className="wistia_responsive_padding" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                  <div className="wistia_embed wistia_async_9w62yzw1p1 videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
                    <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                      <img src="https://fast.wistia.com/embed/medias/9w62yzw1p1/swatch" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
                    </div>
                  </div>
                </div>
              </div>
              
              {!videoUnmuted && (
                <button 
                  onClick={handleUnmute}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 text-white p-6 transition-all duration-300 group/btn"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border-2 border-white/40 group-hover/btn:bg-black/60"
                  >
                    <Volume2 className="w-12 h-12 drop-shadow-lg" />
                  </motion.div>
                  <span className="font-display font-extrabold text-xl text-center leading-tight drop-shadow-md">
                    Clique para ativar o som
                  </span>
                </button>
              )}
            </div>

            <a 
              href="#pricing" 
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-br from-green-500 to-green-600 text-white font-display font-bold text-lg rounded-full shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(34,197,94,0.4)] active:scale-95 uppercase tracking-wide"
            >
              <span>Quero Acessar Agora</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
              <ShieldCheck className="w-4 h-4" /> Compra 100% segura • Acesso imediato
            </p>
          </motion.div>
        </div>

        {/* Wave background */}
        <div className="absolute bottom-0 left-0 w-full leading-[0]">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-20 fill-white">
            <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-extrabold text-center text-gray-900 mb-16">
            O Que Você Vai <span className="bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent">Receber</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <FileText />, title: "+500 Dinâmicas Prontas em PDF", desc: "Atividades interativas de Geografia prontas para aplicar. É só abrir e usar." },
              { icon: <ClipboardCheck />, title: "100% Alinhado à BNCC", desc: "Cada atividade acompanha os códigos da Base Nacional Comum Curricular." },
              { icon: <Smartphone />, title: "Acessa em Qualquer Dispositivo", desc: "No celular, tablet ou computador. Sua biblioteca de aulas sempre com você." },
              { icon: <Printer />, title: "Pronto para Imprimir", desc: "Formatado para impressão de alta qualidade. Imprime e já leva para a sala de aula." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-5 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-orange-200 hover:shadow-md transition-colors duration-300 group"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-100 transition-colors shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-1.5">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-white border border-orange-200 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg shadow-orange-500/5 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-400 to-green-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest mb-4">
                <Check className="w-4 h-4" />
                <span>Ensino Fundamental I e II • Ensino Médio</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-4">
                Perfeito para <span className="text-orange-500">todas as idades</span>
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                Atividades cuidadosamente elaboradas para diferentes níveis de aprendizado. Ideal para professores, pais e educadores que buscam engajamento real e prático no ensino de geografia.
              </p>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 shrink-0">
              <Users className="w-12 h-12 md:w-16 md:h-16" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold text-gray-900 mb-16">
            Por Que os Professores Estão <span className="text-orange-500">Amando Essas Dinâmicas?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe />, title: "Aprendizado que Fica", desc: "Os alunos vivenciam a Geografia, e o que se vive não se esquece." },
              { icon: <Target />, title: "Turma Engajada de Verdade", desc: "Chega de brigar com o celular. As atividades capturam a atenção." },
              { icon: <Zap />, title: "Zero Complicação", desc: "Abriu, entendeu, aplicou. Funciona em qualquer sala, com qualquer turma." },
              { icon: <Lightbulb />, title: "Aulas que Impressionam", desc: "Pensamento crítico, raciocínio espacial e alunos que saem da aula diferentes." }
            ].map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="p-10 bg-white border border-orange-500/5 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-shadow duration-300 text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                  {b.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold text-gray-900 mb-4">
            5 Super <span className="text-orange-500">Bônus Exclusivos</span>
          </h2>
          <p className="text-gray-500 text-lg mb-16">Receba gratuitamente ao adquirir o Plano Premium</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BONUSES.map((bonus, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, scale: bonus.featured ? 1.05 : 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className={`relative p-10 rounded-[2rem] text-left border transition-colors duration-300 ${
                  bonus.featured 
                    ? 'border-orange-400 shadow-xl z-10' 
                    : 'border-orange-500/10 shadow-sm hover:border-orange-300'
                }`}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-display font-black text-[10px] tracking-widest uppercase mb-6 shadow-md">
                  BÔNUS {bonus.number}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-6">
                  {bonus.icon}
                </div>
                <h3 className="font-display font-extrabold text-xl text-gray-900 mb-3">{bonus.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{bonus.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-xl mx-auto p-10 rounded-[2rem] bg-white border-2 border-dashed border-orange-200 shadow-lg">
            <div className="text-lg font-bold text-gray-600 mb-3 uppercase tracking-wider">
              Total em Bônus: <span className="text-red-600 line-through font-black">R$ 97,00</span>
            </div>
            <div className="text-2xl md:text-3xl font-black text-green-700 leading-tight">
              HOJE: TUDO POR CUSTO ZERO
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-extrabold text-center text-gray-900 mb-16">
            O Que Dizem Nossos <span className="text-orange-500">Educadores</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Prof. Ana Maria", role: "Professora de Geografia", text: "As atividades são ótimas e bem estruturadas. Recomendo para todos os professores de geografia!", image: "https://i.imgur.com/s47e7uv.jpg" },
              { name: "Carlos Eduardo", role: "Pai e Educador", text: "Meu filho adora as dinâmicas, ele está aprendendo muito mais rápido. Material incrível!", image: "https://i.imgur.com/iVrapCm.jpg" },
              { name: "Juliana Santos", role: "Educadora", text: "Material excelente, me ajudou muito nas aulas de geografia. Os alunos ficam muito engajados.", image: "https://i.imgur.com/oY0QD6Z.jpg" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="p-10 bg-white rounded-[2rem] shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="flex gap-1 text-orange-400 mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-current" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed mb-8 relative">
                  <span className="absolute -top-5 -left-2 text-6xl text-orange-200 opacity-50 font-serif">"</span>
                  {t.text}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={t.image} 
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-orange-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <strong className="block text-gray-900 text-sm">{t.name}</strong>
                    <span className="text-gray-400 text-xs">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-display text-4xl font-extrabold text-center text-gray-900 mb-12">
            Escolha Seu <span className="text-orange-500">Plano</span>
          </h2>

          <div className="text-center mb-16">
            <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-4">⏰ OFERTA LIMITADA — TERMINA EM:</p>
            <CountdownTimer />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, scale: plan.featured ? 1.05 : 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative p-10 rounded-[2rem] transition-shadow duration-300 ${
                  plan.featured 
                    ? 'bg-white border-2 border-orange-500 shadow-[0_20px_50px_rgba(249,115,22,0.15)] z-10' 
                    : 'bg-gray-50/80 border border-gray-200 shadow-sm opacity-80 hover:opacity-100'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-display font-black text-[10px] px-6 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                    MAIS VENDIDO
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-4">{plan.name}</h3>
                  <div className="flex flex-col items-center gap-1">
                    {plan.featured ? (
                      <span className="text-red-500 font-black text-sm uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full mb-2 border border-red-100">
                        De R$ {plan.oldPrice} por apenas
                      </span>
                    ) : (
                      <span className="text-gray-500 font-bold line-through text-sm">R$ {plan.oldPrice}</span>
                    )}
                    <span className={`font-display font-black leading-none ${plan.featured ? 'text-green-500 text-7xl drop-shadow-sm' : 'text-gray-900 text-5xl'}`}>
                      R$ {plan.price.split(',')[0]}<small className={plan.featured ? "text-4xl" : "text-2xl"}>,{plan.price.split(',')[1]}</small>
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-3 font-medium text-sm pb-4 border-b border-gray-200 last:border-0 ${plan.featured ? 'text-gray-800' : 'text-gray-500'}`}>
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.featured ? 'text-green-500' : 'text-gray-400'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.bonuses && (
                  <div className="mb-10 mt-6 relative">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="h-px bg-orange-200 flex-1"></div>
                      <div className="flex items-center gap-2 text-orange-500 font-display font-black text-sm uppercase tracking-widest">
                        {plan.bonuses.length} BÔNUS INCLUSOS <Gift className="w-4 h-4" />
                      </div>
                      <div className="h-px bg-orange-200 flex-1"></div>
                    </div>
                    
                    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-4 space-y-3 bg-orange-50/50">
                      {plan.bonuses.map((bonus, j) => (
                        <div key={j} className="bg-white border border-orange-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                              BÔNUS {j + 1}
                            </span>
                            <span className="text-gray-400 text-xs line-through font-medium">
                              R$ {bonus.oldPrice}
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-900 text-sm font-medium leading-tight">{bonus.title}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-orange-500 text-[11px] font-black uppercase tracking-wider">
                            <Gift className="w-3.5 h-3.5" />
                            INCLUSO GRÁTIS
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {plan.featured ? (
                  <motion.a 
                    href="https://www.ggcheckout.com/checkout/v5/c14Uc67cPhxhQTguXbtV"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="block w-full py-4 bg-gradient-to-b from-[#00E676] to-[#00C853] border-b-4 border-[#009624] hover:brightness-110 text-white text-center rounded-xl font-display font-black text-sm uppercase tracking-widest transition-colors shadow-[0_8px_20px_rgba(0,200,83,0.4)]"
                  >
                    {plan.buttonText}
                  </motion.a>
                ) : (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600 rounded-xl font-display font-black text-sm uppercase tracking-widest transition-all shadow-sm"
                  >
                    {plan.buttonText}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-12 p-12 bg-gradient-to-br from-orange-50 to-green-50 rounded-[2.5rem] border border-gray-100 shadow-md"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-xl shrink-0 border-4 border-white overflow-hidden">
              <img 
                src="https://i.imgur.com/Jco8Qky.jpg" 
                alt="Elaine Fernandes" 
                className="w-full h-full object-cover scale-[1.3] translate-y-2"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2 block">Sua Professora</span>
              <h3 className="font-display text-3xl font-extrabold text-gray-900 mb-1">Elaine Fernandes</h3>
              <p className="text-green-600 font-bold mb-4">Educadora de Geografia</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Licenciada em Geografia e especialista em Ensino, com mais de 15 anos de experiência. Criadora do Método Dinâmicas Interativas de Geografia.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                {[
                  { num: "15+", label: "Anos de Experiência" },
                  { num: "2.000+", label: "Professores Formados" },
                  { num: "BNCC", label: "Compliance Total" }
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="block font-display font-black text-2xl text-orange-600">{s.num}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-center p-12 md:p-16 bg-gradient-to-br from-green-50 to-orange-50 rounded-[3rem] border-2 border-green-200 shadow-lg"
          >
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-4">Sua Compra é 100% Segura</h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              7 Dias de Garantia Incondicional. Se não ficar satisfeito(a), devolvemos 100% do seu dinheiro.
            </p>
            <a 
              href="#pricing" 
              className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-br from-green-500 to-green-600 text-white font-display font-black text-sm rounded-full shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
            >
              COMPRAR COM SEGURANÇA
            </a>
            <div className="flex justify-center gap-10 mt-12">
              {[
                { icon: "🔒", label: "Compra Segura" },
                { icon: "✅", label: "Satisfação Garantida" },
                { icon: "⭐", label: "Qualidade Premium" }
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-tight whitespace-pre-line">{b.label.split(' ').join('\n')}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-extrabold text-center text-gray-900 mb-16">
            Perguntas <span className="text-orange-500">Frequentes</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <div key={i} className={`bg-white rounded-2xl border transition-all ${activeFaq === i ? 'border-orange-300 shadow-md' : 'border-gray-200 hover:border-orange-200'}`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className={`font-bold transition-colors ${activeFaq === i ? 'text-orange-600' : 'text-gray-800 group-hover:text-orange-600'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <p className="text-gray-400 text-xs mb-2">© 2025 Dinâmicas de Geografia — Todos os direitos reservados.</p>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">Este site não é afiliado ao Facebook, Google ou qualquer entidade do governo.</p>
        </div>
      </footer>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#F8F9FA] rounded-3xl w-full max-w-[320px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Header Banner */}
              <CountdownTimer isModal={true} />

              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-10 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shadow-sm z-10"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="p-5 flex-1 overflow-y-auto">
                {/* Titles */}
                <div className="text-center mb-4">
                  <h2 className="font-display font-black italic text-3xl text-orange-500 leading-none mb-1">
                    ESPERE!
                  </h2>
                  <h3 className="font-display font-black italic text-xl text-gray-900 leading-tight">
                    NÃO COMETA ESSE ERRO!
                  </h3>
                  <div className="w-10 h-1 bg-orange-500 mx-auto mt-3 mb-3 rounded-full"></div>
                  <p className="text-gray-500 text-xs font-medium px-2">
                    Você está prestes a deixar bônus valiosos para trás por uma diferença mínima.
                  </p>
                </div>

                {/* Premium Card Preview */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-3 relative overflow-hidden">
                  <ShieldCheck className="absolute -right-6 -bottom-6 w-32 h-32 text-gray-50 opacity-50" />
                  
                  <div className="relative z-10 text-center">
                    <p className="text-gray-400 font-black tracking-widest text-[9px] uppercase mb-1.5">
                      PLANO PREMIUM
                    </p>
                    <div className="flex justify-center items-start gap-1 text-green-600 mb-1">
                      <span className="font-bold text-lg mt-1">R$</span>
                      <span className="font-display font-black text-5xl leading-none tracking-tighter">
                        15
                      </span>
                      <span className="font-bold text-xl mt-1">
                        ,90
                      </span>
                    </div>
                    <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mb-4">
                      (PAGAMENTO ÚNICO)
                    </p>

                    <div className="bg-yellow-100/80 border border-yellow-200 rounded-full py-2.5 px-3 flex items-center justify-center gap-1.5 text-yellow-700 font-black text-[10px] uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 fill-yellow-700 shrink-0" />
                      LEVE O PLANO PREMIUM POR APENAS + R$5,90!
                    </div>
                  </div>
                </div>

                {/* Accordion */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
                  <button 
                    onClick={() => setIsBonusesExpanded(!isBonusesExpanded)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
                        <Star className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                      <span className="font-black text-gray-900 text-[11px] uppercase tracking-widest text-left">
                        VER 5 BÔNUS GRÁTIS INCLUSOS
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isBonusesExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isBonusesExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-gray-100 space-y-3">
                          {BONUSES.map((bonus, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <div className="inline-block bg-orange-100 text-orange-600 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-widest mb-1.5">
                                BÔNUS {idx + 1}
                              </div>
                              <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">{bonus.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{bonus.description}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center mt-2">
                  <motion.a 
                    href="https://www.ggcheckout.com/checkout/v5/WYz3sLAQFjbOdlFtVXUt"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="block w-full py-3.5 bg-gradient-to-b from-[#00E676] to-[#00C853] border-b-4 border-[#009624] hover:brightness-110 text-white text-center rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-[0_8px_20px_rgba(0,200,83,0.4)]"
                  >
                    GARANTIR O PLANO PREMIUM
                  </motion.a>
                  
                  <a 
                    href="https://www.ggcheckout.com/checkout/v5/Zwi2wW8a7TYjz5HeEfal"
                    className="mt-4 text-[10px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors"
                  >
                    GARANTIR APENAS O BÁSICO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}