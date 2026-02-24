import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, Utensils, Activity, Menu, X, Send, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Actividad {
  id: string;
  icon: string;
  title: string;
  mes: string;
  desc: string;
}

interface Componente {
  icon: React.ReactElement;  // ← Cambia JSX.Element por React.ReactElement
  title: string;
  desc: string;
}

interface Aliado {
  nombre: string;
  tipo: string;
  logo: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

interface Fase {
  mes: number;
  title: string;
  color: string;
}

// Hook para animación de contador
const useCounterAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, counterRef };
};

const ProyectoSocialWeb: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [currentPartner, setCurrentPartner] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  const counter1 = useCounterAnimation(700);
  const counter2 = useCounterAnimation(10);
  const counter3 = useCounterAnimation(9);
  const counter4 = useCounterAnimation(12);

  const [expandedQuarter, setExpandedQuarter] = useState<number | null>(null);

  const actividades: Actividad[] = [
    { id: 'fisica', icon: '🏃‍♀️', title: 'Actividad Física Comunitaria', mes: 'Todo el año', desc: 'Aeróbicos, bailoterapia, caminatas y juegos recreativos para niños y familias en cada jornada mensual' },
    { id: 'nutricion', icon: '🥗', title: 'Talleres de Nutrición Saludable', mes: 'Todo el año', desc: 'Charlas prácticas sobre alimentación balanceada y economía en la cocina, con degustación de recetas fáciles' },
    { id: 'emocional', icon: '💬', title: 'Apoyo Emocional y Motivacional', mes: 'Todo el año', desc: 'Espacios de diálogo para fortalecer la autoestima y la salud mental de los participantes' },
    { id: 'festival', icon: '🎉', title: 'Festivales Comunitarios', mes: 'Febrero - Octubre', desc: 'Eventos familiares integradores con música, deporte, dinámicas de unión y espacios de emprendimientos de la comunidad' }
  ];

  const componentes: Componente[] = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Actividad Física',
      desc: 'Jornadas comunitarias orientadas a fomentar un estilo de vida activo y prevenir enfermedades. Estos espacios mejoran la salud física y fortalecen la cohesión social.'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Educación Nutricional',
      desc: 'Talleres prácticos dirigidos por nutricionistas y chefs, enseñando a las familias a preparar comidas nutritivas, equilibradas y asequibles con productos locales y de bajo costo.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Bienestar Emocional',
      desc: 'Actividades grupales enfocadas en fortalecer la resiliencia emocional de los participantes, creando redes de apoyo comunitario.'
    }
  ];

  const aliados: Aliado[] = [
    { nombre: 'Pronaca', tipo: 'Talleres de nutrición', logo: 'https://prezigram-assets.prezicdn.net/f446ba128bc398d17b05b0c96886daafc4af221511601995404480457babdc6458d05933ee955cbd7596d49fbff1ced7b88618d7bf9f767d4cdb2ebca0ae6754' },
    { nombre: 'PUCE', tipo: 'Voluntariado estudiantil', logo: 'https://i.ytimg.com/vi/GYqoIPXwX1M/maxresdefault.jpg' },
    { nombre: 'UDLA', tipo: 'Voluntariado estudiantil', logo: 'https://fback.com.ec/wp1/wp-content/uploads/2014/03/udla1.png' },
    { nombre: 'USFQ', tipo: 'Voluntariado estudiantil', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJL_7c2AkqQqGEE7ebOQbIhD-F5clgi_ZafQ&s' },
    { nombre: 'Hospital Metropolitano', tipo: 'Apoyo médico', logo: 'https://www.hospitalmetropolitano.org/img/public/logo-big.svg' },
    { nombre: 'Escuela de los Chefs', tipo: 'Talleres culinarios', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mBNHH_reg6wgEt7NKSeG2yFVkXTBS39x1g&s' },
    { nombre: 'Cruz Roja', tipo: 'Apoyo técnico', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cruz_Roja_Ecuatoriana_%28logo%29.svg/2560px-Cruz_Roja_Ecuatoriana_%28logo%29.svg.png' },
    { nombre: 'CARE', tipo: 'Apoyo técnico', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4aHESXVtbi605ru7YsAXMhjrjCUJIj8qEFg&s' },
    { nombre: 'Supermaxi', tipo: 'Donaciones', logo: 'https://www.supermaxi.com/wp-content/themes/supermaxi-2019/assets/logo-super.png' },
    { nombre: 'Tesalia', tipo: 'Donaciones', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/7b9f5e180920689.Y3JvcCwzMTc4LDI0ODYsMTczLDA.png' },
    { nombre: 'SmartFit', tipo: 'Actividad Física', logo: 'https://logodownload.org/wp-content/uploads/2020/03/smart-fit-logo-0.png' },
    { nombre: 'Mercado Mayorista', tipo: 'Donaciones', logo: 'https://mercadomayorista.quito.gob.ec/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-02-at-8.29.51-PM.jpeg' },
    { nombre: 'Municipio del Distrito Metropolitano de Quito', tipo: 'Espacios Públicos', logo: 'https://pam.quito.gob.ec/MDMQ_PORTAL_LUAE_WEB/Imagen/imgLogoAlcaldia.png' }
  ];

  const trimestres = [
    {
      id: 1,
      nombre: 'Fase 1: Norte',
      descripcion: 'Febrero - Marzo',
      color: 'bg-blue-600',
      colorClaro: 'bg-blue-50',
      colorTexto: 'text-blue-700',
      borderColor: 'border-blue-600',
      hoverColor: 'hover:bg-blue-100',
      meses: [
        { mes: 1, title: 'Calderón', color: 'bg-orange-100 text-orange-700' },
        { mes: 2, title: 'Cotocollao', color: 'bg-blue-100 text-blue-700' }
      ]
    },
    {
      id: 2,
      nombre: 'Fase 2: Centro',
      descripcion: 'Abril - Mayo',
      color: 'bg-emerald-600',
      colorClaro: 'bg-emerald-50',
      colorTexto: 'text-emerald-700',
      borderColor: 'border-emerald-600',
      hoverColor: 'hover:bg-emerald-100',
      meses: [
        { mes: 3, title: 'San Francisco', color: 'bg-blue-100 text-blue-700' },
        { mes: 4, title: 'La Libertad', color: 'bg-blue-100 text-blue-700' }
      ]
    },
    {
      id: 3,
      nombre: 'Fase 3: Sur',
      descripcion: 'Junio - Agosto',
      color: 'bg-teal-600',
      colorClaro: 'bg-teal-50',
      colorTexto: 'text-teal-700',
      borderColor: 'border-teal-600',
      hoverColor: 'hover:bg-teal-100',
      meses: [
        { mes: 5, title: 'Chillogallo', color: 'bg-green-100 text-green-700' },
        { mes: 6, title: 'Guamaní', color: 'bg-green-100 text-green-700' },
        { mes: 7, title: 'La Argelia', color: 'bg-green-100 text-green-700' }
      ]
    },
    {
      id: 4,
      nombre: 'Fase 4: Rural',
      descripcion: 'Septiembre - Octubre',
      color: 'bg-amber-600',
      colorClaro: 'bg-amber-50',
      colorTexto: 'text-amber-700',
      borderColor: 'border-amber-600',
      hoverColor: 'hover:bg-amber-100',
      meses: [
        { mes: 8, title: 'Conocoto', color: 'bg-yellow-100 text-yellow-700' },
        { mes: 9, title: 'Festival de Cierre: Tumbaco y Pifo', color: 'bg-pink-100 text-pink-700' }
      ]
    }
  ];

  // Detectar tamaño de pantalla para ajustar items por página
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); // md: 2 items
      } else {
        setItemsPerPage(1); // mobile: 1 item
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calcular número total de páginas
  const totalPages = Math.ceil(aliados.length / itemsPerPage);

  // Resetear página actual si excede el total después de cambios
  useEffect(() => {
    if (currentPartner >= totalPages) {
      setCurrentPartner(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPartner]);

  // Auto-play del carrusel de aliados
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => {
        if (prev >= totalPages - 1) {
          return 0; // Volver al inicio
        }
        return prev + 1;
      });
    }, 8000); // 8 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [totalPages]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src="/logo_1.png" alt="Corazones en Acción" className="w-17 h-14" />
              {/* <span className="text-xl font-bold text-gray-800">Corazones en Acción</span> */}
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-emerald-600 transition">Inicio</a>
              <a href="#proyecto" className="text-gray-700 hover:text-emerald-600 transition">Proyecto</a>
              <a href="#actividades" className="text-gray-700 hover:text-emerald-600 transition">Actividades</a>
              <a href="#cronograma" className="text-gray-700 hover:text-emerald-600 transition">Cronograma</a>
              <a href="#aliados" className="text-gray-700 hover:text-emerald-600 transition">Aliados</a>
              <a href="#contacto" className="text-gray-700 hover:text-emerald-600 transition">Contacto</a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#inicio" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
              <a href="#proyecto" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Proyecto</a>
              <a href="#actividades" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Actividades</a>
              <a href="#cronograma" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Cronograma</a>
              <a href="#aliados" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Aliados</a>
              <a href="#contacto" className="block text-gray-700 hover:text-emerald-600" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 px-4 sm:px-0">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transformando Comunidades a través del
                <span className="text-emerald-600"> Bienestar Integral</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fomentamos un estilo de vida saludable mediante jornadas recreativas familiares en 10 GAD parroquiales de Quito, combinando actividad física, talleres de nutrición y apoyo emocional para fortalecer el cuerpo, el espíritu y la economía comunitaria.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg">
                  Únete al Proyecto
                </button>
                <a href="#proyecto">
                  <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition">
                    Conoce Más
                  </button>
                </a>
              </div>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800" 
                alt="Comunidad unida"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div ref={counter1.counterRef}>
              <div className="text-4xl font-bold mb-2">{counter1.count}+</div>
              <div className="text-emerald-100">Familias Beneficiadas</div>
            </div>
            <div ref={counter2.counterRef}>
              <div className="text-4xl font-bold mb-2">{counter2.count}</div>
              <div className="text-emerald-100">GAD Parroquiales</div>
            </div>
            <div ref={counter3.counterRef}>
              <div className="text-4xl font-bold mb-2">{counter3.count}</div>
              <div className="text-emerald-100">Meses de Duración</div>
            </div>
            <div ref={counter4.counterRef}>
              <div className="text-4xl font-bold mb-2">{counter4.count}+</div>
              <div className="text-emerald-100">Aliados Estratégicos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre el Proyecto */}
      <section id="proyecto" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Proyecto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generamos espacios comunitarios inclusivos que fortalecen los lazos familiares y vecinales, promoviendo hábitos de vida saludables que contribuyan a la prevención de enfermedades y al bienestar integral de la población.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {componentes.map((comp, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                  {comp.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{comp.title}</h3>
                <p className="text-gray-600 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">¿A Quién Ayudamos?</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <Users className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <span>Hombres, mujeres, niños (6-12 años), adolescentes (13-17 años) y adultos (18-40+)</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <span>Familias de sectores urbanos y rurales en situación de vulnerabilidad</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <span>Comunidades con limitado acceso a programas de salud preventiva y recreación en 10 GAD parroquiales de Quito</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 bg-white/10 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800" 
                  alt="Comunidad diversa"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actividades Section */}
      <section id="actividades" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestras Actividades</h2>
            <p className="text-xl text-gray-600">Programas diseñados para crear impacto real y sostenible</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividades.map((act) => (
              <div 
                key={act.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{act.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{act.title}</h3>
                <div className="text-sm text-emerald-600 font-semibold mb-3">Mes {act.mes}</div>
                <p className="text-gray-600">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué este tema */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por Qué Este Proyecto?</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                A nivel personal, comprendí que la salud física y emocional son el pilar del bienestar integral. Hace algunos años enfrenté un momento difícil que me hizo reflexionar sobre la importancia de cuidar mi cuerpo y mi mente. Al incorporar la actividad física y mejorar mis hábitos alimenticios, experimenté un cambio profundo, no solo en mi bienestar, sino también en la manera en que podía inspirar a quienes me rodean.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sin embargo, también reconozco que en mi propia comunidad no existían espacios que fomentaran este tipo de iniciativas de salud comunitaria. Crecí sintiendo esa ausencia, y muchas veces me hubiera gustado tener cerca un lugar donde pudiera encontrar orientación, motivación y acompañamiento para cuidar de mi cuerpo y mi mente.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Esa motivación me llevó a seguir una de mis pasiones desde niña: la gastronomía, pero con un enfoque en la alimentación saludable. Descubrí que la cocina no es solo un arte, sino también una herramienta de nutrición, prevención y cuidado para quienes más queremos.
              </p>
              <p className="text-emerald-700 font-semibold text-lg leading-relaxed">
                Hoy, <strong>Corazones en Acción</strong> busca ser ese puente que permita a muchas familias de Quito encontrar un equilibrio entre cuerpo, mente y espíritu, fomentando comunidades más sanas, activas y unidas. Mi objetivo es multiplicar estos espacios de esperanza, donde el movimiento, la nutrición y el bienestar se conviertan en herramientas para transformar vidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cronograma Visual */}
      <section id="cronograma" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cronograma del Proyecto</h2>
            <p className="text-xl text-gray-600">9 meses de transformación comunitaria en 10 GAD parroquiales</p>
            <p className="text-sm text-gray-500 mt-2">Haz clic en cada fase para ver las parroquias</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trimestres.map((trimestre) => (
              <div key={trimestre.id} className="relative">
                {/* Carta del Trimestre */}
                <div
                  onClick={() => setExpandedQuarter(expandedQuarter === trimestre.id ? null : trimestre.id)}
                  className={`${trimestre.colorClaro} border-2 ${trimestre.borderColor} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${trimestre.color} text-white px-4 py-2 rounded-lg font-bold text-lg`}>
                      {trimestre.nombre}
                    </div>
                    {expandedQuarter === trimestre.id ? (
                      <ChevronUp className={`w-6 h-6 ${trimestre.colorTexto}`} />
                    ) : (
                      <ChevronDown className={`w-6 h-6 ${trimestre.colorTexto}`} />
                    )}
                  </div>
                  <p className={`text-sm font-semibold ${trimestre.colorTexto}`}>{trimestre.descripcion}</p>
                  <div className="mt-2 text-xs text-gray-600">
                    Meses {trimestre.meses[0].mes}-{trimestre.meses[trimestre.meses.length - 1].mes}
                  </div>
                </div>

                {/* Detalle de Meses (Expandible) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedQuarter === trimestre.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-3">
                    {trimestre.meses.map((mes) => (
                      <div
                        key={mes.mes}
                        className={`${mes.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg">Mes {mes.mes}</div>
                            <div className="text-sm">{mes.title}</div>
                          </div>
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-lg">
                            {mes.mes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Aliados Section */}
      <section id="aliados" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Aliados</h2>
            <p className="text-xl text-gray-600">Trabajamos con organizaciones comprometidas con el cambio social</p>
          </div>

          {/* Carrusel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentPartner * 100}%)` }}>
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="min-w-full flex gap-6 px-1">
                    {aliados
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((aliado, idx) => (
                        <div key={idx} className="flex-1 min-w-0">
                          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 h-64 flex flex-col items-center justify-center text-center">
                            {/* Logo de la marca */}
                            <div className="w-full h-32 mb-4 flex items-center justify-center">
                              <img
                                src={aliado.logo}
                                alt={aliado.nombre}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{aliado.nombre}</h3>
                            <p className="text-sm text-emerald-600 font-medium">{aliado.tipo}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de navegación */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={() => setCurrentPartner(prev => Math.max(0, prev - 1))}
                  disabled={currentPartner === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6 text-emerald-600" />
                </button>
                <button
                  onClick={() => setCurrentPartner(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPartner === totalPages - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6 text-emerald-600" />
                </button>
              </>
            )}

            {/* Indicadores */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPartner(idx)}
                    className={`w-2 h-2 rounded-full transition ${
                      idx === currentPartner ? 'bg-emerald-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sé Parte del Cambio
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete para reducir el sedentarismo, fomentar la unión familiar mediante la recreación y el deporte, y fortalecer el rol de los GADs parroquiales como aliados en el bienestar ciudadano
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacto">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                Ser Voluntario
              </button>
            </a>
            <a href="#contacto">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition">
                Donar
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
            <p className="text-xl text-gray-600">¿Quieres participar o conocer más? Escríbenos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nombre completo"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
                <input 
                  type="email" 
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>
              <input 
                type="tel" 
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
              <textarea
                placeholder="¿Cómo te gustaría participar?"
                rows={4}
                value={formData.mensaje}
                onChange={(e) => handleInputChange('mensaje', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo_2.png" alt="Corazones en Acción" className="w-17 h-14" />
              </div>
              <p className="text-gray-400">
                Transformando vidas a través del bienestar integral en el Distrito Metropolitano de Quito
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#proyecto" className="hover:text-emerald-400 transition">Sobre el Proyecto</a></li>
                <li><a href="#actividades" className="hover:text-emerald-400 transition">Actividades</a></li>
                <li><a href="#cronograma" className="hover:text-emerald-400 transition">Cronograma</a></li>
                <li><a href="#aliados" className="hover:text-emerald-400 transition">Aliados</a></li>
                <li><a href="#contacto" className="hover:text-emerald-400 transition">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Quito, Ecuador</li>
                <li>nikiguado@gmail.com</li>
                <li>+593 98-031-2205</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Proyecto Corazones en Acción. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProyectoSocialWeb;