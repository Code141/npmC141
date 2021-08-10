export interface Print {
  name?: string;
  value: any;
  drawer?: Drawer;
  maxDeepness?: number;
}

export interface Drawer {
  drawerName: string;
  pencils: { [pencilName: string]: Pencil{} };
}

export interface Pencil {
  filter?: (element: Element) => true | false;
  component?: (
    props: Element,
    print?: (value: Element) => JSX.Element | null
  ) => JSX.Element;

  subDrawer?: Drawer;
}

export interface Element {
  name: string;
  value: any;

  drawer: Drawer;
  mainDrawer: Drawer;

  deepness: number;
  maxDeepness: number;

  print?: (props: Element) => JSX.Element;
  selectDrawer: (E: any) => any;
}
