import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentBlock, BlockStyles } from '@/types/builder';
import { BlockRenderer } from './BlockRenderer';
import { ButtonEditConfig, TextEditConfig, ImageEditConfig } from './types';
import { Trash2, GripVertical, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SortableBlockProps {
  block: ComponentBlock;
  onUpdate: (id: string, content: Record<string, string>) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
  onOpenStylePanel: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onEditButton: (buttonId: string, config: ButtonEditConfig) => void;
  onEditText: (textId: string, config: TextEditConfig) => void;
  onEditImage: (imageId: string, config: ImageEditConfig) => void;
}

const getBlockStyles = (styles?: BlockStyles): React.CSSProperties => {
  if (!styles) return {};
  
  const css: React.CSSProperties = {};
  
  // Spacing
  if (styles.paddingTop) css.paddingTop = `${styles.paddingTop}px`;
  if (styles.paddingBottom) css.paddingBottom = `${styles.paddingBottom}px`;
  if (styles.marginTop) css.marginTop = `${styles.marginTop}px`;
  if (styles.marginBottom) css.marginBottom = `${styles.marginBottom}px`;
  
  // Background - use !important equivalent by setting both background and backgroundColor
  if (styles.backgroundGradient) {
    css.background = styles.backgroundGradient;
    css.backgroundColor = 'transparent';
  } else if (styles.backgroundColor) {
    css.background = styles.backgroundColor;
    css.backgroundColor = styles.backgroundColor;
  }
  
  // Background image
  if (styles.backgroundImage) {
    const bgImage = `url(${styles.backgroundImage})`;
    css.backgroundImage = bgImage;
    css.backgroundSize = 'cover';
    css.backgroundPosition = styles.backgroundPosition || 'center';
    css.backgroundRepeat = styles.backgroundRepeat || 'no-repeat';
    if (styles.backgroundOpacity && parseInt(styles.backgroundOpacity) < 100) {
      css.position = 'relative';
    }
  }
  
  // Typography
  if (styles.textColor) css.color = styles.textColor;
  if (styles.fontFamily) css.fontFamily = styles.fontFamily;
  if (styles.fontScale) {
    css.fontSize = `${parseInt(styles.fontScale)}%`;
  }
  
  return css;
};

const SortableBlock = ({ 
  block, 
  onUpdate, 
  onDelete, 
  isSelected, 
  onSelect, 
  onOpenStylePanel, 
  isDarkTheme, 
  onToggleTheme, 
  onEditButton,
  onEditText,
  onEditImage,
}: SortableBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const blockStyles = getBlockStyles(block.styles);

  return (
    <motion.section
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      data-block-id={block.id}
      data-block-type={block.type}
      className={`builder-block relative group ${isDragging ? 'z-50 opacity-70 scale-[1.02]' : ''} ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      } ${isOver ? 'ring-2 ring-cyan-500 ring-offset-1' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        onOpenStylePanel();
      }}
    >
      {/* Block Controls */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 flex flex-col gap-1 transition-opacity ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 bg-card border border-border rounded-md hover:bg-secondary transition-colors cursor-grab active:cursor-grabbing shadow-sm"
          title="Drag to reorder"
        >
          <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenStylePanel();
          }}
          className="p-1.5 bg-card border border-border rounded-md hover:bg-primary/10 hover:border-primary/50 transition-colors shadow-sm"
          title="Block Settings"
        >
          <Settings className="w-3.5 h-3.5 text-primary" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-1.5 bg-card border border-destructive/30 rounded-md hover:bg-destructive/10 hover:border-destructive transition-colors shadow-sm"
          title="Delete block"
        >
          <Trash2 className="w-3.5 h-3.5 text-destructive" />
        </button>
      </div>

      {/* Block Content with Applied Styles */}
      <div 
        className="block-content relative overflow-hidden"
        style={blockStyles}
      >
        {/* Background image overlay for opacity control */}
        {block.styles?.backgroundImage && block.styles?.backgroundOpacity && parseInt(block.styles.backgroundOpacity) < 100 && (
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `url(${block.styles.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: block.styles.backgroundPosition || 'center',
              backgroundRepeat: block.styles.backgroundRepeat || 'no-repeat',
              opacity: parseInt(block.styles.backgroundOpacity) / 100,
            }}
          />
        )}
        <div className="relative z-10 [&>div]:!bg-transparent">
          <BlockRenderer
            block={block}
            onUpdate={(content) => onUpdate(block.id, content)}
            isDarkTheme={isDarkTheme}
            onToggleTheme={onToggleTheme}
            onEditButton={onEditButton}
            onEditText={onEditText}
            onEditImage={onEditImage}
          />
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
          {block.type}
        </div>
      )}
    </motion.section>
  );
};

interface BuilderCanvasProps {
  blocks: ComponentBlock[];
  onUpdateBlock: (id: string, content: Record<string, string>) => void;
  onDeleteBlock: (id: string) => void;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onOpenStylePanel: (id: string) => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onEditButton: (buttonId: string, config: ButtonEditConfig) => void;
  onEditText: (textId: string, config: TextEditConfig) => void;
  onEditImage: (imageId: string, config: ImageEditConfig) => void;
}

export const BuilderCanvas = ({
  blocks,
  onUpdateBlock,
  onDeleteBlock,
  selectedBlockId,
  onSelectBlock,
  onOpenStylePanel,
  isDarkTheme,
  onToggleTheme,
  onEditButton,
  onEditText,
  onEditImage,
}: BuilderCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-auto bg-muted/30 p-6`}
      onClick={() => onSelectBlock(null)}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`canvas-dropzone overflow-hidden ${isDarkTheme ? 'bg-slate-900' : 'bg-white'} rounded-lg shadow-sm ${
            isOver ? 'ring-2 ring-primary ring-offset-2' : ''
          } ${blocks.length === 0 ? 'flex items-center justify-center min-h-[500px] border-2 border-dashed border-border' : ''}`}
        >
          {blocks.length === 0 ? (
            <div className="text-center p-10">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <GripVertical className="w-8 h-8 text-muted-foreground" />
                </motion.div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drop components here
              </h3>
              <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                Drag components from the sidebar to build your page
              </p>
            </div>
          ) : (
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence>
                {blocks.map((block) => (
                  <SortableBlock
                    key={block.id}
                    block={block}
                    onUpdate={onUpdateBlock}
                    onDelete={onDeleteBlock}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => onSelectBlock(block.id)}
                    onOpenStylePanel={() => onOpenStylePanel(block.id)}
                    isDarkTheme={isDarkTheme}
                    onToggleTheme={onToggleTheme}
                    onEditButton={onEditButton}
                    onEditText={onEditText}
                    onEditImage={onEditImage}
                  />
                ))}
              </AnimatePresence>
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
};
