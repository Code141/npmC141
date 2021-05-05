/// <reference types="react" />
import "./style.scss";
interface Print {
    value: any;
    name?: string;
    drawer?: any;
    maxDeepness?: number;
}
declare function Print(props: Print): JSX.Element;
export default Print;
