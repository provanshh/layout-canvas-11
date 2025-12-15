import { BaseBlockProps } from '../types';
import { EditableText } from '../EditableText';
import { EditableButton } from '../EditableButton';
import { Plus, X, Menu } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { ComponentBlock } from '@/types/builder';

interface NavbarBlockProps extends BaseBlockProps {
  forceMobileView?: boolean;
  allBlocks?: ComponentBlock[];
}

// Map block types to readable nav labels
const blockTypeToLabel: Record<string, string> = {
  hero: 'Home',
  features: 'Features',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  team: 'Team',
  contact: 'Contact',
  faq: 'FAQ',
  imageGallery: 'Gallery',
  blog: 'Blog',
  newsletter: 'Newsletter',
  cta: 'CTA',
  ctaBanner: 'Banner',
  videoEmbed: 'Video',
};

// Block types that should appear in navbar
const navEligibleBlocks = ['hero', 'features', 'pricing', 'testimonials', 'team', 'contact', 'faq', 'imageGallery', 'blog', 'newsletter', 'cta', 'ctaBanner', 'videoEmbed'];

export const NavbarBlock = ({ 
  block, 
  onUpdate, 
  isPreview,
  onEditButton,
  onEditText,
  forceMobileView = false,
  allBlocks = []
}: NavbarBlockProps) => {
  const { content } = block;
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isMobile = forceMobileView;

  // Auto-generate nav links from sections
  const autoNavLinks = useMemo(() => {
    return allBlocks
      .filter(b => navEligibleBlocks.includes(b.type))
      .map(b => ({
        label: b.content?.sectionTitle || blockTypeToLabel[b.type] || b.type,
        href: `#section-${b.id}`,
        blockId: b.id,
      }));
  }, [allBlocks]);

  // Use auto-generated links if no manual links exist, otherwise use manual
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

  const manualLinks = getNavLinks();
  
  // Auto-sync nav links when sections change (only if no manual customization)
  useEffect(() => {
    if (manualLinks.length === 0 && autoNavLinks.length > 0 && !isPreview) {
      const newContent: Record<string, string> = { ...content };
      autoNavLinks.forEach((link, idx) => {
        newContent[`navLink${idx + 1}Label`] = link.label;
        newContent[`navLink${idx + 1}Href`] = link.href;
      });
      onUpdate(newContent);
    }
  }, [autoNavLinks.length]);

  // Use manual links if they exist, otherwise use auto-generated
  const navLinks = manualLinks.length > 0 ? manualLinks : autoNavLinks;

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
    delete newContent[`navLink${index}Label`];
    delete newContent[`navLink${index}Href`];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#section-')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.querySelector(`[data-section-id="${targetId}"]`) || 
                           document.querySelector(`[data-block-id="${href.replace('#section-', '')}"]`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileMenuOpen(false);
    } else if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileMenuOpen(false);
    }
  };

  // Dynamic sizing based on number of links
  const linkCount = navLinks.length;
  const linkSize = linkCount > 6 ? 'text-xs px-2' : linkCount > 4 ? 'text-sm px-3' : 'text-sm px-4';
  const gapSize = linkCount > 6 ? 'gap-2' : linkCount > 4 ? 'gap-3' : 'gap-6';

  return (
    <nav className="bg-slate-900 text-white px-4 md:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-slate-900 text-sm">
              {(content.logoText || 'L').charAt(0)}
            </span>
          </div>
          <EditableText
            value={content.logoText || 'Logo'}
            onChange={(val) => handleUpdateField('logoText', val)}
            className="font-bold text-lg"
            isPreview={isPreview}
            onEditText={onEditText}
            textId={`${block.id}-logoText`}
          />
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className={`hidden md:flex items-center ${gapSize} flex-wrap justify-center`}>
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-1"
                onMouseEnter={() => setHoveredLink(idx)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap ${linkSize}`}
                >
                  <EditableText
                    value={link.label}
                    onChange={(val) => handleUpdateField(`navLink${idx + 1}Label`, val)}
                    className="inline"
                    isPreview={isPreview}
                    onEditText={onEditText}
                    textId={`${block.id}-navLink${idx + 1}`}
                  />
                </a>
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
                className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center hover:bg-cyan-500/30 transition-colors flex-shrink-0"
                title="Add nav link"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop CTA */}
          {!isMobile && (
            <div className="hidden md:block">
              <EditableButton
                text={content.ctaText || 'Get Started'}
                bgColor={content.ctaColor || '#06b6d4'}
                textColor={content.ctaTextColor || '#0f172a'}
                link={content.ctaLink || '#'}
                className={`${linkCount > 6 ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'} rounded-lg font-medium`}
                isPreview={isPreview}
                onEditButton={onEditButton}
                buttonId={`${block.id}-cta-btn`}
                onTextChange={(v) => handleUpdateField('ctaText', v)}
                onBgColorChange={(v) => handleUpdateField('ctaColor', v)}
                onTextColorChange={(v) => handleUpdateField('ctaTextColor', v)}
                onLinkChange={(v) => handleUpdateField('ctaLink', v)}
              />
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isMobile ? 'flex' : 'md:hidden'} p-2 rounded-lg hover:bg-slate-800 transition-colors`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`${isMobile ? 'block' : 'md:hidden'} mt-4 pt-4 border-t border-slate-700`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-300 hover:text-white transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <EditableButton
                text={content.ctaText || 'Get Started'}
                bgColor={content.ctaColor || '#06b6d4'}
                textColor={content.ctaTextColor || '#0f172a'}
                link={content.ctaLink || '#'}
                className="px-4 py-2 rounded-lg font-medium w-full text-center"
                isPreview={isPreview}
                onEditButton={onEditButton}
                buttonId={`${block.id}-cta-btn-mobile`}
                onTextChange={(v) => handleUpdateField('ctaText', v)}
                onBgColorChange={(v) => handleUpdateField('ctaColor', v)}
                onTextColorChange={(v) => handleUpdateField('ctaTextColor', v)}
                onLinkChange={(v) => handleUpdateField('ctaLink', v)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
