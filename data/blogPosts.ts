export const BLOG_POSTS = [
  {
    id: '1',
    titleKey: 'blogs.titles.laborLawChanges',
    descriptionKey: 'blogs.descriptions.laborLawChanges',
    content: 'blogs.content.laborLawChanges',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    category: 'legal_updates',
    slug: 'labor-law-changes-2025',
    readingTime: '5',
    date: '2024-03-20',
    author: {
      name: 'Dr. Ahmed Hassan',
      title: 'Labor Law Expert',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800'
    },
    tags: ['labor_law', 'legal_updates', 'employment'],
    relatedPosts: ['2', '3']
  },
  {
    id: '2',
    titleKey: 'blogs.titles.businessRegistration',
    descriptionKey: 'blogs.descriptions.businessRegistration',
    content: 'blogs.content.businessRegistration',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    category: 'business_law',
    slug: 'understanding-business-registration',
    readingTime: '7',
    date: '2024-03-19',
    author: {
      name: 'Sarah Ahmed',
      title: 'Business Law Specialist',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800'
    },
    tags: ['business_law', 'company_registration', 'startups'],
    relatedPosts: ['1', '3']
  },
  {
    id: '3',
    titleKey: 'blogs.titles.propertyRights',
    descriptionKey: 'blogs.descriptions.propertyRights',
    content: 'blogs.content.propertyRights',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    category: 'property_law',
    slug: 'property-rights-guide',
    readingTime: '6',
    date: '2024-03-18',
    author: {
      name: 'Leila Mahmoud',
      title: 'Property Law Expert',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800'
    },
    tags: ['property_law', 'real_estate', 'legal_guide'],
    relatedPosts: ['1', '2']
  }
];

export type BlogPost = typeof BLOG_POSTS[0]; 