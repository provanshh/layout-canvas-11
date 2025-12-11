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
}: BuilderToolbarProps) => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">LayoutBuilder</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          {blockCount} {blockCount === 1 ? 'component' : 'components'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="toolbar-button disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="toolbar-button disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={onToggleTheme}
          className="toolbar-button"
          title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <button
          onClick={onPreview}
          className="toolbar-button flex items-center gap-2 w-auto px-3"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm">Preview</span>
        </button>
        <button onClick={onExport} className="export-button flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};
