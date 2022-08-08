import {CodeMajor} from '@shopify/polaris-icons';

export const LOGO_ALI_REVIEWS = 'https://cdn1.avada.io/joy/alireview-logo.jpeg';
export const LOGO_RYVIU = 'https://cdn1.avada.io/joy/ryviu-logo.png';
export const LOGO_JUDGE_ME = 'https://cdn1.avada.io/joy/judgeme-logo.png';
export const LOGO_AVADA = 'https://cdn1.avada.io/joy/avada-logo.png';
export const LOGO_LOOT = 'https://cdn1.avada.io/joy/loox-logo.png';
export const LOGO_YOTPO = 'https://cdn1.avada.io/joy/yotpo-logo-v3.svg';
export const LOGO_STAMPED = 'https://cdn1.avada.io/joy/stamped-logo.svg';
export const LOGO_PAGE_FLY = 'https://cdn1.avada.io/joy/page_fly.webp';

export const INTEGRATION_CATEGORY_THEME = 'theme';
export const INTEGRATION_CATEGORY_AVADA_MARKETING = 'avada marketing';
export const INTEGRATION_CATEGORY_PRODUCT_REVIEW = 'product reviews';
export const INTEGRATION_CATEGORY_PAGE_BUILDERS = 'page builders';

export const integrationCategories = [
  {value: INTEGRATION_CATEGORY_THEME, label: 'Theme Integration'},
  {value: INTEGRATION_CATEGORY_AVADA_MARKETING, label: 'avada marketing'},
  {value: INTEGRATION_CATEGORY_PRODUCT_REVIEW, label: 'page builders'},
  {value: INTEGRATION_CATEGORY_PAGE_BUILDERS, label: 'product reviews'}
];

export const integrationApps = [
  {
    title: 'Theme Integration',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    url: '/integration/theme',
    icon: CodeMajor,
    button: 'Add points to your store',
    category: INTEGRATION_CATEGORY_THEME
  },
  {
    title: 'AVADA Marketing Automation',
    description: `Turn visitors into loyal customers by personalizing their journeys.`,
    img: LOGO_AVADA,
    button: 'Coming soon',
    status: 'disable',
    category: INTEGRATION_CATEGORY_AVADA_MARKETING
  },
  {
    title: 'Air Reviews',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    img: LOGO_AVADA,
    button: 'Coming soon',
    status: 'disable',
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Judge.me',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    url: '/integration/review/app/judgeme',
    img: LOGO_JUDGE_ME,
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Ryviu',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    img: LOGO_RYVIU,
    button: 'Coming soon',
    status: 'disable',
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Ali Reviews',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    button: 'Coming soon',
    status: 'disable',
    img: LOGO_ALI_REVIEWS,
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Loox',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    img: LOGO_LOOT,
    button: 'Coming soon',
    status: 'disable',
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Yotpo',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    img: LOGO_YOTPO,
    url: '/integration/review/app/yopto',
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW
  },
  {
    title: 'Stamped',
    description: `Show customers’ reward points on the My Account page, Navigation menu, etc.`,
    img: LOGO_STAMPED,
    category: INTEGRATION_CATEGORY_PRODUCT_REVIEW,
    button: 'Coming soon',
    status: 'disable'
  },
  {
    title: 'PageFly',
    description: 'Integrate to show reward popup to any PageFly',
    img: LOGO_PAGE_FLY,
    url: '/integration/pageFly',
    category: INTEGRATION_CATEGORY_PAGE_BUILDERS
  }
]
  .filter(x => !x.disabled)
  .sort(function(a, b) {
    if (!a.status && !b.status) if (!a.status) return 0;
    if (!a.status) return -1;
    if (!b.status) return 1;
    return 0;
  });
