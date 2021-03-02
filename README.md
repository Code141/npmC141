# npmC141

```javascript
import { Print } from "c141";
```

```javascript
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


```javascript
import { TilingWindowManager } from "c141";
```

```javascript
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



