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
    { name: 'Launch', type: 'For founders and new ventures', detail: 'MVP strategy, UX/UI, engineering, launch', color: 'violet', mark: 'L' },
    { name: 'Modernise', type: 'For established product teams', detail: 'Architecture, redesign, cloud, performance', color: 'lime', mark: 'M' },
    { name: 'Automate', type: 'For operations-heavy businesses', detail: 'AI workflows, integrations, internal tools', color: 'orange', mark: 'A' },
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
  contact: {
    email: 'hello@logicforge.example',
    phone: '+91 90000 00000',
    location: 'Bengaluru, Karnataka · Working worldwide',
    address: '42 Innovation Road, Indiranagar, Bengaluru 560038',
    availability: 'Available for projects starting August 2026',
  },
}
