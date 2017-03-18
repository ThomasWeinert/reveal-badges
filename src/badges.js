var RevealBadges = window.RevealBadges || (function() {
  var languages = {
    'makefile': {
      bg: 'black', fg: 'white'
    },
    'php': {
      bg: '#4f5b93', fg: 'black'
    },
    'c': {
      bg: 'red', fg: 'white'
    }
  }

  var setUp = function(options, languages) {
    var positions = {
      'tl': 'topLeft',
      'tr': 'topRight',
      'bl': 'bottomLeft',
      'br': 'bottomRight',
    }
    var properties = {
      'bg': '',
      'fg': '',
      'position': '',
      'class': ''
    };
    var i, key, value;
    var badge, container, badgeClass, badgeStyle;

    if (options.languages) {
      var blocks = document.querySelectorAll('pre > code');
      for (i = 0; i < blocks.length; i++) {
        addLanguageBadge(blocks[i], languages);
      }
    }
    var badgeParents = document.querySelectorAll('[data-badge]');
    for (i = 0; i < badgeParents.length; i++) {
      container = badgeParents[i];
      for (key in properties) {
        value = container.getAttribute('data-badge-' + key);
        if (value) {
          properties[key] = value;
        } else if (options.defaults[key]) {
          properties[key] = options.defaults[key];
        } else {
          properties[key] = '';
        }
      }
      badge = container.appendChild(
          document.createElement('span')
      )
      badge.appendChild(
          document.createTextNode(
              badgeParents[i].getAttribute('data-badge')
          )
      );
      badgeClass = 'badge';
      if (properties.class) {
        badgeClass += ' ' + properties.class;
      }
      if (positions[properties.position]) {
        badgeClass += ' ' + positions[properties.position];
      }
      badgeStyle = '';
      if (properties.fg != '') {
        badgeStyle += 'color: ' + properties.fg + ';';
      }
      if (properties.bg != '') {
        badgeStyle += 'background-color: ' + properties.bg + ';';
      }

      badge.setAttribute('class', badgeClass);
      if (badgeStyle != '') {
        badge.setAttribute('style', badgeStyle);
      }
    }
  }

  var addLanguageBadge = function(code, languages) {
    var properties = ['bg', 'fg', 'position', 'class'];
    var container = code.parentNode;
    var match, language, settings, i, attributeName, currentValue;
    if (match = code.getAttribute('class').match(/\blanguage-(\S+)/)) {
      language = match[1].toLowerCase();
      if (false === languages[language]) {
        return;
      }
      if (settings = languages[language]) {
        if (!container.getAttribute('data-badge')) {
          container.setAttribute(
              'data-badge',
              settings.label || match[1].toUpperCase()
          );
        }
        for (i = 0; i < properties.length; i++) {
          attributeName = 'data-badge-' + properties[i];
          if (
              settings[properties[i]] && !container.getAttribute(attributeName)
          ) {
            container.setAttribute(
                attributeName, settings[properties[i]]
            );
          }
        }
      } else {
        if (!container.getAttribute('data-badge')) {
          container.setAttribute('data-badge', match[1]);
        }
      }
    }
  }

  var scriptPath = function() {
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

  var merge = function() {
    var result = {}, i, key, source;
    for (i = 0; i < arguments.length; i++) {
      source = arguments[i];
      for (key in source) {
        if (!source.hasOwnProperty(key)) {
          continue;
        }
        try {
          if (source[key].constructor == Object) {
            result[key] = merge(result[key], source[key]);
          } else {
            result[key] = source[key];
          }
        } catch (e) {
          result[key] = source[key];
        }
      }
    }
    return result;
  }

  var config = Reveal.getConfig() || {};
  config.badges = config.badges || {};
  var options = {
    path: config.badges.path || scriptPath() || 'plugin/language-badges',
    languages: config.badges.languages,
    defaults: config.badges.defaults || {}
  }
  if (options.languages instanceof Object) {
    languages = merge(languages, options.languages);
  }

  var resource = document.createElement("link");
  resource.rel = "stylesheet";
  resource.href = options.path + "/badges.css";
  document.querySelector("head").appendChild(resource);

  setUp(options, languages);
})();