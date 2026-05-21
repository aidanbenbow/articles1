Basic app using a custom canvas engine to load reports up to a database.

server => index.html > index.js > main.js (bootstrap = create engine, call engine mount method)

engine mount calls attach methods on modules:

command -> log
render -> set canvas, layout done message
scene -> creates root, emits added
layout => nodeadded message, runlayout

runlayout:
root measure => create root behav inst


2. Add FlexContainer behavior

Parent assigns child rects.

3. Change _layout

From:

_layout(node)

To:

_layout(node, rect)
4. Store final child rects centrally
_layoutById.set(id, rect)
Minimal Future API
measure(node, constraints)

layout(node, rect)

render(node)

That becomes a real UI engine foundation.


