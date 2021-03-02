# npmC141
React utilities lib

### Print

```javascript
import { Print } from "c141";

let customDrawer = [
  {
    filter: (element: any) => element.value.constructor === Array,
    Component: PrintArray,
  },
  {
    filter: (element: any) => element.value.constructor === Object,
    Component: PrintDictionary,
  },
  {
    filter: () => true,
    Component: PrintOther,
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

### TillingWindowManager

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

<ConnectedTilingWindowManager
  arbo={serializedArbo}
  windows={windows}
  debug={false}
/>
```



