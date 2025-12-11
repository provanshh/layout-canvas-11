import { Eye, Download, Undo, Redo, Layers, Sun, Moon } from 'lucide-react';

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
}: BuilderToolbarProps) => {
  return (
    <header className="h-12 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
            <Layers className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-medium text-sm text-foreground">LayoutBuilder</span>
        </div>
        <div className="h-4 w-px bg-border/50" />
        <button
          onClick={onOpenLayoutOverview}
          className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          {blockCount} {blockCount === 1 ? 'component' : 'components'}
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="mac-button disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="mac-button disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Redo className="w-3.5 h-3.5" />
        </button>
        
        <div className="h-4 w-px bg-border/50 mx-1" />
        
        <button
          onClick={onToggleTheme}
          className="mac-button"
          title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDarkTheme ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
        
        <button
          onClick={onPreview}
          className="mac-button-text"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>
        <button onClick={onExport} className="mac-button-primary">
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
