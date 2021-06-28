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
    Component?: (props: any) => JSX.Element;
    subDrawer?: Drawer;
}
export interface Element {
    name: string;
    value: any;
    drawer: Drawer;
    deepness: number;
    maxDeepness: number;
}
export interface ComponentsProps extends Element {
    deepness: number;
}
