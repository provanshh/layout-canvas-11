import { Eye, Download, Undo, Redo, Layers, Sun, Moon, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuilderToolbarProps {
  onPreview: () => void;
  onExport: () => void;
  blockCount: number;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  onOpenLayoutOverview: () => void;
  onOpenTemplates: () => void;
}

export const BuilderToolbar = ({
  onPreview,
  onExport,
  blockCount,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isDarkTheme,
  onToggleTheme,
  onOpenLayoutOverview,
  onOpenTemplates
}: BuilderToolbarProps) => {
  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-foreground">Builder</span>
        </div>
        <div className="h-5 w-px bg-border" />
        <button 
          onClick={onOpenTemplates} 
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-secondary transition-colors"
        >
          <LayoutTemplate className="w-4 h-4" />
          <span>Templates</span>
        </button>
        <button 
          onClick={onOpenLayoutOverview} 
          className="text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-secondary transition-colors"
        >
          {blockCount} blocks
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={onUndo} 
          disabled={!canUndo} 
          className="p-2 rounded hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
          title="Undo"
        >
          <Undo className="w-4 h-4 text-muted-foreground" />
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo} 
          className="p-2 rounded hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
          title="Redo"
        >
          <Redo className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <div className="h-5 w-px bg-border mx-1" />
        
        <button 
          onClick={onToggleTheme} 
          className="p-2 rounded hover:bg-secondary transition-colors" 
          title={isDarkTheme ? 'Light mode' : 'Dark mode'}
        >
          {isDarkTheme ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
        </button>
        
        <button 
          onClick={onPreview} 
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded hover:bg-secondary transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
        
        <Button 
          onClick={onExport} 
          size="sm"
          className="flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>
    </header>
  );
};
