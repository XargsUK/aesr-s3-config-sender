import { createIcons, icons } from 'lucide';

// Initialize all icons we need
const iconNames = {
  settings: icons.Settings,
  'refresh-cw': icons.RefreshCw,
  'file-text': icons.FileText,
  heart: icons.Heart,
  github: icons.Github,
  'alert-circle': icons.AlertCircle,
  'arrow-right': icons.ArrowRight,
  'arrow-left': icons.ArrowLeft,
  'chevron-right': icons.ChevronRight,
  'chevron-left': icons.ChevronLeft,
  'chevron-down': icons.ChevronDown,
  check: icons.Check,
  x: icons.X,
  alert: icons.AlertCircle,
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
