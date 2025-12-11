import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectTemplates, instantiateTemplate, ProjectTemplate } from '@/data/projectTemplates';
import { ComponentBlock } from '@/types/builder';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (blocks: ComponentBlock[]) => void;
}

export const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) => {
  const handleSelect = (template: ProjectTemplate) => {
    const blocks = instantiateTemplate(template);
    onSelectTemplate(blocks);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold">Choose a Template</h2>
                <p className="text-sm text-muted-foreground">Start with a pre-built layout or blank canvas</p>
              </div>
              <button
                onClick={onClose}
                className="mac-button hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Templates Grid */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => handleSelect(template)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group p-6 bg-background border border-border rounded-lg text-left hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <div className="text-4xl mb-4">{template.thumbnail}</div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="mt-3 text-xs text-muted-foreground/70">
                      {template.blocks.length === 0 
                        ? 'Empty canvas' 
                        : `${template.blocks.length} blocks`}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
