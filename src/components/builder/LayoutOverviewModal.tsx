import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ComponentBlock } from '@/types/builder';
import { componentTemplates } from '@/data/componentTemplates';
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LayoutOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: ComponentBlock[];
  onReorder: (blocks: ComponentBlock[]) => void;
  onDelete: (id: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Menu: icons.Menu,
  SunMoon: icons.SunMoon,
  Sparkles: icons.Sparkles,
  Grid3x3: icons.Grid3x3,
  Quote: icons.Quote,
  Megaphone: icons.Megaphone,
  Mail: icons.Mail,
  CreditCard: icons.CreditCard,
  HelpCircle: icons.HelpCircle,
  LayoutTemplate: icons.LayoutTemplate,
  Images: icons.Images,
  Video: icons.Video,
};

interface SortableItemProps {
  block: ComponentBlock;
  onDelete: (id: string) => void;
}

const SortableItem = ({ block, onDelete }: SortableItemProps) => {
  const template = componentTemplates.find(t => t.type === block.type);
  const IconComponent = template ? iconMap[template.icon] : icons.Layers;
  
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
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg border border-border bg-card ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
        {IconComponent && <IconComponent className="w-4 h-4 text-primary" />}
      </div>
      
      <div className="flex-1">
        <p className="font-medium text-foreground text-sm">{template?.label || block.type}</p>
        <p className="text-xs text-muted-foreground truncate">{template?.description}</p>
      </div>
      
      <button
        onClick={() => onDelete(block.id)}
        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export const LayoutOverviewModal = ({
  isOpen,
  onClose,
  blocks,
  onReorder,
  onDelete,
}: LayoutOverviewModalProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      onReorder(newBlocks);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Layout Overview</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-2">
          {blocks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No components added yet.</p>
              <p className="text-sm mt-1">Drag components from the sidebar to get started.</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map(b => b.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {blocks.map((block) => (
                    <SortableItem
                      key={block.id}
                      block={block}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
        
        <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
          Drag items to reorder your layout
        </div>
      </DialogContent>
    </Dialog>
  );
};
