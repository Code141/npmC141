# npmC141
C141's Personal React components utilities.  
Smalls, fasts, do only what they must, nothing less, nothing more.  
Can enjoyly work separatly, together, or separatly or together.

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

![Alt text](/images/print.jpg?raw=true "Title")

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

### TillingWindowManager
The main goal of the arbo is to stay serialised (can be store in anything, cookies, store, be passed throughout HTTP or sockets, etc... )  
Userfull if you want sync multiple screens or drag and drop a custom composition from a browser to another.  
There is a drag and drop separator between each window or group to resize groups.

Take in argument:  
- Arbo: description of (possibly nested) tilled window  
  with: direction (0: vertical, 1: horizontal), component name OR children, and the ratio in percent. 
- Window: object wich assosciate a window to a component (like here, possibly connected)

```javascript
import { TilingWindowManager } from "c141";

const windows = {
  logger: <ConnectedLogger />,
  Parameters: <ConnectedParameters />,
};

let serializedArbo = {
  debug: false,
  arbo: {
    direction: 0, ratio: 100,
    children: [
      { component: "logger", ratio: 30 },
      { direction: 1, ratio: 30,
        children: [
          { component: "logger", ratio: 60 },
          { direction: 0, ratio: 40,
            children: [
              { component: "logger", ratio: 40 },
              { component: "logger", ratio: 60 }
            ]
          }
        ]
      },
      { component: "Parameters", ratio: 40 }
    ]
  }
}

<TilingWindowManager
  arbo={serializedArbo}
  windows={windows}
  debug={false}
/>
```



