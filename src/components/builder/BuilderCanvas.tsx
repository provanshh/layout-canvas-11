import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentBlock } from '@/types/builder';
import { BlockRenderer } from './BlockRenderer';
import { Trash2, GripVertical, Paintbrush } from 'lucide-react';
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
}

const SortableBlock = ({ block, onUpdate, onDelete, isSelected, onSelect, onOpenStylePanel, isDarkTheme, onToggleTheme }: SortableBlockProps) => {
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
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-secondary rounded-lg hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenStylePanel();
          }}
          className="p-2 bg-secondary rounded-lg hover:bg-primary/20 transition-colors"
          title="Style this block"
        >
          <Paintbrush className="w-4 h-4 text-primary" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-2 bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
      <BlockRenderer
        block={block}
        onUpdate={(content) => onUpdate(block.id, content)}
        isDarkTheme={isDarkTheme}
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
}: BuilderCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 overflow-auto bg-muted/30 p-8`}
      onClick={() => onSelectBlock(null)}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`canvas-dropzone overflow-hidden ${isDarkTheme ? 'bg-slate-900' : 'bg-canvas'} ${
            isOver ? 'canvas-dropzone-active' : ''
          } ${blocks.length === 0 ? 'flex items-center justify-center' : 'border-0'}`}
        >
          {blocks.length === 0 ? (
            <div className="text-center p-12">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Start Building
              </h3>
              <p className="text-slate-500 max-w-sm">
                Drag components from the sidebar and drop them here to start creating your page.
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
