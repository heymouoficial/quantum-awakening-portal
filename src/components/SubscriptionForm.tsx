
import { useState } from 'react';
import { toast } from 'sonner';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with your actual submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('¡Bienvenido a la revolución cuántica! 🌌');
      setEmail('');
      console.log('Email submitted:', email);
    } catch (error) {
      toast.error('Hubo un error. Inténtalo nuevamente.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quantum-glow focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-quantum-glow text-quantum-dark font-semibold rounded-lg hover:bg-quantum-glow/90 focus:outline-none focus:ring-2 focus:ring-quantum-glow focus:ring-offset-2 focus:ring-offset-quantum-dark transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:transform-none relative overflow-hidden"
      >
        <span className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
          Quiero ser parte
        </span>
        
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-quantum-dark border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-quantum-glow via-white to-quantum-glow opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
      </button>
    </form>
  );
};

export default SubscriptionForm;
