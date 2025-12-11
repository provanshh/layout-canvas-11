import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
  isDarkTheme?: boolean;
  onToggleTheme?: () => void;
}

export const ThemeToggleBlock = ({ block, onUpdate, isPreview, isDarkTheme = false, onToggleTheme }: ThemeToggleBlockProps) => {
  const { content } = block;

  const handleUpdateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const handleToggle = () => {
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  return (
    <div className={`px-6 py-3 flex items-center justify-between transition-colors ${isDarkTheme ? 'bg-slate-800' : 'bg-slate-100'}`}>
      <EditableText
        value={content.label || 'Toggle Theme'}
        onChange={(val) => handleUpdateField('label', val)}
        className={`text-sm ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}
        isPreview={isPreview}
      />
      <button
        onClick={handleToggle}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          isDarkTheme ? 'bg-slate-700' : 'bg-cyan-500'
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
            isDarkTheme ? 'translate-x-7' : 'translate-x-1'
          }`}
        >
          {isDarkTheme ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-cyan-500" />
          )}
        </div>
      </button>
    </div>
  );
};
