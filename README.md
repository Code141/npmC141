# npmC141

C141's Personal React components utilities.  
Smalls, fasts, do only what they must, nothing less, nothing more.  
Can enjoyly work separatly, together, or separatly, or together.  
Feel free to Create issues if you find a bug, need something be implemented, or you'v got an idea.

### Print

Take any variable in argument (`Array`, `Object`, `String`, `Number`, or nested composition of each...)  
If you don't provide a drawer, the printer will use his own standard built-in drawer.

Full documentation here [PRINT README](https://github.com/Code141/npmC141/blob/master/src/Printer/README.md)

```javascript
import { Print } from "react-c141";

<Print
  value={objToPrint};
  maxDeepness={10};
/>
```

### Twm

A Tiling Window Manager with an organization of the screen into mutually non-overlapping frames.  
Give him a serialised description of what component must be desplayed where, ratio of each, vertical or horizontal split, and will print it in concatened in resizeable groups.

Full documentation here [TWM README](https://github.com/Code141/npmC141/blob/master/src/Twm/README.md)

```javascript
import { TilingWindowManager } from "react-c141";

<TilingWindowManager arbo={serializedArbo} windows={windows} debug={false} />;
```

### Log

Log print you a list of logs

```javascript
import { Log } from "react-c141";

<Log logs={} channels={} types={} />;
```

# COMING SOON -------------------------------------------------

### Cwm

Coordinate-based stacking of overlapping windows manager.

### Win

Wrap a component into a Window. Can be inserted in Cbsoo or Twm.
Provide own dimention to parents and children.
Support winBar to display information or menu, resize, close.

### DandG

DragAndDrop components wrapper

```javascript
import { DandG } from "react-c141";

<DandG component={} />;
```

### LazyList

List wrapper, render chunks of list, scroll detector to only render what's necessary

```javascript
import { LazyList } from "react-c141";

<LazyList
  list={new Array(100).map((i) => (
    <div>i</div>
  ))}
  Offset={10}
  length={10}
/>;
```

# IDEAS ! ------------------------------------------------------
-lightweight notification daemon  
-DASHBOARD / WIDGET

-CHEAT SHEET
When keypress <LEADER> for 2sec without any other key event, shadow screen and display general basic cheatsheet.
Each keybinded element must provide his own cheatsheet to the global man. On mouseover an element, make it bright and display only his related keyEvents on the cheatsheet.
