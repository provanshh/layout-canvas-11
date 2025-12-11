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
  Menu,
  SunMoon,
  LayoutTemplate,
  Images,
  ChevronLeft,
  Video,
  Users,
  FileText,
  Newspaper,
  Zap,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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

// Unique colors for each component icon - using cyan/teal for dark mode match
const iconColors: Record<string, { bg: string; icon: string }> = {
  navbar: { bg: 'bg-cyan-500/20 dark:bg-cyan-400/20', icon: 'text-cyan-600 dark:text-cyan-400' },
  hero: { bg: 'bg-purple-500/20 dark:bg-purple-400/20', icon: 'text-purple-600 dark:text-purple-400' },
  features: { bg: 'bg-cyan-500/20 dark:bg-cyan-400/20', icon: 'text-cyan-600 dark:text-cyan-400' },
  testimonials: { bg: 'bg-orange-500/20 dark:bg-orange-400/20', icon: 'text-orange-600 dark:text-orange-400' },
  cta: { bg: 'bg-red-500/20 dark:bg-red-400/20', icon: 'text-red-600 dark:text-red-400' },
  newsletter: { bg: 'bg-cyan-500/20 dark:bg-cyan-400/20', icon: 'text-cyan-600 dark:text-cyan-400' },
  pricing: { bg: 'bg-emerald-500/20 dark:bg-emerald-400/20', icon: 'text-emerald-600 dark:text-emerald-400' },
  faq: { bg: 'bg-orange-500/20 dark:bg-orange-400/20', icon: 'text-orange-600 dark:text-orange-400' },
  footer: { bg: 'bg-slate-500/20 dark:bg-slate-400/20', icon: 'text-slate-600 dark:text-slate-400' },
  themeToggle: { bg: 'bg-cyan-500/20 dark:bg-cyan-400/20', icon: 'text-cyan-600 dark:text-cyan-400' },
  ctaBanner: { bg: 'bg-pink-500/20 dark:bg-pink-400/20', icon: 'text-pink-600 dark:text-pink-400' },
  imageGallery: { bg: 'bg-indigo-500/20 dark:bg-indigo-400/20', icon: 'text-indigo-600 dark:text-indigo-400' },
  videoEmbed: { bg: 'bg-slate-500/20 dark:bg-slate-400/20', icon: 'text-slate-600 dark:text-slate-400' },
  team: { bg: 'bg-teal-500/20 dark:bg-teal-400/20', icon: 'text-teal-600 dark:text-teal-400' },
  contact: { bg: 'bg-blue-500/20 dark:bg-blue-400/20', icon: 'text-blue-600 dark:text-blue-400' },
  blog: { bg: 'bg-lime-500/20 dark:bg-lime-400/20', icon: 'text-lime-600 dark:text-lime-400' },
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
  const colors = iconColors[template.type] || { bg: 'bg-muted', icon: 'text-muted-foreground' };

  if (isCollapsed) {
    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-100 hover:bg-secondary/50 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        title={template.label}
      >
        <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${colors.icon}`} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-100 hover:bg-secondary/50 cursor-grab active:cursor-grabbing group ${isDragging ? 'opacity-50 scale-105' : ''}`}
    >
      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">{template.label}</p>
        <p className="text-xs text-muted-foreground truncate">{template.description}</p>
      </div>
    </div>
  );
};

interface ComponentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ComponentSidebar = ({ isCollapsed, onToggleCollapse }: ComponentSidebarProps) => {
  return (
    <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[260px]'} bg-card border-r border-border flex flex-col h-full transition-all duration-200`}>
      <div className="p-3 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <span className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Components</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-secondary rounded-md transition-colors ml-auto"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <ChevronLeft className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <ScrollArea className="flex-1">
        <div className={`p-2 ${isCollapsed ? 'space-y-1' : 'space-y-1'}`}>
          {componentTemplates.map((template) => (
            <DraggableItem key={template.type} template={template} isCollapsed={isCollapsed} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};
