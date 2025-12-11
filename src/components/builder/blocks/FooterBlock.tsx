import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

interface FooterBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const FooterBlock = ({ block, onUpdate, isPreview }: FooterBlockProps) => {
  const { content } = block;

  const handleUpdateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const socialIcons = [
    { icon: Facebook, key: 'facebook' },
    { icon: Twitter, key: 'twitter' },
    { icon: Instagram, key: 'instagram' },
    { icon: Linkedin, key: 'linkedin' },
    { icon: Github, key: 'github' },
  ];

  return (
    <footer className="bg-slate-900 text-white px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <EditableText
              value={content.brandName || 'YourBrand'}
              onChange={(val) => handleUpdateField('brandName', val)}
              className="text-2xl font-bold mb-4 block"
              isPreview={isPreview}
            />
            <EditableText
              value={content.description || 'Building amazing digital experiences for the modern web.'}
              onChange={(val) => handleUpdateField('description', val)}
              className="text-slate-400 mb-6 block"
              isPreview={isPreview}
            />
            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon, key }) => (
                <a
                  key={key}
                  href={content[`${key}Url`] || '#'}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <EditableText
              value={content.col1Title || 'Company'}
              onChange={(val) => handleUpdateField('col1Title', val)}
              className="font-semibold mb-4 block"
              isPreview={isPreview}
            />
            <div className="space-y-2">
              <EditableText
                value={content.col1Link1 || 'About Us'}
                onChange={(val) => handleUpdateField('col1Link1', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
              <EditableText
                value={content.col1Link2 || 'Careers'}
                onChange={(val) => handleUpdateField('col1Link2', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
              <EditableText
                value={content.col1Link3 || 'Blog'}
                onChange={(val) => handleUpdateField('col1Link3', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
            </div>
          </div>

          {/* Links Column 2 */}
          <div>
            <EditableText
              value={content.col2Title || 'Support'}
              onChange={(val) => handleUpdateField('col2Title', val)}
              className="font-semibold mb-4 block"
              isPreview={isPreview}
            />
            <div className="space-y-2">
              <EditableText
                value={content.col2Link1 || 'Help Center'}
                onChange={(val) => handleUpdateField('col2Link1', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
              <EditableText
                value={content.col2Link2 || 'Contact'}
                onChange={(val) => handleUpdateField('col2Link2', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
              <EditableText
                value={content.col2Link3 || 'Privacy Policy'}
                onChange={(val) => handleUpdateField('col2Link3', val)}
                className="text-slate-400 hover:text-white transition-colors block cursor-pointer"
                isPreview={isPreview}
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <EditableText
            value={content.copyright || '© 2024 YourBrand. All rights reserved.'}
            onChange={(val) => handleUpdateField('copyright', val)}
            className="text-slate-500 text-sm"
            isPreview={isPreview}
          />
        </div>
      </div>
    </footer>
  );
};
