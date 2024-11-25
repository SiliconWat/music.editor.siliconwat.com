import "/components/sw-body/element.mjs"; // may need to be last
import "/components/sw-nav/element.mjs";
import "/components/sw-menubar/element.mjs";
import "/components/sw-player/element.mjs";
import "/components/sw-instrument/element.mjs";
import "/components/sw-history/element.mjs";
import "/components/sw-editor/element.mjs";
import "/components/sw-piano/element.mjs";

window.onload = async () => {
    const origin = window.location.hostname === '127.0.0.1' ? "http://127.0.0.1:5660" : "https://music.siliconwat.dev";
    await import(`${origin}/components/sw-nav/element.mjs`);
    await import(`${origin}/components/sw-menubar/element.mjs`);
    await import(`${origin}/components/sw-instrument/element.mjs`);
    await import(`${origin}/components/sw-editor/element.mjs`);
    await import(`${origin}/components/sw-piano/element.mjs`);
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KBM8RKHJKC');