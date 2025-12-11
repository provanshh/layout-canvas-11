import { Eye, Download, Undo, Redo, Layers, Sun, Moon, LayoutTemplate } from 'lucide-react';

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
  onOpenTemplates,
}: BuilderToolbarProps) => {
  return (
    <header className="h-10 bg-card/95 backdrop-blur-md border-b border-border flex items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <Layers className="w-2.5 h-2.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-[13px] text-foreground">Builder</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <button
          onClick={onOpenTemplates}
          className="mac-button-text"
        >
          <LayoutTemplate className="w-3 h-3" />
          <span>Templates</span>
        </button>
        <button
          onClick={onOpenLayoutOverview}
          className="text-[11px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-secondary transition-colors"
        >
          {blockCount} blocks
        </button>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="mac-button disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo className="w-3 h-3" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="mac-button disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo className="w-3 h-3" />
        </button>
        
        <div className="h-3 w-px bg-border mx-0.5" />
        
        <button
          onClick={onToggleTheme}
          className="mac-button"
          title={isDarkTheme ? 'Light mode' : 'Dark mode'}
        >
          {isDarkTheme ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
        </button>
        
        <button
          onClick={onPreview}
          className="mac-button-text"
        >
          <Eye className="w-3 h-3" />
          <span>Preview</span>
        </button>
        <button onClick={onExport} className="mac-button-primary">
          <Download className="w-3 h-3" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
