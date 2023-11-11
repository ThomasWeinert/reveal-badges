import Reveal from '../node_modules/reveal.js/dist/reveal.esm.js';
import Markdown from '../node_modules/reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from '../node_modules/reveal.js/plugin/highlight/highlight.esm.js';
import Badges from '../src/badges.js';

const deck = new Reveal(
    {
      plugins: [ Badges, Markdown, Highlight]
    }
)
deck.initialize({});