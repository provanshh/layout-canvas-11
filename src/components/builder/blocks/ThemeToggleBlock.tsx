import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ThemeToggleBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const ThemeToggleBlock = ({ block, onUpdate, isPreview }: ThemeToggleBlockProps) => {
  const { content } = block;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('website-theme');
    setIsDark(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('website-theme', newTheme ? 'dark' : 'light');

    // Apply theme to the preview content
    const previewContainer = document.querySelector('.preview-theme-container');
    if (previewContainer) {
      previewContainer.classList.toggle('dark-theme', newTheme);
      previewContainer.classList.toggle('light-theme', !newTheme);
    }
  };

  const handleUpdateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div className="bg-slate-100 dark-theme:bg-slate-800 px-6 py-3 flex items-center justify-between transition-colors">
      <EditableText
        value={content.label || 'Toggle Theme'}
        onChange={(val) => handleUpdateField('label', val)}
        className="text-sm text-slate-600 dark-theme:text-slate-300"
        isPreview={isPreview}
      />
      <button
        onClick={toggleTheme}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-slate-700' : 'bg-cyan-500'
        }`}
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ${
            isDark ? 'translate-x-7' : 'translate-x-1'
          }`}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-cyan-500" />
          )}
        </div>
      </button>
    </div>
  );
};
