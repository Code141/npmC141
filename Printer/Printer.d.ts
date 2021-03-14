/// <reference types="react" />
import "./style.scss";
interface Print {
    name?: string;
    value: any;
    drawer?: any;
    maxDeepness: number;
}
declare function Print(props: Print): JSX.Element;
export default Print;
