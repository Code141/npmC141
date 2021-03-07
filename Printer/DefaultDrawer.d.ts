/// <reference types="react" />
import "./style.scss";
declare let defaultDrawer: {
    filter: (element: any) => boolean;
    Component: (props: any, loop: any) => JSX.Element;
}[];
export default defaultDrawer;
