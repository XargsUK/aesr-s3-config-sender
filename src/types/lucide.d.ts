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
  }

  export function createIcons(options?: CreateIconsOptions): void;

  export const icons: {
    Settings: Icon;
    RefreshCw: Icon;
    FileText: Icon;
    Heart: Icon;
    Github: Icon;
    AlertCircle: Icon;
    ArrowRight: Icon;
    ArrowLeft: Icon;
    ChevronRight: Icon;
    ChevronLeft: Icon;
    ChevronDown: Icon;
    Check: Icon;
    X: Icon;
    Download: Icon;
    Upload: Icon;
    Save: Icon;
    Trash: Icon;
    Home: Icon;
    FileInput: Icon;
    FileOutput: Icon;
    Info: Icon;
  };
}
