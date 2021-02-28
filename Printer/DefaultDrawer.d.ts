/// <reference types="react" />
import "./style.scss";
declare let defaultDrawer: {
    filter: (element: any) => boolean;
    Component: typeof PrintArray;
}[];
declare function PrintArray(props: any): JSX.Element;
export default defaultDrawer;
