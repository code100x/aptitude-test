import {
  ArrowRight,
  BookOpen,
  Clock,
  Globe,
  MedalIcon,
  Library,
  LucideIcon,
  HomeIcon,
  MailQuestion,
} from 'lucide-react'

export const applicationName = '100xDevs'

export const afterLoginUrl = '/'

export const ARGON2_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export const navbarLinks = [
  { name: 'Available Exams', href: '/available-exams' },
  { name: 'Results', href: '/user-results' },
]

export const features = [
  {
    icon: Clock,
    title: 'Anytime, Anywhere',
    description:
      'Take exams at your convenience, 24/7. Our platform is always available for your learning needs.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Content',
    description:
      "Our exams cover a wide range of topics, ensuring you're well-prepared for real-world challenges.",
  },
  {
    icon: Globe,
    title: 'Global Community',
    description:
      'Connect with developers worldwide, share experiences, and grow together.',
  },
  {
    icon: ArrowRight,
    title: 'Continuous Learning',
    description:
      'Our platform adapts to your progress, offering increasingly challenging exams as you improve.',
  },
]

export const cohort_lists = [
  {
    title: 'Complete web development cohort',
    image:
      'https://framerusercontent.com/images/CtlhG4fQbAW4wlevCRMdfCjE.webp?scale-down-to=512',
    link: 'https://harkirat.classx.co.in/new-courses/15-complete-web-development-cohort',
  },
  {
    title: 'Complete Web development + Devops',
    image:
      'https://framerusercontent.com/images/81pF2kh8PJLzPDmIvVR8QOioks.png?scale-down-to=512',
    link: 'https://harkirat.classx.co.in/new-courses/12-complete-web-development-devops-cohort',
  },
  {
    title: 'Complete Web3/Blockchain',
    image:
      'https://framerusercontent.com/images/SXS9VsLLyqtTZPcilolqkjWkUOg.webp?scale-down-to=512',
    link: 'https://harkirat.classx.co.in/new-courses/13-complete-web3-blockchain-cohort',
  },
  {
    title: 'Complete Web Development + Devops + Blockchain',
    image:
      'https://framerusercontent.com/images/XUh6mGebzVy9F66ZtVIImQFfR4.png?scale-down-to=512',
    link: 'https://harkirat.classx.co.in/new-courses/14-complete-web-development-devops-blockchain-cohort',
  },
  {
    title: 'DevOps',
    image:
      'https://framerusercontent.com/images/mU2dusENfcJqAT3DrdwXU87FbxI.png?scale-down-to=512',
    link: 'https://harkirat.classx.co.in/new-courses/16-complete-devops-cohort',
  },
]

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  const menuList: Group[] = [
    {
      groupLabel: '',
      menus: [
        {
          href: '/',
          label: 'Home',
          active: pathname === '/',
          icon: HomeIcon,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Menu',
      menus: [
        {
          href: '/available-exams',
          label: 'Available Exams',
          active: pathname === '/available-exams',
          icon: Library,
          submenus: [],
        },
        {
          href: '/user-results',
          label: 'Results',
          active: pathname === '/user-results',
          icon: MedalIcon,
          submenus: [],
        },
        {
          href: '/question-bank',
          label: 'Question Bank',
          active: pathname === '/question-bank',
          icon: MailQuestion,
          submenus: [],
        },
      ],
    },
  ]
  return menuList
}
