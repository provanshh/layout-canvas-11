import { ComponentBlock } from '@/types/builder';
import { BlockRenderer } from './BlockRenderer';
import { X, Smartphone, Monitor, Tablet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: ComponentBlock[];
  isDarkTheme?: boolean;
}

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

const viewportSizes: Record<ViewportSize, string> = {
  mobile: 'w-[375px]',
  tablet: 'w-[768px]',
  desktop: 'w-full max-w-[1200px]',
};

export const PreviewModal = ({ isOpen, onClose, blocks, isDarkTheme = false }: PreviewModalProps) => {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-6">
                <h2 className="text-lg font-semibold">Live Preview</h2>
                <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setViewport('mobile')}
                    className={`toolbar-button ${viewport === 'mobile' ? 'toolbar-button-active' : ''}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewport('tablet')}
                    className={`toolbar-button ${viewport === 'tablet' ? 'toolbar-button-active' : ''}`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewport('desktop')}
                    className={`toolbar-button ${viewport === 'desktop' ? 'toolbar-button-active' : ''}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="toolbar-button hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-auto p-8 flex justify-center">
              <motion.div
                layout
                className={`${viewportSizes[viewport]} ${isDarkTheme ? 'bg-slate-900' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden transition-all duration-300`}
              >
                {blocks.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    No components added yet
                  </div>
                ) : (
                  blocks.map((block) => (
                    <BlockRenderer
                      key={block.id}
                      block={block}
                      onUpdate={() => {}}
                      isPreview
                      isDarkTheme={isDarkTheme}
                    />
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
