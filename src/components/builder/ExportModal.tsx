import { ComponentBlock } from '@/types/builder';
import { X, Copy, Download, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: ComponentBlock[];
}

type ExportFormat = 'html' | 'json';

export const ExportModal = ({ isOpen, onClose, blocks }: ExportModalProps) => {
  const [format, setFormat] = useState<ExportFormat>('html');
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    const htmlContent = blocks.map(block => {
      const c = block.content;
      switch (block.type) {
        case 'hero':
          return `<section class="hero">
  <div class="container">
    <h1>${c.headline || ''}</h1>
    <p>${c.subheadline || ''}</p>
    <div class="buttons">
      <button class="btn-primary">${c.buttonText || ''}</button>
      <button class="btn-secondary">${c.buttonSecondary || ''}</button>
    </div>
  </div>
</section>`;
        case 'features':
          return `<section class="features">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <div class="features-grid">
      <div class="feature"><h3>${c.feature1Title || ''}</h3><p>${c.feature1Desc || ''}</p></div>
      <div class="feature"><h3>${c.feature2Title || ''}</h3><p>${c.feature2Desc || ''}</p></div>
      <div class="feature"><h3>${c.feature3Title || ''}</h3><p>${c.feature3Desc || ''}</p></div>
    </div>
  </div>
</section>`;
        case 'cta':
          return `<section class="cta">
  <div class="container">
    <h2>${c.headline || ''}</h2>
    <p>${c.description || ''}</p>
    <button class="btn-primary">${c.buttonText || ''}</button>
    <small>${c.note || ''}</small>
  </div>
</section>`;
        case 'contact':
          return `<section class="contact">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <form>
      <input type="text" placeholder="${c.namePlaceholder || ''}" />
      <input type="email" placeholder="${c.emailPlaceholder || ''}" />
      <textarea placeholder="${c.messagePlaceholder || ''}"></textarea>
      <button type="submit">${c.buttonText || ''}</button>
    </form>
  </div>
</section>`;
        case 'pricing':
          return `<section class="pricing">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <div class="pricing-grid">
      <div class="plan"><h3>${c.plan1Name || ''}</h3><div class="price">${c.plan1Price || ''}</div><p>${c.plan1Features || ''}</p></div>
      <div class="plan featured"><h3>${c.plan2Name || ''}</h3><div class="price">${c.plan2Price || ''}</div><p>${c.plan2Features || ''}</p></div>
      <div class="plan"><h3>${c.plan3Name || ''}</h3><div class="price">${c.plan3Price || ''}</div><p>${c.plan3Features || ''}</p></div>
    </div>
  </div>
</section>`;
        case 'faq':
          return `<section class="faq">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <div class="faq-list">
      <details><summary>${c.question1 || ''}</summary><p>${c.answer1 || ''}</p></details>
      <details><summary>${c.question2 || ''}</summary><p>${c.answer2 || ''}</p></details>
      <details><summary>${c.question3 || ''}</summary><p>${c.answer3 || ''}</p></details>
    </div>
  </div>
</section>`;
        case 'testimonials':
          return `<section class="testimonials">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <div class="testimonials-grid">
      <div class="testimonial"><img src="${c.avatar1 || ''}" alt="" /><p>"${c.quote1 || ''}"</p><span>${c.author1 || ''}</span></div>
      <div class="testimonial"><img src="${c.avatar2 || ''}" alt="" /><p>"${c.quote2 || ''}"</p><span>${c.author2 || ''}</span></div>
      <div class="testimonial"><img src="${c.avatar3 || ''}" alt="" /><p>"${c.quote3 || ''}"</p><span>${c.author3 || ''}</span></div>
    </div>
  </div>
</section>`;
        case 'navbar':
          return `<nav class="navbar">
  <div class="container">
    <a href="#" class="brand">${c.brandName || ''}</a>
    <div class="nav-links">
      <a href="#">${c.link1 || ''}</a>
      <a href="#">${c.link2 || ''}</a>
      <a href="#">${c.link3 || ''}</a>
      <a href="#">${c.link4 || ''}</a>
    </div>
    <button class="btn-primary">${c.ctaText || ''}</button>
  </div>
</nav>`;
        case 'footer':
          return `<footer class="footer">
  <div class="container">
    <div class="footer-brand">
      <h3>${c.brandName || ''}</h3>
      <p>${c.description || ''}</p>
    </div>
    <div class="footer-links">
      <a href="#">${c.link1 || ''}</a>
      <a href="#">${c.link2 || ''}</a>
      <a href="#">${c.link3 || ''}</a>
      <a href="#">${c.link4 || ''}</a>
    </div>
    <p class="copyright">${c.copyright || ''}</p>
  </div>
</footer>`;
        case 'imageGallery':
          return `<section class="gallery">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <div class="gallery-grid">
      <figure><img src="${c.image1 || ''}" alt="" /><figcaption>${c.caption1 || ''}</figcaption></figure>
      <figure><img src="${c.image2 || ''}" alt="" /><figcaption>${c.caption2 || ''}</figcaption></figure>
      <figure><img src="${c.image3 || ''}" alt="" /><figcaption>${c.caption3 || ''}</figcaption></figure>
      <figure><img src="${c.image4 || ''}" alt="" /><figcaption>${c.caption4 || ''}</figcaption></figure>
    </div>
  </div>
</section>`;
        case 'videoEmbed':
          return `<section class="video-embed">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <div class="video-wrapper">
      <iframe src="${c.videoUrl || ''}" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</section>`;
        case 'team':
          return `<section class="team">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <div class="team-grid">
      <div class="member"><img src="${c.member1Photo || ''}" alt="" /><h4>${c.member1Name || ''}</h4><span>${c.member1Role || ''}</span><p>${c.member1Bio || ''}</p></div>
      <div class="member"><img src="${c.member2Photo || ''}" alt="" /><h4>${c.member2Name || ''}</h4><span>${c.member2Role || ''}</span><p>${c.member2Bio || ''}</p></div>
      <div class="member"><img src="${c.member3Photo || ''}" alt="" /><h4>${c.member3Name || ''}</h4><span>${c.member3Role || ''}</span><p>${c.member3Bio || ''}</p></div>
    </div>
  </div>
</section>`;
        case 'blog':
          return `<article class="blog-post">
  <div class="container">
    <header>
      <h1>${c.title || ''}</h1>
      <div class="meta"><span>${c.author || ''}</span> · <span>${c.date || ''}</span></div>
    </header>
    <img src="${c.featuredImage || ''}" alt="" class="featured-image" />
    <p class="excerpt">${c.excerpt || ''}</p>
    <h2>${c.heading1 || ''}</h2>
    <p>${c.paragraph1 || ''}</p>
    <h2>${c.heading2 || ''}</h2>
    <p>${c.paragraph2 || ''}</p>
  </div>
</article>`;
        case 'newsletter':
          return `<section class="newsletter">
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <form class="newsletter-form">
      <input type="email" placeholder="${c.placeholder || ''}" />
      <button type="submit">${c.buttonText || ''}</button>
    </form>
    <small>${c.disclaimer || ''}</small>
  </div>
</section>`;
        case 'ctaBanner':
          return `<section class="cta-banner">
  <div class="container">
    <h2>${c.headline || ''}</h2>
    <p>${c.subtext || ''}</p>
    <div class="buttons">
      <button class="btn-primary">${c.primaryButton || ''}</button>
      <button class="btn-secondary">${c.secondaryButton || ''}</button>
    </div>
  </div>
</section>`;
        case 'themeToggle':
          return `<!-- Theme toggle button -->`;
        default:
          return `<!-- ${block.type} section -->`;
      }
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    img { max-width: 100%; height: auto; }
    
    /* Navbar */
    .navbar { padding: 1rem 0; border-bottom: 1px solid #e5e5e5; }
    .navbar .container { display: flex; align-items: center; justify-content: space-between; }
    .navbar .brand { font-weight: 600; font-size: 1.25rem; text-decoration: none; color: inherit; }
    .navbar .nav-links { display: flex; gap: 2rem; }
    .navbar .nav-links a { text-decoration: none; color: #666; }
    
    /* Hero */
    .hero { padding: 5rem 0; background: linear-gradient(135deg, #1e293b, #334155); color: white; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 700; }
    .hero p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    
    /* Buttons */
    .buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary { padding: 0.75rem 1.5rem; background: #0ea5e9; border: none; border-radius: 0.5rem; font-weight: 500; cursor: pointer; color: white; font-size: 0.875rem; }
    .btn-secondary { padding: 0.75rem 1.5rem; background: transparent; border: 1px solid currentColor; border-radius: 0.5rem; cursor: pointer; font-size: 0.875rem; }
    
    /* Features */
    .features { padding: 4rem 0; }
    .features h2, .pricing h2, .faq h2, .testimonials h2, .gallery h2, .team h2, .newsletter h2 { text-align: center; font-size: 2rem; margin-bottom: 0.5rem; }
    .features > .container > p, .pricing > .container > p, .testimonials > .container > p, .gallery > .container > p, .team > .container > p, .newsletter > .container > p { text-align: center; color: #666; margin-bottom: 3rem; }
    .features-grid, .pricing-grid, .testimonials-grid, .gallery-grid, .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .feature, .plan, .testimonial, .member { padding: 1.5rem; background: #f8fafc; border-radius: 0.75rem; }
    .feature h3 { margin-bottom: 0.5rem; }
    .feature p { color: #666; font-size: 0.9rem; }
    
    /* Pricing */
    .pricing { padding: 4rem 0; background: #f8fafc; }
    .plan.featured { background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; }
    .plan .price { font-size: 2rem; font-weight: 700; margin: 1rem 0; }
    
    /* CTA */
    .cta, .cta-banner { padding: 4rem 0; background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; text-align: center; }
    .cta h2, .cta-banner h2 { font-size: 2rem; margin-bottom: 1rem; }
    .cta p, .cta-banner p { opacity: 0.9; margin-bottom: 2rem; }
    .cta small { display: block; margin-top: 1rem; opacity: 0.7; }
    
    /* Contact */
    .contact { padding: 4rem 0; background: #f8fafc; }
    .contact h2 { text-align: center; font-size: 2rem; margin-bottom: 0.5rem; }
    .contact > .container > p { text-align: center; color: #666; margin-bottom: 2rem; }
    .contact form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
    .contact input, .contact textarea { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 1rem; }
    .contact textarea { min-height: 120px; resize: vertical; }
    
    /* FAQ */
    .faq { padding: 4rem 0; }
    .faq-list { max-width: 700px; margin: 0 auto; }
    .faq-list details { border-bottom: 1px solid #e5e5e5; padding: 1rem 0; }
    .faq-list summary { cursor: pointer; font-weight: 500; }
    .faq-list p { margin-top: 0.75rem; color: #666; }
    
    /* Testimonials */
    .testimonials { padding: 4rem 0; }
    .testimonial img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; }
    .testimonial p { font-style: italic; margin-bottom: 0.5rem; }
    .testimonial span { font-weight: 500; font-size: 0.875rem; }
    
    /* Gallery */
    .gallery { padding: 4rem 0; }
    .gallery-grid figure { margin: 0; }
    .gallery-grid img { border-radius: 0.5rem; width: 100%; aspect-ratio: 4/3; object-fit: cover; }
    .gallery-grid figcaption { text-align: center; margin-top: 0.5rem; font-size: 0.875rem; color: #666; }
    
    /* Team */
    .team { padding: 4rem 0; background: #f8fafc; }
    .member { text-align: center; }
    .member img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; }
    .member h4 { margin-bottom: 0.25rem; }
    .member span { color: #0ea5e9; font-size: 0.875rem; }
    .member p { margin-top: 0.75rem; font-size: 0.875rem; color: #666; }
    
    /* Blog */
    .blog-post { padding: 4rem 0; }
    .blog-post header { text-align: center; margin-bottom: 2rem; }
    .blog-post h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .blog-post .meta { color: #666; }
    .blog-post .featured-image { width: 100%; border-radius: 0.75rem; margin-bottom: 2rem; }
    .blog-post .excerpt { font-size: 1.25rem; color: #666; margin-bottom: 2rem; }
    .blog-post h2 { margin: 2rem 0 1rem; }
    
    /* Newsletter */
    .newsletter { padding: 4rem 0; background: #f8fafc; text-align: center; }
    .newsletter-form { display: flex; gap: 0.5rem; justify-content: center; max-width: 400px; margin: 0 auto 1rem; }
    .newsletter-form input { flex: 1; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; }
    .newsletter small { color: #666; font-size: 0.75rem; }
    
    /* Video */
    .video-embed { padding: 4rem 0; }
    .video-embed h2 { text-align: center; margin-bottom: 0.5rem; }
    .video-embed > .container > p { text-align: center; color: #666; margin-bottom: 2rem; }
    .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; }
    .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 0.75rem; }
    
    /* Footer */
    .footer { padding: 3rem 0; background: #1e293b; color: white; }
    .footer .container { display: grid; gap: 2rem; }
    .footer-brand h3 { margin-bottom: 0.5rem; }
    .footer-brand p { opacity: 0.7; font-size: 0.875rem; }
    .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .footer-links a { color: white; opacity: 0.7; text-decoration: none; font-size: 0.875rem; }
    .copyright { opacity: 0.5; font-size: 0.75rem; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  };

  const generateJSON = () => {
    return JSON.stringify({ version: '1.0', blocks }, null, 2);
  };

  const output = format === 'html' ? generateHTML() : generateJSON();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: format === 'html' ? 'text/html' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layout.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded layout.${format}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium">Export Layout</h2>
                <div className="flex items-center gap-0.5 bg-muted/50 rounded-md p-0.5">
                  <button
                    onClick={() => setFormat('html')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      format === 'html'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setFormat('json')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      format === 'json'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    JSON
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mac-button hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Code */}
            <div className="p-4 max-h-[60vh] overflow-auto">
              <pre className="p-4 bg-background rounded-lg text-xs font-mono overflow-x-auto">
                <code className="text-foreground/80">{output}</code>
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border bg-muted/20">
              <button
                onClick={handleCopy}
                className="mac-button-text"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="mac-button-primary">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};