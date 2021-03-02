# npmC141

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



