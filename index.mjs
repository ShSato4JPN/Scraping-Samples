import fetch from 'node-fetch';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

(async () => {
    const res = await fetch('https://tenshoku.mynavi.jp/shutoken/list/o14/');
    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const nodes = document.querySelectorAll('.main_title');
    const tokyoWeathers = Array.from(nodes, td => td.textContent.trim());
    console.log(tokyoWeathers);
})();
