
### TillingWindowManager
The main goal of the arbo is to stay serialised (so can be store in anywhere, cookies, store, be passed throughout HTTP or websockets, webworker etc... )  
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

TODO
  - permeit inject CSS
  - margin on window (like i3-wm-gaps)
  - provide shortcuts to move window (need css to visualise which window is selected)
  - Lock resizing (then hide separator)
  - permeit tilled drag and drop
