const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-player/shadow.css">
    <ul>
        <li><input placeholder="Tempo"></li>
        <li>▶️</li>
        <li>⏸</li>
        <li>⏹</li>
        <li>Ｘ</li>
        <li>⟲</li>
        <li>⟳</li>
    </ul>
`;

export default template;