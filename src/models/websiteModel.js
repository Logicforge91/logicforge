export const websiteModel = {
  company: {
    name: 'LogicForge',
    tagline: 'Ideas, engineered.',
    description: 'A product engineering studio helping growing businesses design, build, and modernise digital products.',
  },
  services: [
    {
      number: '01',
      title: 'Product engineering',
      text: 'From first sketch to production scale, we design and build digital products people want to use.',
      icon: 'code',
    },
    {
      number: '02',
      title: 'AI & automation',
      text: 'We turn your workflows into intelligent systems that move faster, learn, and create leverage.',
      icon: 'sparkles',
    },
    {
      number: '03',
      title: 'Digital transformation',
      text: 'Modern architecture, connected data, and focused strategy for companies ready for what is next.',
      icon: 'zap',
    },
  ],
  engagements: [
    { name: 'Launch', type: 'For founders and new ventures', detail: 'MVP strategy, UX/UI, engineering, launch', image: '/images/engagement-launch.png', alt: 'Product team reviewing a newly designed web application in a bright studio' },
    { name: 'Modernise', type: 'For established product teams', detail: 'Architecture, redesign, cloud, performance', image: '/images/engagement-modernise.png', alt: 'Software engineer reviewing a complex modern platform architecture across multiple screens' },
    { name: 'Automate', type: 'For operations-heavy businesses', detail: 'AI workflows, integrations, internal tools', image: '/images/engagement-automate.png', alt: 'Operations professional monitoring automated business workflows and connected dashboards' },
  ],
  capabilities: [
    { value: 'Web', label: 'React and modern web platforms' },
    { value: 'API', label: 'Secure services and integrations' },
    { value: 'Cloud', label: 'Scalable deployment and operations' },
    { value: 'AI', label: 'Practical automation and intelligence' },
  ],
  process: [
    { number: '01', title: 'Discover', text: 'We get to the heart of the problem.' },
    { number: '02', title: 'Define', text: 'We align the product, people, and path.' },
    { number: '03', title: 'Build', text: 'We design and engineer in tight loops.' },
    { number: '04', title: 'Scale', text: 'We launch, learn, and keep improving.' },
  ],
  faqs: [
    {
      question: 'What kinds of projects does LogicForge take on?',
      answer: 'We focus on web platforms, customer portals, internal business systems, AI-enabled workflows, and modernisation of existing software.',
    },
    {
      question: 'Can you work with our existing product team?',
      answer: 'Yes. We can own a defined delivery stream or work alongside your design, engineering, and operations teams with shared planning and documentation.',
    },
    {
      question: 'How does a typical engagement begin?',
      answer: 'We start with a short discovery call, review the business problem and current systems, then propose a practical scope, delivery plan, and milestones.',
    },
    {
      question: 'Do you provide support after launch?',
      answer: 'Yes. Ongoing support can include monitoring, maintenance, security updates, performance improvements, and a planned product roadmap.',
    },
  ],
  contact: {
    email: 'hello@logicforge.example',
    phone: '+91 90000 00000',
    location: 'Bengaluru, Karnataka · Working worldwide',
    address: '42 Innovation Road, Indiranagar, Bengaluru 560038',
    availability: 'Available for projects starting August 2026',
  },
}
