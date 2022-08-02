const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/sw-menu/shadow.css">
    <section>
        <ul>
            <li>
                <h3>Measure</h3>
                <nav>
                    <span>Add</span>
                    <span>Remove</span>
                </nav>
            </li>
            <li>
                <h3>Note</h3>
                <nav>
                    <span>Whole</span>
                    <span>Half</span>
                    <span>Quarter</span>
                </nav>
            </li>
            <li>
                <h3>Accidental</h3>
                <nav>
                    <span>Sharp</span>
                    <span>Flat</span>
                    <span>Natural</span>
                </nav>
            </li>
            <li>
                <h3>Rest</h3>
                <nav>
                    <span>Whole</span>
                    <span>Half</span>
                    <span>Quarter</span>
                </nav>
            </li>
            <li>
                <h3>Learn</h3>
                <nav>
                    <span>Piano Playing</span>
                    <span>Sight Reading</span>
                    <span>Ear Training</span>
                    <span>Rhythm Training</span>
                </nav>
            </li>
        </ul>
        <ul>
            <li>
                <label>Tempo: </label>
                <input />
            </li>
            <li>
                <span>▶️</span>
                <span>⏸</span>
                <span>⏹</span>
            </li>
            <li>
                <span>Ｘ</span>
                <span>⟲</span>
                <span>⟳</span>
            </li>
            <li>
                <span>🎹</span>
                <span>⌨️</span>
                <span>⎋</span>
            </li>
            <li>
                <span>🎤</span>
                <span>📷</span>
            </li>
        </ul>
    </section>
`;

export default template;