# npmC141
C141's Personal React components utilities.  
Smalls, fasts, do only what they must, nothing less, nothing more.  
Can enjoyly work separatly, together, or separatly or together.

### Print
Take any variable in argument (`Array`, `Object`, `String`, `Number`, or nested composition of each...)  
see documentation [here](src/Printer/README.md)
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
If you don't provide a drawer, the printer will use his own standard built-in drawer.


### TillingWindowManager
see documentation [here](src/Twm/README.md)


```javascript
import { TilingWindowManager } from "c141";

<TilingWindowManager
  arbo={serializedArbo}
  windows={windows}
  debug={false}
/>
```



