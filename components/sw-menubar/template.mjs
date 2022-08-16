import { ORIGIN } from "/library/music.mjs";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${ORIGIN}/components/sw-menubar/shadow.css">
    <slot></slot>
`;

export default template;