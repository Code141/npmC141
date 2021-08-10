/// <reference types="react" />
import "./style.scss";
import { Element } from "./Types";
interface FoldProps extends Element {
    open: () => JSX.Element;
    close: () => JSX.Element;
    body: () => JSX.Element;
}
export declare function Fold(props: FoldProps): JSX.Element;
declare function PrintDictionary(props: Element): JSX.Element;
declare function PrintArray(props: Element): JSX.Element;
export declare const DrawerDebug: (props: any) => JSX.Element;
export declare const Pencils: (props: any) => JSX.Element;
export { PrintDictionary, PrintArray };
