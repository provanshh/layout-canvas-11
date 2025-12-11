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

// Unique colors for each component icon
const iconColors: Record<string, string> = {
  navbar: 'text-blue-500',
  hero: 'text-purple-500',
  features: 'text-emerald-500',
  testimonials: 'text-amber-500',
  cta: 'text-rose-500',
  newsletter: 'text-cyan-500',
  pricing: 'text-green-500',
  faq: 'text-orange-500',
  footer: 'text-slate-500',
  'theme-toggle': 'text-yellow-500',
  'cta-banner': 'text-pink-500',
  'image-gallery': 'text-indigo-500',
  'video-embed': 'text-red-500',
  team: 'text-teal-500',
  contact: 'text-violet-500',
  blog: 'text-lime-500',
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
  const iconColor = iconColors[template.type] || 'text-muted-foreground';

  if (isCollapsed) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-100 hover:bg-secondary/50 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        title={template.label}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-100 hover:bg-secondary/50 cursor-grab active:cursor-grabbing group ${isDragging ? 'opacity-50' : ''}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-xs text-foreground truncate">{template.label}</p>
      </div>
      <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

interface ComponentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ComponentSidebar = ({ isCollapsed, onToggleCollapse }: ComponentSidebarProps) => {
  return (
    <aside className={`${isCollapsed ? 'w-[56px]' : 'w-[220px]'} bg-card border-r border-border flex flex-col h-full transition-all duration-150`}>
      <div className="p-2.5 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">Components</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-secondary rounded-md transition-colors ml-auto"
          title={isCollapsed ? 'Expand' : 'Collapse'}
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
