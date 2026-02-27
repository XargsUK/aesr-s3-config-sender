declare module 'lucide' {
  export interface IconNode {
    tag: string;
    attrs?: Record<string, string>;
    children?: IconNode[];
  }

  export interface Icon {
    name: string;
    tags: string[];
    toSvg(attrs?: Record<string, string>): string;
  }

  export interface CreateIconsOptions {
    icons?: Record<string, Icon>;
    nameAttr?: string;
    attrs?: Record<string, string>;
    root?: HTMLElement;
  }

  export function createIcons(options?: CreateIconsOptions): void;

  // Named icon exports (selective imports for tree-shaking)
  export const AlertCircle: Icon;
  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const Check: Icon;
  export const CheckCircle: Icon;
  export const ChevronDown: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Clock: Icon;
  export const Copy: Icon;
  export const Download: Icon;
  export const DownloadCloud: Icon;
  export const Edit: Icon;
  export const FileText: Icon;
  export const Github: Icon;
  export const Heart: Icon;
  export const Plus: Icon;
  export const RefreshCw: Icon;
  export const Save: Icon;
  export const Settings: Icon;
  export const Settings2: Icon;
  export const Star: Icon;
  export const Trash2: Icon;
  export const Upload: Icon;
  export const UploadCloud: Icon;
  export const UserPlus: Icon;
  export const X: Icon;

  export const icons: Record<string, Icon>;
}
