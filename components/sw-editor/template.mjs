const origin = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5508" : "https://music.siliconwat.com";
const template = document.createElement("template");
// todo: use slot???
template.innerHTML = `
    <link rel="stylesheet" href="${origin}/components/sw-editor/sheets.css">
    <link rel="stylesheet" href="${origin}/components/sw-editor/notes.css">
    <section>
        <ol></ol>
        <ol>
            <li>
                <div class="note whole c5">
                    <span class="sharp"></span>
                </div>
            </li>
            <li>
                <div class="note half c5 stem down">
                    <span class="natural"></span>
                </div>
            </li>
            <li>
                <div class="note quarter c4 stem up">
                    <span class="flat"></span>
                </div>
            </li>
            <li>
                <div class="note half c6 stem down">
                    <span class="sharp"></span>
                </div>
            </li>
        </ol>
        <ol>
            <li>
                <div class="rest whole"></div>
            </li>
            <li>
                <div class="rest half"></div>
            </li>
            <li>
                <div class="rest quarter"></div>
            </li>
            <li>
                <div class=""></div>
            </li>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
        <ol>
        </ol>
    </section>
`;

export default template;