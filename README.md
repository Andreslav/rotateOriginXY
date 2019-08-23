# rotateOriginXY
A function for rotating nodes relative to a given point, which is specified by an offset from the upper left corner.


## Example
```
const nodes = figma.currentPage.selection;
rotateOriginXY(nodes, 45, 100, 10);
rotateOriginXY(nodes, 45, .5, 0, "%", "px");
rotateOriginXY(nodes, 45, 1, 0, "%", "%");
```
