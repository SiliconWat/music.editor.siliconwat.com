const origin = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5508" : "https://music.siliconwat.com";
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${origin}/components/sw-menubar/shadow.css">
    <slot></slot>
`;

export default template;