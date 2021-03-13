/// <reference types="react" />
import "./style.scss";
interface PrintProps {
    name: string;
    value: any;
    drawer: any;
    maxDeepness: number;
}
declare function Print(props: PrintProps): JSX.Element;
export default Print;
