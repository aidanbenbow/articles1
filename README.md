Basic app using a custom canvas engine to load reports up to a database.

server => index.html > index.js > main.js (bootstrap = create engine, call engine mount method)

engine mount calls attach methods on modules:

command -> log
render -> set canvas, layout done message
scene -> creates root, emits added
layout => nodeadded message, runlayout

runlayout:
root measure => create root behav inst





