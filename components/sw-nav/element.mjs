import template from './template.mjs';

export class SwNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.createTemplate();
    }

    createTemplate() {
        const ul = this.shadowRoot.querySelector('ul');
        let menu = 0;
        let submenu = 1;
        let li = null;
        let nav = null;

        for (let element of this.children) {
            if (element.tagName === 'H3') {
                li = document.createElement('li');
                const slot = document.createElement('slot');
                slot.name = `menu${++menu}`;
                li.append(slot);
                ul.append(li);
            } else if (element.tagName === 'SPAN') {
                if (element.previousElementSibling.tagName === 'H3') {
                    nav = document.createElement('nav');
                    li.append(nav);
                    submenu = 1;
                } 
                const slot = document.createElement('slot');
                slot.name = `menu${menu}-sub${submenu++}`;
                nav.append(slot);
            }
        }
    }
}