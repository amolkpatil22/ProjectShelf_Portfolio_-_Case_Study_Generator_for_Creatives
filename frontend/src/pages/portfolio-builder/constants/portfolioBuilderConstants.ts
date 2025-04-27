import { ThemeSettings, CaseStudy } from '../types/portfolioBuilderTypes';

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
    primaryColor: '#3358FF',
    fontFamily: 'Inter',
    layout: 'minimal',
};

export const DEFAULT_CASE_STUDIES: CaseStudy[] = [
    {
        id: '1',
        title: 'E-Commerce Website Redesign',
        description: 'Complete redesign of an online retail platform',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        category: 'UX Design',
        tools: ['Figma', 'React', 'Node.js'],
        challenge: 'The client needed to improve their conversion rate and user engagement.',
        solution: 'Implemented a new user-centered design with improved navigation and checkout flow.',
        outcome: 'Increased conversions by 47% and reduced cart abandonment by 30%.',
        images: ['https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg'],
        videoLinks: [],
        timeline: [
            {
                date: '2023-01-15',
                title: 'Project Kickoff',
                description: 'Initial meeting with client to discuss requirements'
            },
            {
                date: '2023-02-01',
                title: 'Research Phase',
                description: 'User research and competitor analysis completed'
            },
            {
                date: '2023-03-15',
                title: 'Design Phase',
                description: 'Wireframes and mockups approved'
            },
            {
                date: '2023-04-30',
                title: 'Development',
                description: 'Implementation of new design and features'
            },
            {
                date: '2023-05-15',
                title: 'Launch',
                description: 'Website successfully launched with new design'
            }
        ]
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        description: 'Secure and intuitive mobile banking solution',
        image: 'https://images.pexels.com/photos/6804065/pexels-photo-6804065.jpeg',
        category: 'Development',
        tools: ['React Native', 'TypeScript', 'Firebase'],
        challenge: 'Create a secure yet user-friendly mobile banking experience.',
        solution: 'Built a React Native app with biometric authentication and real-time transactions.',
        outcome: 'App store rating of 4.8/5 with 100,000+ downloads.',
        images: [],
        videoLinks: [],
        timeline: []
    },
    {
        id: '3',
        title: 'Brand Identity System',
        description: 'Comprehensive branding for a tech startup',
        image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg',
        category: 'Branding',
        tools: ['Illustrator', 'Photoshop', 'InDesign'],
        challenge: 'Develop a unique brand identity that stands out in the tech space.',
        solution: 'Created a modern, versatile brand system with distinctive visual elements.',
        outcome: 'Successfully launched brand with 95% positive feedback from stakeholders.',
        images: [],
        videoLinks: [],
        timeline: []
    }
]; 