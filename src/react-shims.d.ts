declare namespace React {
  interface ChangeEvent<T = Element> {
    target: T;
    currentTarget: T;
  }

  interface FormEvent<T = Element> {
    preventDefault(): void;
    currentTarget: T;
    target: EventTarget;
  }
}

declare namespace JSX {
  interface IntrinsicAttributes {
    key?: unknown;
  }

  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

declare module 'react' {
  export function StrictMode(props: { children?: unknown }): unknown;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useRef<T = unknown>(initialValue: T): { current: T };
  export function useState<T>(initialValue: T): [T, (value: T | ((previous: T) => T)) => void];
}

declare module 'react/jsx-runtime' {
  export const Fragment: unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): { render(children: unknown): void };
}
