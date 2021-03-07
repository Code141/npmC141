/// <reference types="react" />
import "./style.scss";
declare let defaultDrawer: {
    filter: (element: any) => boolean;
    Component: (props: any, loop: any) => JSX.Element;
}[];
declare let previewArray: {
    filter: (element: any) => boolean;
    Component: (props: any) => JSX.Element;
}[];
declare let previewObject: {
    filter: (element: any) => boolean;
    Component: (props: any) => JSX.Element;
}[];
export { defaultDrawer, previewArray, previewObject };
