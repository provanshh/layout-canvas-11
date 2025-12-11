import { ComponentBlock } from '@/types/builder';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  blocks: Omit<ComponentBlock, 'id'>[];
}

const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch with an empty canvas',
    thumbnail: '📄',
    blocks: [],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Complete landing page with hero, features, testimonials, and CTA',
    thumbnail: '🚀',
    blocks: [
      {
        type: 'navbar',
        content: {
          logoText: 'Starter',
          navLink1Label: 'Features',
          navLink1Href: '#features',
          navLink2Label: 'Pricing',
          navLink2Href: '#pricing',
          navLink3Label: 'About',
          navLink3Href: '#about',
          navLink4Label: 'Contact',
          navLink4Href: '#contact',
          ctaText: 'Get Started',
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Build Amazing Products Faster',
          subheadline: 'The all-in-one platform that helps teams ship better products with less effort. Start building today.',
          buttonText: 'Start Free Trial',
          buttonSecondary: 'Watch Demo',
        },
      },
      {
        type: 'features',
        content: {
          title: 'Why Teams Choose Us',
          subtitle: 'Everything you need to succeed',
          feature1Title: 'Lightning Fast',
          feature1Desc: 'Built for speed with instant load times and smooth interactions.',
          feature2Title: 'Secure by Default',
          feature2Desc: 'Enterprise-grade security to keep your data safe.',
          feature3Title: 'Easy Integration',
          feature3Desc: 'Connect with your favorite tools in minutes.',
        },
      },
      {
        type: 'testimonials',
        content: {
          title: 'Loved by Teams Worldwide',
          quote1: 'This platform transformed how we work. Productivity is up 200%.',
          author1: 'Sarah Chen',
          role1: 'CTO, TechFlow',
          avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
          quote2: 'The best tool we\'ve ever used. Simple yet incredibly powerful.',
          author2: 'Mike Johnson',
          role2: 'Product Lead, Acme',
          avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        },
      },
      {
        type: 'cta',
        content: {
          headline: 'Ready to Get Started?',
          description: 'Join thousands of teams already building better products.',
          buttonText: 'Start Free Trial',
          note: 'No credit card required',
        },
      },
      {
        type: 'footer',
        content: {
          brandName: 'Starter',
          description: 'Building the future of productivity.',
          col1Title: 'Product',
          col1Link1: 'Features',
          col1Link2: 'Pricing',
          col1Link3: 'Changelog',
          col2Title: 'Company',
          col2Link1: 'About',
          col2Link2: 'Blog',
          col2Link3: 'Careers',
          copyright: '© 2024 Starter. All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with a beautiful portfolio layout',
    thumbnail: '🎨',
    blocks: [
      {
        type: 'navbar',
        content: {
          logoText: 'Portfolio',
          navLink1Label: 'Work',
          navLink1Href: '#work',
          navLink2Label: 'About',
          navLink2Href: '#about',
          navLink3Label: 'Services',
          navLink3Href: '#services',
          navLink4Label: 'Contact',
          navLink4Href: '#contact',
          ctaText: 'Hire Me',
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'Creative Designer & Developer',
          subheadline: 'I craft beautiful digital experiences that help brands connect with their audience.',
          buttonText: 'View My Work',
          buttonSecondary: 'Get in Touch',
        },
      },
      {
        type: 'imageGallery',
        content: {
          title: 'Selected Work',
          subtitle: 'A collection of projects I\'m proud of',
          image1Url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
          image1Caption: 'Brand Identity',
          image2Url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop',
          image2Caption: 'Web Design',
          image3Url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
          image3Caption: 'Mobile App',
        },
      },
      {
        type: 'features',
        content: {
          title: 'Services',
          subtitle: 'How I can help your business grow',
          feature1Title: 'Brand Design',
          feature1Desc: 'Creating memorable brand identities that resonate.',
          feature2Title: 'Web Development',
          feature2Desc: 'Building fast, responsive websites and applications.',
          feature3Title: 'UI/UX Design',
          feature3Desc: 'Designing intuitive user experiences.',
        },
      },
      {
        type: 'contact',
        content: {
          title: 'Let\'s Work Together',
          subtitle: 'Have a project in mind? I\'d love to hear about it.',
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'your@email.com',
          messagePlaceholder: 'Tell me about your project...',
          buttonText: 'Send Message',
        },
      },
      {
        type: 'footer',
        content: {
          brandName: 'Portfolio',
          description: 'Creating digital experiences since 2015.',
          col1Title: 'Social',
          col1Link1: 'Twitter',
          col1Link2: 'LinkedIn',
          col1Link3: 'Dribbble',
          col2Title: 'Contact',
          col2Link1: 'Email',
          col2Link2: 'Schedule Call',
          col2Link3: 'Location',
          copyright: '© 2024 All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'saas-product',
    name: 'SaaS Product',
    description: 'Perfect for showcasing your SaaS with pricing and features',
    thumbnail: '💼',
    blocks: [
      {
        type: 'navbar',
        content: {
          logoText: 'SaaSify',
          navLink1Label: 'Features',
          navLink1Href: '#features',
          navLink2Label: 'Pricing',
          navLink2Href: '#pricing',
          navLink3Label: 'FAQ',
          navLink3Href: '#faq',
          navLink4Label: 'Blog',
          navLink4Href: '#blog',
          ctaText: 'Start Free',
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'The Smarter Way to Manage Your Business',
          subheadline: 'Streamline operations, boost productivity, and grow faster with our all-in-one platform.',
          buttonText: 'Get Started Free',
          buttonSecondary: 'See How It Works',
        },
      },
      {
        type: 'features',
        content: {
          title: 'Powerful Features',
          subtitle: 'Everything you need to scale your business',
          feature1Title: 'Analytics Dashboard',
          feature1Desc: 'Real-time insights into your business performance.',
          feature2Title: 'Team Collaboration',
          feature2Desc: 'Work together seamlessly with built-in tools.',
          feature3Title: 'Automation',
          feature3Desc: 'Save time with intelligent workflow automation.',
        },
      },
      {
        type: 'pricing',
        content: {
          title: 'Simple, Transparent Pricing',
          subtitle: 'Choose the plan that fits your needs',
          plan1Name: 'Starter',
          plan1Price: '$19',
          plan1Features: '5 Users, 10GB Storage, Basic Support',
          plan2Name: 'Professional',
          plan2Price: '$49',
          plan2Features: '25 Users, 100GB Storage, Priority Support',
          plan2Badge: 'Most Popular',
        },
      },
      {
        type: 'faq',
        content: {
          title: 'Frequently Asked Questions',
          q1: 'How do I get started?',
          a1: 'Sign up for free and you can start using the platform immediately. No credit card required.',
          q2: 'Can I change plans later?',
          a2: 'Absolutely! You can upgrade or downgrade your plan at any time.',
          q3: 'What kind of support do you offer?',
          a3: 'We offer email support for all plans, with priority support for Professional and Enterprise customers.',
        },
      },
      {
        type: 'cta',
        content: {
          headline: 'Start Your Free Trial Today',
          description: 'No credit card required. Get started in minutes.',
          buttonText: 'Create Free Account',
          note: '14-day free trial',
        },
      },
      {
        type: 'footer',
        content: {
          brandName: 'SaaSify',
          description: 'Helping businesses grow since 2020.',
          col1Title: 'Product',
          col1Link1: 'Features',
          col1Link2: 'Pricing',
          col1Link3: 'Security',
          col2Title: 'Resources',
          col2Link1: 'Documentation',
          col2Link2: 'API',
          col2Link3: 'Status',
          copyright: '© 2024 SaaSify. All rights reserved.',
        },
      },
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Showcase your agency with team and services',
    thumbnail: '🏢',
    blocks: [
      {
        type: 'navbar',
        content: {
          logoText: 'Creative Co.',
          navLink1Label: 'Services',
          navLink1Href: '#services',
          navLink2Label: 'Work',
          navLink2Href: '#work',
          navLink3Label: 'Team',
          navLink3Href: '#team',
          navLink4Label: 'Contact',
          navLink4Href: '#contact',
          ctaText: 'Get Quote',
        },
      },
      {
        type: 'hero',
        content: {
          headline: 'We Create Digital Experiences',
          subheadline: 'Award-winning creative agency helping brands stand out in the digital world.',
          buttonText: 'Start a Project',
          buttonSecondary: 'Our Work',
        },
      },
      {
        type: 'features',
        content: {
          title: 'Our Services',
          subtitle: 'Full-service digital solutions',
          feature1Title: 'Strategy',
          feature1Desc: 'Data-driven strategies that deliver results.',
          feature2Title: 'Design',
          feature2Desc: 'Beautiful designs that captivate audiences.',
          feature3Title: 'Development',
          feature3Desc: 'Cutting-edge technology solutions.',
        },
      },
      {
        type: 'team',
        content: {
          title: 'Meet Our Team',
          subtitle: 'The talented people behind our success',
          member1Name: 'Alex Johnson',
          member1Role: 'CEO & Founder',
          member1Bio: 'Visionary leader with 15+ years of experience.',
          member1Photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
          member2Name: 'Sarah Chen',
          member2Role: 'Creative Director',
          member2Bio: 'Award-winning designer passionate about UX.',
          member2Photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
          member3Name: 'Michael Park',
          member3Role: 'Tech Lead',
          member3Bio: 'Full-stack engineer building scalable solutions.',
          member3Photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        },
      },
      {
        type: 'testimonials',
        content: {
          title: 'Client Love',
          quote1: 'Working with Creative Co. was a game-changer for our brand.',
          author1: 'Emma Wilson',
          role1: 'CMO, Fashion Brand',
          avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
          quote2: 'They exceeded all our expectations. Highly recommended!',
          author2: 'David Lee',
          role2: 'Founder, Startup',
          avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        },
      },
      {
        type: 'contact',
        content: {
          title: 'Let\'s Talk',
          subtitle: 'Ready to start your next project?',
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'your@email.com',
          messagePlaceholder: 'Tell us about your project...',
          buttonText: 'Send Message',
        },
      },
      {
        type: 'footer',
        content: {
          brandName: 'Creative Co.',
          description: 'Award-winning creative agency.',
          col1Title: 'Services',
          col1Link1: 'Branding',
          col1Link2: 'Web Design',
          col1Link3: 'Marketing',
          col2Title: 'Company',
          col2Link1: 'About',
          col2Link2: 'Careers',
          col2Link3: 'Press',
          copyright: '© 2024 Creative Co. All rights reserved.',
        },
      },
    ],
  },
];

export const instantiateTemplate = (template: ProjectTemplate): ComponentBlock[] => {
  return template.blocks.map((block) => ({
    ...block,
    id: generateId(),
  }));
};
