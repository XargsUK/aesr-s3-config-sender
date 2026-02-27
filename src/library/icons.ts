import {
  createIcons,
  Settings,
  RefreshCw,
  FileText,
  Heart,
  Github,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  X,
} from 'lucide';

const iconNames = {
  settings: Settings,
  'refresh-cw': RefreshCw,
  'file-text': FileText,
  heart: Heart,
  github: Github,
  'alert-circle': AlertCircle,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'chevron-down': ChevronDown,
  check: Check,
  x: X,
  alert: AlertCircle,
};

// Initialize icons
createIcons({
  icons: iconNames,
  nameAttr: 'data-lucide',
  attrs: {
    'stroke-width': '2',
    class: 'icon',
  },
});

// Helper function to create an icon element
export function createIconElement(name: IconName): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'icon-wrapper';

  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', name);
  span.appendChild(icon);

  // Initialize this specific icon
  createIcons({
    icons: { [name]: iconNames[name] },
    nameAttr: 'data-lucide',
  });

  return span;
}

// Export icon names for type safety
export type IconName = keyof typeof iconNames;
