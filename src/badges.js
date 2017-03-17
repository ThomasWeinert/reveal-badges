var RevealBadges = window.RevealBadges || (
  function() {
    var config = Reveal.getConfig();
    var options = config.badges || {};
    options.path = options.path || scriptPath() || 'plugin/language-badges';
    var languageColors = {
      'make': ['black', 'white'],
      'php': ['#4f5b93', 'black'],
      'c': 'red'
    }
    if (options.languages instanceof Object) {
      for (var language in options.languages) {
        if (!options.languages.hasOwnProperty(language)) {
          languageColors[language] = color;
        }
      }
    }

    var resource = document.createElement("link");
    resource.rel = "stylesheet";
    resource.href = options.path + "/badges.css";
    document.querySelector("head").appendChild(resource);

    setUp(options, languageColors);

    function setUp(options, languageColors) {
      var i, badge, badgeStyle;
      if (options.languages) {
        var blocks = document.querySelectorAll('pre > code');
        for (i = 0; i < blocks.length; i++) {
          publishLanguage(blocks[i], languageColors);
        }
      }
      var badgeParents = document.querySelectorAll('[data-badge]');
      for (i = 0; i < badgeParents.length; i++) {
        badge = badgeParents[i].appendChild(
          document.createElement('span')
        )
        badge.setAttribute('class', 'badge');
        badge.appendChild(
          document.createTextNode(
            badgeParents[i].getAttribute('data-badge')
          )
        );
        badgeStyle = '';
        color = badgeParents[i].getAttribute('data-badge-fg');
        if (color != '') {
          badgeStyle += 'color: ' + color + ';';
        }
        color = badgeParents[i].getAttribute('data-badge-bg');
        if (color != '') {
          badgeStyle += 'background-color: ' + color + ';';
        }
        if (badgeStyle != '') {
          badge.setAttribute('style', badgeStyle);
        }
      }
    }

    function publishLanguage(code, languageColors) {
      var pre = code.parentNode;
      var match, language, languageColors;
      if (match = code.getAttribute('class').match(/\blanguage-(\S+)/)) {
        language = match[1];
        if (!pre.getAttribute('data-badge')) {
          pre.setAttribute('data-badge', language)
        }
        if (!pre.getAttribute('data-badge-bg')) {
          if (languageColor = languageColors[language.toLowerCase()]) {
            if (languageColor instanceof Array) {
              pre.setAttribute('data-badge-bg', languageColor[0]);
              pre.setAttribute('data-badge-fg', languageColor[1]);
            } else if (languageColor instanceof Object) {
              pre.setAttribute('data-badge-bg', languageColor.bg);
              pre.setAttribute('data-badge-fg', languageColor.fg);
            } else {
              pre.setAttribute('data-badge-bg', languageColor);
            }
          }
        }
      }
    }

    function scriptPath() {
      // obtain plugin path from the script element
      var path;
      var end = -("/badges.js".length);
      if (document.currentScript) {
        path = document.currentScript.src.slice(0, end);
      } else {
        var scriptTag = document.querySelector('script[src$="/badges.js"]');
        if (scriptTag) {
          path = sel.src.slice(0, end);
        }
      }
      return path;
    }
  }
)();

