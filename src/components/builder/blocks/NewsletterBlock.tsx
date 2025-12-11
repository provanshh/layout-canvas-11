import { useState, useRef } from 'react';
import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';
import { Input } from '@/components/ui/input';
import { Mail, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export const NewsletterBlock = ({ 
  block, 
  onUpdate, 
  isPreview,
  onEditButton,
  onEditText 
}: BaseBlockProps) => {
  const { content } = block;
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const triggerConfetti = () => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#22c55e', '#16a34a', '#86efac', '#4ade80', '#a7f3d0'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitted) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    triggerConfetti();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
  };

  return (
    <div className="py-16 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <EditableText
          as="h2"
          value={content.title}
          onChange={(val) => updateField('title', val)}
          className="text-3xl font-bold mb-4"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-title`}
        />
        <EditableText
          as="p"
          value={content.subtitle}
          onChange={(val) => updateField('subtitle', val)}
          className="text-muted-foreground mb-8 block"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-subtitle`}
        />
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={content.placeholder}
            className="flex-1"
            disabled={!isPreview || isSubmitted}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {isPreview ? (
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.button
                  key="success"
                  ref={buttonRef}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  type="button"
                  onClick={handleReset}
                  className="whitespace-nowrap px-6 py-2 rounded-md font-medium bg-green-500 text-white flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Subscribed!
                </motion.button>
              ) : (
                <motion.button
                  key="subscribe"
                  ref={buttonRef}
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="whitespace-nowrap px-6 py-2 rounded-md font-medium transition-all disabled:opacity-70"
                  style={{
                    backgroundColor: content.buttonColor || '#0891b2',
                    color: content.buttonTextColor || '#ffffff',
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    content.buttonText || 'Subscribe'
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          ) : (
            <EditableButton
              text={content.buttonText || 'Subscribe'}
              bgColor={content.buttonColor || '#0891b2'}
              textColor={content.buttonTextColor || '#ffffff'}
              link={content.buttonLink || '#'}
              className="whitespace-nowrap px-6 py-2 rounded-md font-medium"
              isPreview={isPreview}
              onEditButton={onEditButton}
              buttonId={`${block.id}-cta-btn`}
              onTextChange={(v) => updateField('buttonText', v)}
              onBgColorChange={(v) => updateField('buttonColor', v)}
              onTextColorChange={(v) => updateField('buttonTextColor', v)}
              onLinkChange={(v) => updateField('buttonLink', v)}
            />
          )}
        </form>
        
        <EditableText
          as="p"
          value={content.disclaimer}
          onChange={(val) => updateField('disclaimer', val)}
          className="text-xs text-muted-foreground mt-4"
          isPreview={isPreview}
          onEditText={onEditText}
          textId={`${block.id}-disclaimer`}
        />
      </div>
    </div>
  );
};
