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
        className={`flex items-center justify-center p-2 rounded-md transition-all duration-150 hover:bg-muted/60 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        title={template.label}
      >
        <div className="w-8 h-8 rounded-md bg-muted/40 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary/80" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-all duration-150 hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing group ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="w-8 h-8 rounded-md bg-muted/40 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary/80" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-xs truncate">{template.label}</p>
        <p className="text-[10px] text-muted-foreground truncate leading-tight">{template.description}</p>
      </div>
      <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

interface ComponentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ComponentSidebar = ({ isCollapsed, onToggleCollapse }: ComponentSidebarProps) => {
  return (
    <aside className={`${isCollapsed ? 'w-[64px]' : 'w-[240px]'} bg-sidebar/50 backdrop-blur-sm border-r border-sidebar-border/50 flex flex-col h-full transition-all duration-200`}>
      <div className="p-3 border-b border-sidebar-border/50 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="font-medium text-sm text-foreground">Components</h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Drag to add</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-muted/50 rounded-md transition-colors ml-auto"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto p-2 ${isCollapsed ? 'space-y-1' : 'space-y-0.5'}`}>
        {componentTemplates.map((template) => (
          <DraggableItem key={template.type} template={template} isCollapsed={isCollapsed} />
        ))}
      </div>
    </aside>
  );
};
