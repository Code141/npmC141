# npmC141
C141's Personal React components utilities.  
Smalls, fasts, do only what they must, nothing less, nothing more.  
Can enjoyly work separatly, together, or separatly, or together.  
Feel free to Create issues if you find a bug, need something be implemented, or you'v got an idea.

### Print
Take any variable in argument (`Array`, `Object`, `String`, `Number`, or nested composition of each...)  
If you don't provide a drawer, the printer will use his own standard built-in drawer.  

Full documentation here [PRINT README](src/Printer/README.md)
```javascript
import { Print } from "c141";

<Print
  value={objToPrint};
  drawer={};
  deepness={0};
  maxDeepness={10};
/>
```


### Twm
A Tiling Window Manager with an organization of the screen into mutually non-overlapping frames.  
Give him a serialised description of what component must be desplayed where, ratio of each, vertical or horizontal split, and will print it in concatened in resizeable groups.

Full documentation here [TWM README](src/Twm/README.md)
```javascript
import { TilingWindowManager } from "c141";

<TilingWindowManager
  arbo={serializedArbo}
  windows={windows}
  debug={false}
/>
```

### Log -TO CLEAN/PUSH-
Formated logger  


#TODO!

### Cbsoo
Coordinate-based stacking of overlapping objects (windows) that tries to fully emulate the desktop metaphor. 

### Win
Wrap a component into a Window. Can be inserted in Cbsoo or Twm.
Provide own dimention to parents and children. Support winBar to display information or menu, resize, close.  

### DandG
DragAndDrop components wrapper  
```javascript
import { DandG } from "c141";

<DandG
  list={new Array(1000)}
  Offset={0}
  length={0}
/>
```

### LazyList
List wrapper, render chunks of list, scroll detector to only render what's necessary

```javascript
import { LazyList } from "c141";

<LazyList
  list={}
  Offset={0}
  length={0}
/>

```
