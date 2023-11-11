import languages from "./languages.js";

const BadgePosition = {
    tl: 'topLeft',
    tr: 'topRight',
    bl: 'bottomLeft',
    br: 'bottomRight'
};

class BadgesPlugin {

    // noinspection JSUnusedGlobalSymbols
    get id() {
        return 'badges';
    }

    // noinspection JSUnusedGlobalSymbols
    init(deck) {
        this._options = {
            languages: true,
            defaults: {},
            ...{
                badges: {},
                ...(deck.getConfig()?.badges || {})
            }
        };
        this.addStyles('badges.css');
        deck.on(
            'slidechanged',
            (event) => {
                this.update(event.target)
            }
        );
        this.update(document);
    }

    update(target) {
        // data-badge attributes
        target.querySelectorAll('[data-badge]').forEach(
            (node) => {
                const badge = node.querySelector(':scope > .badge');
                if (!badge) {
                    this.appendBadge(node);
                }
            }
        );
        // code blocks
        if (this._options.languages) {
            target.querySelectorAll('pre > code').forEach(
                (node) => {
                    const container = node.closest('pre');
                    const badge = container.querySelector(':scope > .badge');
                    if (!badge) {
                        const language = this.getLanguageFromNode(node);
                        if (
                            language &&
                            !(
                                typeof this._options.languages === 'object' &&
                                language in this._options.languages &&
                                this._options.languages[language] === false
                            )
                        ) {
                            const profile = {
                                label: language.toUpperCase(),
                                ...(languages[language] || {}),
                                ...(this._options.languages[language] || {})
                            };
                            this.appendBadge(container, profile);
                        }
                    }
                }
            );
        }
    }

    addStyles(...files) {
        const path = this.getPath().dirname;
        files.forEach(
            (file) => {
                const node = document.createElement('link');
                node.setAttribute('rel', 'stylesheet');
                node.setAttribute('href', path + '/' + file);
                document.head.appendChild(node);
            }
        )
    }

    getPath() {
        const url = new URL(import.meta.url);
        const path = url.pathname;
        const parts = path.split('/');
        const basename = parts.pop();
        const dirname = parts.join('/');
        return {path, dirname, basename};
    }

    appendBadge(node, detail = {}) {
        const options = this.getBadgeOptions(node, detail);
        const badge = document.createElement('span');
        badge.textContent = options.label;
        badge.setAttribute('class', 'badge ' + (options.class || ''));
        badge.classList.add(options.position);
        badge.style.setProperty('background-color', options.bg);
        badge.style.setProperty('color', options.fg);
        if (!node.hasAttribute('data-badge')) {
            node.setAttribute('data-badge', options.label);
        }
        node.appendChild(badge);
    }

    getBadgeOptions(node, defaults) {
        return {
            label: node.dataset.badge || defaults.label,
            bg: node.dataset.badgeBg || defaults.bg,
            fg: node.dataset.badgeFg || defaults.fg,
            class: node.dataset.badgeClass || defaults.class,
            position: Object.keys(BadgePosition).reduce(
                (carry, currentValue) => {
                    return carry || (
                        node.dataset.badgePosition === currentValue
                            ? BadgePosition[currentValue]
                            : undefined
                    )
                },
                undefined
            ) || defaults.position || BadgePosition.tr,
        }
    }

    getLanguageFromNode(node) {
        return [...node.classList].reduce(
            (carry, currentValue) => {
                return carry || (
                    currentValue.startsWith('language-')
                        ? currentValue.substring(9).toLowerCase()
                        : undefined
                )
            },
            undefined
        )
    }
}

export default () => new BadgesPlugin();
