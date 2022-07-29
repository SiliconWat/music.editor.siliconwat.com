import { SwMenu } from "/components/sw-menu/element.mjs";
customElements.define("sw-menu", SwMenu);

import { SwEditor } from "/components/sw-editor/element.mjs";
customElements.define("sw-editor", SwEditor);

import { SwPiano } from "/components/sw-piano/element.mjs";
customElements.define("sw-piano", SwPiano);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KBM8RKHJKC');