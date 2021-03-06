# npmC141
C141's Personal React components utilities.  
Smalls, fasts, do only what they must, nothing less, nothing more.  
Can enjoyly work separatly, together, or separatly, or together.

### Print
Take any variable in argument (`Array`, `Object`, `String`, `Number`, or nested composition of each...)  
If you don't provide a drawer, the printer will use his own standard built-in drawer.  

Full documentation [here](src/Printer/README.md)
```javascript
import { Print } from "c141";

<Print
  name={"My print"};
  value={objToPrint};
  drawer={};
  deepness={0};
  maxDeepness={10};
/>
```


### Twm
A Tiling Window Manager with an organization of the screen into mutually non-overlapping frames.
Give him a serialised description of what component must be desplayed where, ratio of each, and will print it in concatened in resizeable groups.

Full documentation [here](src/Twm/README.md)
```javascript
import { TilingWindowManager } from "c141";

<TilingWindowManager
  arbo={serializedArbo}
  windows={windows}
  debug={false}
/>
```



