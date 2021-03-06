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
By default, if any drawer is provided, the printer will use his own standard built-in drawer, stylised as :
![Alt text](/images/print.jpg?raw=true "Title")

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



