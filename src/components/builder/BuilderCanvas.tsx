import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentBlock } from '@/types/builder';
import { BlockRenderer } from './BlockRenderer';
import { ButtonEditConfig, TextEditConfig, ImageEditConfig } from './types';
import { Trash2, GripVertical, Paintbrush, ArrowUpDown } from 'lucide-react';
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
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`component-block relative group ${isDragging ? 'z-50 opacity-80' : ''} ${
        isSelected ? 'component-block-selected' : ''
      }`}
      onClick={onSelect}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5">
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 bg-secondary rounded hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenStylePanel();
          }}
          className="p-1.5 bg-secondary rounded hover:bg-primary/20 transition-colors"
          title="Style"
        >
          <Paintbrush className="w-3 h-3 text-primary" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-1.5 bg-destructive/10 rounded hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-3 h-3 text-destructive" />
        </button>
      </div>
      <BlockRenderer
        block={block}
        onUpdate={(content) => onUpdate(block.id, content)}
        isDarkTheme={isDarkTheme}
        onToggleTheme={onToggleTheme}
        onEditButton={onEditButton}
        onEditText={onEditText}
        onEditImage={onEditImage}
      />
    </motion.div>
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
      className={`flex-1 overflow-auto bg-muted/20 p-6`}
      onClick={() => onSelectBlock(null)}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`canvas-dropzone overflow-hidden ${isDarkTheme ? 'bg-slate-900' : 'bg-canvas'} ${
            isOver ? 'canvas-dropzone-active' : ''
          } ${blocks.length === 0 ? 'flex items-center justify-center min-h-[400px]' : 'border-0'}`}
        >
          {blocks.length === 0 ? (
            <div className="text-center p-10">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowUpDown className="w-6 h-6 text-muted-foreground" />
                </motion.div>
              </div>
              <h3 className="text-base font-medium text-foreground mb-1.5">
                Drop components here
              </h3>
              <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                Drag from the sidebar or choose a template to start
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