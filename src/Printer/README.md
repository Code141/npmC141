
### Print
Take any variable in argument (`Array`, `Object`, `String`, `Number`, or nested composition of each...)  
And recursively pass it as props to the assosciated component with a filter function.

```javascript
import { Print } from "c141";

let customDrawer = [
  {
    filter: (element: any) => element.value.constructor === Array,
    Component: PrintArray
  },
  {
    filter: (element: any) => element.value.constructor === Object,
    Component: PrintDictionary
  },
  {
    filter: () => true,
    Component: PrintOther
  },
];

<Print
  name={"My print"};
  value={};
  drawer={customDrawer};
  deepness={0};
  maxDeepness={10};
/>
```
If you don't provide a drawer, the printer will use his own standard built-in drawer.
Here an example of standard built-in drawer render :

![Alt text](../../images/print.jpg?raw=true "Title")

With this color palette
 
```javascript
$colorGrey: #939395;
$colorGreen: #86de74;
$colorBlue: #75bfff;
$colorDarkgBlue: #232327;
$colorPink: #ff7de9;
```
TODO:
- In the future, it will provide you a way to override color palette with your own theme.  
- Add to standar drawer more renderers componants to handle objects types like arrayBuffer, hexDump with 'addOffset|Hex|acii', splice long string preview with ellipsis to avert you the text was trunkated, more precise type like add a n at the end of a number if it's a bigInt etc.
- Integrate a popup converter to tracduct all js primitive types in all possibilities dec, hex, html entity hec, html entity dec....
- I will add loop detector in case of circular referance, you could choose to display a component that avert that it won't print current object because he has been already draw and set an onClick option to jump to it.
- Implement a preview of child into the {} [], when the current object is folded, just as the real Mozilla devtool printer.
