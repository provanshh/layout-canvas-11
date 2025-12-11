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
  Users,
  FileText,
  Newspaper,
  Zap,
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
  Users,
  FileText,
  Newspaper,
  Zap,
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
        className={`flex items-center justify-center p-1.5 rounded transition-all duration-100 hover:bg-secondary cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        title={template.label}
      >
        <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
          <Icon className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-100 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing group ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center flex-shrink-0">
        <Icon className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[11px] truncate">{template.label}</p>
      </div>
      <GripVertical className="w-3 h-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

interface ComponentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ComponentSidebar = ({ isCollapsed, onToggleCollapse }: ComponentSidebarProps) => {
  return (
    <aside className={`${isCollapsed ? 'w-[52px]' : 'w-[200px]'} bg-card border-r border-border flex flex-col h-full transition-all duration-150`}>
      <div className="p-2 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">Components</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-secondary rounded transition-colors ml-auto"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          )}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-1.5 ${isCollapsed ? 'space-y-0.5' : 'space-y-px'}`}>
        {componentTemplates.map((template) => (
          <DraggableItem key={template.type} template={template} isCollapsed={isCollapsed} />
        ))}
      </div>
    </aside>
  );
};
