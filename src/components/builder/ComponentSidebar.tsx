import { useDraggable } from '@dnd-kit/core';
import { componentTemplates } from '@/data/componentTemplates';
import { ComponentTemplate } from '@/types/builder';
import { 
  Sparkles, 
  Grid3x3, 
  Quote, 
  Megaphone, 
  Mail, 
  CreditCard, 
  HelpCircle,
  GripVertical,
  Menu,
  SunMoon,
  LayoutTemplate,
  Images,
  ChevronLeft,
  ChevronRight,
  Video,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Grid3x3,
  Quote,
  Megaphone,
  Mail,
  CreditCard,
  HelpCircle,
  Menu,
  SunMoon,
  LayoutTemplate,
  Images,
  Video,
};

interface DraggableItemProps {
  template: ComponentTemplate;
  isCollapsed: boolean;
}

const DraggableItem = ({ template, isCollapsed }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${template.type}`,
    data: { template },
  });

  const Icon = iconMap[template.icon] || Sparkles;

  if (isCollapsed) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-secondary cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        title={template.label}
      >
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`sidebar-item group ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{template.label}</p>
        <p className="text-xs text-muted-foreground truncate">{template.description}</p>
      </div>
      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

interface ComponentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ComponentSidebar = ({ isCollapsed, onToggleCollapse }: ComponentSidebarProps) => {
  return (
    <aside className={`${isCollapsed ? 'w-[80px]' : 'w-[280px]'} bg-sidebar border-r border-sidebar-border flex flex-col h-full transition-all duration-300`}>
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="font-semibold text-lg text-foreground">Components</h2>
            <p className="text-xs text-muted-foreground mt-1">Drag to add to canvas</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 hover:bg-secondary rounded-lg transition-colors ml-auto"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-3 ${isCollapsed ? 'space-y-2' : 'space-y-1'}`}>
        {componentTemplates.map((template) => (
          <DraggableItem key={template.type} template={template} isCollapsed={isCollapsed} />
        ))}
      </div>
    </aside>
  );
};
