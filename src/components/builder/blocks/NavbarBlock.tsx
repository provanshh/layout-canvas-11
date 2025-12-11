import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const NavbarBlock = ({ block, onUpdate, isPreview }: NavbarBlockProps) => {
  const { content } = block;
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  // Get all nav links from content
  const getNavLinks = () => {
    const links: { label: string; href: string }[] = [];
    let i = 1;
    while (content[`navLink${i}Label`]) {
      links.push({
        label: content[`navLink${i}Label`],
        href: content[`navLink${i}Href`] || '#',
      });
      i++;
    }
    return links;
  };

  const navLinks = getNavLinks();

  const handleUpdateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const addNavLink = () => {
    const newIndex = navLinks.length + 1;
    onUpdate({
      ...content,
      [`navLink${newIndex}Label`]: 'New Link',
      [`navLink${newIndex}Href`]: '#',
    });
  };

  const removeNavLink = (index: number) => {
    const newContent = { ...content };
    // Remove the link at the given index
    delete newContent[`navLink${index}Label`];
    delete newContent[`navLink${index}Href`];

    // Reindex all links after this one
    const links = getNavLinks();
    for (let i = index; i < links.length; i++) {
      if (newContent[`navLink${i + 1}Label`]) {
        newContent[`navLink${i}Label`] = newContent[`navLink${i + 1}Label`];
        newContent[`navLink${i}Href`] = newContent[`navLink${i + 1}Href`];
        delete newContent[`navLink${i + 1}Label`];
        delete newContent[`navLink${i + 1}Href`];
      }
    }

    onUpdate(newContent);
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-slate-900 text-sm">
              <EditableText
                value={content.logoText?.charAt(0) || 'L'}
                onChange={(val) => handleUpdateField('logoText', val + (content.logoText?.slice(1) || 'ogo'))}
                className="text-slate-900"
                isPreview={isPreview}
              />
            </span>
          </div>
          <EditableText
            value={content.logoText || 'Logo'}
            onChange={(val) => handleUpdateField('logoText', val)}
            className="font-bold text-lg"
            isPreview={isPreview}
          />
        </div>

        <div className="flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <div
              key={idx}
              className="relative flex items-center gap-1"
              onMouseEnter={() => setHoveredLink(idx)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <EditableText
                value={link.label}
                onChange={(val) => handleUpdateField(`navLink${idx + 1}Label`, val)}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                isPreview={isPreview}
              />
              {!isPreview && hoveredLink === idx && (
                <button
                  onClick={() => removeNavLink(idx + 1)}
                  className="absolute -top-2 -right-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {!isPreview && (
            <button
              onClick={addNavLink}
              className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
              title="Add nav link"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <EditableText
            value={content.ctaText || 'Get Started'}
            onChange={(val) => handleUpdateField('ctaText', val)}
            className="px-4 py-2 bg-cyan-500 text-slate-900 font-medium rounded-lg hover:bg-cyan-400 transition-colors"
            isPreview={isPreview}
          />
        </div>
      </div>
    </nav>
  );
};
