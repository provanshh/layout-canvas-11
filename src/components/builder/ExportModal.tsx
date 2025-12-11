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
      
      // Helper to get inline styles
      const getBlockStyles = () => {
        const styles: string[] = [];
        if (c.styleBgColor) styles.push(`background-color: ${c.styleBgColor}`);
        if (c.styleTextColor) styles.push(`color: ${c.styleTextColor}`);
        if (c.styleFontFamily) styles.push(`font-family: ${c.styleFontFamily}`);
        if (c.styleFontScale) styles.push(`font-size: ${c.styleFontScale}%`);
        return styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      };

      const blockStyles = getBlockStyles();
      const spacingClass = c.styleSpacing === 'compact' ? ' spacing-compact' : 
                          c.styleSpacing === 'relaxed' ? ' spacing-relaxed' : 
                          c.styleSpacing === 'spacious' ? ' spacing-spacious' : '';
      
      switch (block.type) {
        case 'navbar':
          return `<nav class="navbar"${blockStyles}>
  <div class="container">
    <a href="#" class="brand">${c.logoText || c.brandName || ''}</a>
    <div class="nav-links">
      <a href="${c.navLink1Href || '#'}">${c.navLink1Label || c.link1 || ''}</a>
      <a href="${c.navLink2Href || '#'}">${c.navLink2Label || c.link2 || ''}</a>
      <a href="${c.navLink3Href || '#'}">${c.navLink3Label || c.link3 || ''}</a>
      <a href="${c.navLink4Href || '#'}">${c.navLink4Label || c.link4 || ''}</a>
    </div>
    <button class="btn-primary">${c.ctaText || ''}</button>
  </div>
</nav>`;

        case 'hero':
          return `<section class="hero${spacingClass}"${blockStyles}>
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
          return `<section class="features${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <div class="features-grid">
      <div class="feature">
        <h3>${c.feature1Title || ''}</h3>
        <p>${c.feature1Desc || ''}</p>
      </div>
      <div class="feature">
        <h3>${c.feature2Title || ''}</h3>
        <p>${c.feature2Desc || ''}</p>
      </div>
      <div class="feature">
        <h3>${c.feature3Title || ''}</h3>
        <p>${c.feature3Desc || ''}</p>
      </div>
    </div>
  </div>
</section>`;

        case 'cta':
          return `<section class="cta${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.headline || ''}</h2>
    <p>${c.description || ''}</p>
    <button class="btn-primary">${c.buttonText || ''}</button>
    <small>${c.note || ''}</small>
  </div>
</section>`;

        case 'contact':
          return `<section class="contact${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <form class="contact-form">
      <input type="text" placeholder="${c.namePlaceholder || ''}" required />
      <input type="email" placeholder="${c.emailPlaceholder || ''}" required />
      <textarea placeholder="${c.messagePlaceholder || ''}" rows="5"></textarea>
      <button type="submit" class="btn-primary">${c.buttonText || ''}</button>
    </form>
  </div>
</section>`;

        case 'pricing':
          return `<section class="pricing${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <div class="pricing-grid">
      <div class="plan">
        <h3>${c.plan1Name || ''}</h3>
        <div class="price">${c.plan1Price || ''}<span>/month</span></div>
        <p>${c.plan1Features || ''}</p>
        <button class="btn-secondary">Get Started</button>
      </div>
      <div class="plan featured">
        ${c.plan2Badge ? `<span class="badge">${c.plan2Badge}</span>` : ''}
        <h3>${c.plan2Name || ''}</h3>
        <div class="price">${c.plan2Price || ''}<span>/month</span></div>
        <p>${c.plan2Features || ''}</p>
        <button class="btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</section>`;

        case 'faq':
          return `<section class="faq${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <div class="faq-list">
      <details>
        <summary>${c.q1 || c.question1 || ''}</summary>
        <p>${c.a1 || c.answer1 || ''}</p>
      </details>
      <details>
        <summary>${c.q2 || c.question2 || ''}</summary>
        <p>${c.a2 || c.answer2 || ''}</p>
      </details>
      <details>
        <summary>${c.q3 || c.question3 || ''}</summary>
        <p>${c.a3 || c.answer3 || ''}</p>
      </details>
    </div>
  </div>
</section>`;

        case 'testimonials':
          return `<section class="testimonials${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <div class="testimonials-grid">
      <div class="testimonial">
        <img src="${c.avatar1 || ''}" alt="${c.author1 || ''}" />
        <blockquote>"${c.quote1 || ''}"</blockquote>
        <cite>
          <strong>${c.author1 || ''}</strong>
          <span>${c.role1 || ''}</span>
        </cite>
      </div>
      <div class="testimonial">
        <img src="${c.avatar2 || ''}" alt="${c.author2 || ''}" />
        <blockquote>"${c.quote2 || ''}"</blockquote>
        <cite>
          <strong>${c.author2 || ''}</strong>
          <span>${c.role2 || ''}</span>
        </cite>
      </div>
    </div>
  </div>
</section>`;

        case 'footer':
          return `<footer class="footer${spacingClass}"${blockStyles}>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>${c.brandName || ''}</h3>
        <p>${c.description || ''}</p>
      </div>
      <div class="footer-col">
        <h4>${c.col1Title || ''}</h4>
        <ul>
          <li><a href="#">${c.col1Link1 || ''}</a></li>
          <li><a href="#">${c.col1Link2 || ''}</a></li>
          <li><a href="#">${c.col1Link3 || ''}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>${c.col2Title || ''}</h4>
        <ul>
          <li><a href="#">${c.col2Link1 || ''}</a></li>
          <li><a href="#">${c.col2Link2 || ''}</a></li>
          <li><a href="#">${c.col2Link3 || ''}</a></li>
        </ul>
      </div>
    </div>
    <div class="copyright">${c.copyright || ''}</div>
  </div>
</footer>`;

        case 'imageGallery':
          return `<section class="gallery${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <div class="gallery-grid">
      <figure>
        <img src="${c.image1Url || c.image1 || ''}" alt="${c.image1Caption || c.caption1 || ''}" />
        <figcaption>${c.image1Caption || c.caption1 || ''}</figcaption>
      </figure>
      <figure>
        <img src="${c.image2Url || c.image2 || ''}" alt="${c.image2Caption || c.caption2 || ''}" />
        <figcaption>${c.image2Caption || c.caption2 || ''}</figcaption>
      </figure>
      <figure>
        <img src="${c.image3Url || c.image3 || ''}" alt="${c.image3Caption || c.caption3 || ''}" />
        <figcaption>${c.image3Caption || c.caption3 || ''}</figcaption>
      </figure>
    </div>
  </div>
</section>`;

        case 'videoEmbed':
          const videoUrl = c.videoUrl || '';
          const embedUrl = videoUrl.includes('youtube.com/watch?v=') 
            ? videoUrl.replace('watch?v=', 'embed/')
            : videoUrl.includes('youtu.be/')
            ? `https://www.youtube.com/embed/${videoUrl.split('youtu.be/')[1]}`
            : videoUrl;
          return `<section class="video-embed${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <div class="video-wrapper">
      <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    ${c.caption ? `<p class="video-caption">${c.caption}</p>` : ''}
  </div>
</section>`;

        case 'team':
          return `<section class="team${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p class="section-subtitle">${c.subtitle || ''}</p>
    <div class="team-grid">
      <div class="member">
        <img src="${c.member1Photo || ''}" alt="${c.member1Name || ''}" />
        <h4>${c.member1Name || ''}</h4>
        <span class="role">${c.member1Role || ''}</span>
        <p>${c.member1Bio || ''}</p>
      </div>
      <div class="member">
        <img src="${c.member2Photo || ''}" alt="${c.member2Name || ''}" />
        <h4>${c.member2Name || ''}</h4>
        <span class="role">${c.member2Role || ''}</span>
        <p>${c.member2Bio || ''}</p>
      </div>
      <div class="member">
        <img src="${c.member3Photo || ''}" alt="${c.member3Name || ''}" />
        <h4>${c.member3Name || ''}</h4>
        <span class="role">${c.member3Role || ''}</span>
        <p>${c.member3Bio || ''}</p>
      </div>
    </div>
  </div>
</section>`;

        case 'blog':
          return `<article class="blog-post${spacingClass}"${blockStyles}>
  <div class="container">
    <header class="article-header">
      <h1>${c.title || ''}</h1>
      <div class="meta">
        <span class="author">${c.author || ''}</span>
        <span class="date">${c.date || ''}</span>
      </div>
    </header>
    <img src="${c.featuredImage || ''}" alt="${c.title || ''}" class="featured-image" />
    <p class="excerpt">${c.excerpt || ''}</p>
    <h2>${c.heading1 || ''}</h2>
    <p>${c.paragraph1 || ''}</p>
    <h2>${c.heading2 || ''}</h2>
    <p>${c.paragraph2 || ''}</p>
  </div>
</article>`;

        case 'newsletter':
          return `<section class="newsletter${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.title || ''}</h2>
    <p>${c.subtitle || ''}</p>
    <form class="newsletter-form">
      <input type="email" placeholder="${c.placeholder || ''}" required />
      <button type="submit" class="btn-primary">${c.buttonText || ''}</button>
    </form>
    <small>${c.disclaimer || ''}</small>
  </div>
</section>`;

        case 'ctaBanner':
          return `<section class="cta-banner${spacingClass}"${blockStyles}>
  <div class="container">
    <h2>${c.headline || ''}</h2>
    <p>${c.subtext || ''}</p>
    <div class="buttons">
      <button class="btn-primary">${c.buttonText || c.primaryButton || ''}</button>
      <button class="btn-secondary">${c.secondaryButtonText || c.secondaryButton || ''}</button>
    </div>
  </div>
</section>`;

        case 'themeToggle':
          return `<!-- Theme toggle button - implement with JavaScript -->
<button class="theme-toggle" onclick="document.body.classList.toggle('dark-theme')">
  Toggle Theme
</button>`;

        default:
          return `<!-- ${block.type} section -->`;
      }
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    /* Reset & Base */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6; 
      color: #1e293b;
      background: #fff;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    img { max-width: 100%; height: auto; display: block; }
    a { color: inherit; text-decoration: none; }
    
    /* Spacing modifiers */
    .spacing-compact { padding-top: 1rem !important; padding-bottom: 1rem !important; }
    .spacing-relaxed { padding-top: 2rem !important; padding-bottom: 2rem !important; }
    .spacing-spacious { padding-top: 3rem !important; padding-bottom: 3rem !important; }
    
    /* Buttons */
    .buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-primary { 
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.75rem 2rem; 
      background: linear-gradient(135deg, #06b6d4, #0ea5e9);
      border: none; border-radius: 0.5rem; 
      font-weight: 600; font-size: 0.875rem;
      cursor: pointer; color: #0f172a;
      transition: all 0.2s ease;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4); }
    .btn-secondary { 
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.75rem 2rem; 
      background: transparent; 
      border: 1px solid rgba(148, 163, 184, 0.5); 
      border-radius: 0.5rem; 
      font-weight: 600; font-size: 0.875rem;
      cursor: pointer; color: inherit;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover { border-color: currentColor; }
    
    /* Navbar */
    .navbar { 
      padding: 1rem 0; 
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(10px);
      position: sticky; top: 0; z-index: 100;
    }
    .navbar .container { display: flex; align-items: center; justify-content: space-between; }
    .navbar .brand { font-weight: 700; font-size: 1.25rem; color: #fff; }
    .navbar .nav-links { display: flex; gap: 2rem; }
    .navbar .nav-links a { color: #94a3b8; font-size: 0.875rem; transition: color 0.2s; }
    .navbar .nav-links a:hover { color: #fff; }
    
    /* Hero */
    .hero { 
      padding: 6rem 0; 
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      color: #fff; 
      text-align: center; 
    }
    .hero h1 { 
      font-size: clamp(2.5rem, 5vw, 4rem); 
      font-weight: 800; 
      margin-bottom: 1.5rem; 
      line-height: 1.1;
      background: linear-gradient(135deg, #fff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero p { 
      font-size: 1.25rem; 
      color: #94a3b8; 
      margin-bottom: 2.5rem; 
      max-width: 600px; 
      margin-left: auto; 
      margin-right: auto; 
    }
    
    /* Section common styles */
    .section-subtitle { text-align: center; color: #64748b; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto; }
    section h2 { text-align: center; font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem; }
    
    /* Features */
    .features { padding: 5rem 0; background: #f8fafc; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .feature { 
      padding: 2rem; 
      background: #fff; 
      border-radius: 1rem; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    .feature:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -15px rgba(0,0,0,0.15); }
    .feature h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: #0f172a; }
    .feature p { color: #64748b; font-size: 0.9375rem; }
    
    /* Pricing */
    .pricing { padding: 5rem 0; }
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto; }
    .plan { 
      padding: 2.5rem; 
      background: #f8fafc; 
      border-radius: 1rem;
      border: 1px solid #e2e8f0;
      text-align: center;
      position: relative;
    }
    .plan.featured { 
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #fff;
      border: none;
      transform: scale(1.05);
    }
    .plan .badge {
      position: absolute;
      top: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #06b6d4, #0ea5e9);
      color: #0f172a;
      padding: 0.25rem 1rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .plan h3 { font-size: 1.5rem; margin-bottom: 1rem; }
    .plan .price { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; }
    .plan .price span { font-size: 1rem; font-weight: 400; opacity: 0.7; }
    .plan p { color: #64748b; margin-bottom: 2rem; font-size: 0.9375rem; }
    .plan.featured p { color: #94a3b8; }
    
    /* CTA */
    .cta, .cta-banner { 
      padding: 5rem 0; 
      background: linear-gradient(135deg, #06b6d4, #0ea5e9);
      color: #0f172a; 
      text-align: center; 
    }
    .cta h2, .cta-banner h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .cta p, .cta-banner p { font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.9; }
    .cta small { display: block; margin-top: 1rem; opacity: 0.7; }
    .cta .btn-primary, .cta-banner .btn-primary { background: #0f172a; color: #fff; }
    .cta .btn-secondary, .cta-banner .btn-secondary { border-color: #0f172a; color: #0f172a; }
    
    /* Contact */
    .contact { padding: 5rem 0; background: #f8fafc; }
    .contact-form { 
      max-width: 500px; 
      margin: 0 auto; 
      display: flex; 
      flex-direction: column; 
      gap: 1rem; 
    }
    .contact-form input, .contact-form textarea { 
      padding: 1rem; 
      border: 1px solid #e2e8f0; 
      border-radius: 0.5rem; 
      font-size: 1rem;
      background: #fff;
      transition: border-color 0.2s;
    }
    .contact-form input:focus, .contact-form textarea:focus { 
      outline: none; 
      border-color: #06b6d4; 
    }
    
    /* FAQ */
    .faq { padding: 5rem 0; }
    .faq-list { max-width: 700px; margin: 0 auto; }
    .faq-list details { 
      border-bottom: 1px solid #e2e8f0; 
      padding: 1.25rem 0; 
    }
    .faq-list summary { 
      cursor: pointer; 
      font-weight: 600; 
      font-size: 1.0625rem;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .faq-list summary::-webkit-details-marker { display: none; }
    .faq-list summary::after { content: '+'; font-size: 1.5rem; color: #64748b; }
    .faq-list details[open] summary::after { content: '−'; }
    .faq-list p { margin-top: 1rem; color: #64748b; }
    
    /* Testimonials */
    .testimonials { padding: 5rem 0; background: #f8fafc; }
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .testimonial { 
      padding: 2rem; 
      background: #fff; 
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .testimonial img { 
      width: 64px; height: 64px; 
      border-radius: 50%; 
      object-fit: cover; 
      margin-bottom: 1.5rem;
    }
    .testimonial blockquote { 
      font-size: 1.0625rem; 
      color: #334155; 
      margin-bottom: 1.5rem;
      font-style: italic;
    }
    .testimonial cite { display: block; }
    .testimonial cite strong { display: block; font-style: normal; color: #0f172a; }
    .testimonial cite span { font-size: 0.875rem; color: #06b6d4; font-style: normal; }
    
    /* Gallery */
    .gallery { padding: 5rem 0; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .gallery-grid figure { margin: 0; }
    .gallery-grid img { 
      width: 100%; 
      aspect-ratio: 4/3; 
      object-fit: cover; 
      border-radius: 0.75rem;
      transition: transform 0.3s ease;
    }
    .gallery-grid img:hover { transform: scale(1.03); }
    .gallery-grid figcaption { 
      text-align: center; 
      margin-top: 0.75rem; 
      font-size: 0.9375rem; 
      color: #64748b; 
    }
    
    /* Team */
    .team { padding: 5rem 0; background: #f8fafc; }
    .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .member { 
      text-align: center; 
      padding: 2rem;
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .member img { 
      width: 140px; height: 140px; 
      border-radius: 50%; 
      object-fit: cover; 
      margin: 0 auto 1.5rem;
    }
    .member h4 { font-size: 1.25rem; margin-bottom: 0.25rem; }
    .member .role { color: #06b6d4; font-size: 0.9375rem; display: block; margin-bottom: 1rem; }
    .member p { color: #64748b; font-size: 0.9375rem; }
    
    /* Blog */
    .blog-post { padding: 5rem 0; }
    .blog-post .article-header { text-align: center; margin-bottom: 2rem; }
    .blog-post h1 { font-size: 2.5rem; margin-bottom: 0.75rem; }
    .blog-post .meta { color: #64748b; font-size: 0.9375rem; }
    .blog-post .meta .author { font-weight: 500; color: #334155; }
    .blog-post .featured-image { width: 100%; border-radius: 1rem; margin-bottom: 2rem; }
    .blog-post .excerpt { font-size: 1.25rem; color: #64748b; margin-bottom: 2.5rem; }
    .blog-post h2 { text-align: left; font-size: 1.5rem; margin: 2rem 0 1rem; }
    .blog-post p { color: #334155; margin-bottom: 1.5rem; }
    
    /* Newsletter */
    .newsletter { padding: 5rem 0; background: #f8fafc; text-align: center; }
    .newsletter-form { 
      display: flex; 
      gap: 0.5rem; 
      justify-content: center; 
      max-width: 450px; 
      margin: 0 auto 1rem; 
    }
    .newsletter-form input { 
      flex: 1; 
      padding: 0.875rem 1rem; 
      border: 1px solid #e2e8f0; 
      border-radius: 0.5rem;
      font-size: 1rem;
    }
    .newsletter small { color: #64748b; font-size: 0.8125rem; }
    
    /* Video */
    .video-embed { padding: 5rem 0; }
    .video-wrapper { 
      position: relative; 
      padding-bottom: 56.25%; 
      height: 0;
      max-width: 900px;
      margin: 0 auto;
    }
    .video-wrapper iframe { 
      position: absolute; 
      top: 0; left: 0; 
      width: 100%; height: 100%; 
      border-radius: 1rem;
    }
    .video-caption { text-align: center; margin-top: 1rem; color: #64748b; }
    
    /* Footer */
    .footer { 
      padding: 4rem 0 2rem; 
      background: #0f172a; 
      color: #fff; 
    }
    .footer-grid { 
      display: grid; 
      grid-template-columns: 2fr 1fr 1fr; 
      gap: 3rem;
      margin-bottom: 3rem;
    }
    .footer-brand h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
    .footer-brand p { color: #94a3b8; font-size: 0.9375rem; max-width: 280px; }
    .footer-col h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.5rem; }
    .footer-col a { color: #cbd5e1; font-size: 0.9375rem; transition: color 0.2s; }
    .footer-col a:hover { color: #fff; }
    .copyright { 
      padding-top: 2rem; 
      border-top: 1px solid #1e293b; 
      color: #64748b; 
      font-size: 0.875rem;
      text-align: center;
    }
    
    /* Theme toggle */
    .theme-toggle {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      padding: 0.75rem 1rem;
      background: #1e293b;
      color: #fff;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
    }
    
    /* Dark theme */
    .dark-theme {
      background: #0f172a;
      color: #e2e8f0;
    }
    .dark-theme .features,
    .dark-theme .contact,
    .dark-theme .testimonials,
    .dark-theme .team,
    .dark-theme .newsletter { background: #1e293b; }
    .dark-theme .feature,
    .dark-theme .testimonial,
    .dark-theme .member { background: #0f172a; }
    .dark-theme .plan:not(.featured) { background: #1e293b; border-color: #334155; }
    .dark-theme section h2 { color: #f1f5f9; }
    .dark-theme .section-subtitle { color: #94a3b8; }
    
    /* Responsive */
    @media (max-width: 768px) {
      .navbar .nav-links { display: none; }
      .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
      .hero h1 { font-size: 2.5rem; }
      .pricing-grid .plan.featured { transform: none; }
    }
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
    a.download = `website.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded website.${format}`);
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
            className="w-full max-w-4xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-medium">Export Website</h2>
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
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border bg-muted/30">
              <button onClick={handleCopy} className="mac-button-text">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button onClick={handleDownload} className="mac-button-primary">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
