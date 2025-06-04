import { useState, useEffect } from 'react';
import QuantumWaveField from '../components/QuantumWaveField';
import SubscriptionForm from '../components/SubscriptionForm';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-quantum-dark relative overflow-hidden font-sora">
      {/* Quantum Wave Field Background */}
      <QuantumWaveField />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 text-center">
        
        {/* Main Title with subtle iridescent effect */}
        <div className={`transform transition-all duration-2000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent animate-subtle-shift">
            <span className="block">BIO HACKING</span>
            <span className="block">CUÁNTICO</span>
          </h1>
        </div>

        {/* Subtitle with typing effect */}
        <div className={`transform transition-all duration-1500 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl leading-relaxed font-light">
            <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-quantum-glow animate-typing">
              Despierta tu potencial. Sintoniza con tu frecuencia. Rediseña tu biología.
            </span>
          </p>
        </div>

        {/* Subscription Form */}
        <div className={`transform transition-all duration-1500 delay-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <SubscriptionForm />
        </div>

        {/* Footer Text */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 delay-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl px-4 leading-relaxed">
            Estamos co-creando la nueva frontera del ser humano. 
            <br className="hidden md:block" />
            Regístrate para recibir el primer pulso.
          </p>
        </div>

        {/* Floating Elements - Reduced and more subtle */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-quantum-glow/40 rounded-full animate-float opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-quantum-violet/40 rounded-full animate-float opacity-25" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-quantum-cyan/40 rounded-full animate-float opacity-35" style={{animationDelay: '4s'}}></div>
      </div>
    </div>
  );
};

export default Index;
