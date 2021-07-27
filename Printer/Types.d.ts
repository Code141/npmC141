/// <reference types="react" />
export interface Print {
    name?: string;
    value: any;
    drawer?: Drawer;
    maxDeepness?: number;
}
export declare type Drawer = Pencil[];
export interface Pencil {
    filter: (element: Element) => true | false;
    component?: (props: Element, print: (value: Element) => JSX.Element | null) => JSX.Element;
    subDrawer?: Drawer;
    wrapper?: (children: JSX.Element) => JSX.Element;
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
