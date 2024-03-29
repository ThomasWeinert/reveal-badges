Badges for reveal.js - [Live Demo](http://thomas.weinert.info/reveal-badges/example/index.html)

![Demo Image](https://raw.githubusercontent.com/ThomasWeinert/reveal-badges/master/doc/demo.png)

After a talk, one of the attendees said that 
it was sometimes a little difficult to put
source examples into the right context. He suggested
to add the language to the slides.

That seems to be a good idea, so I wrote a plugin that
adds a badge to code blocks.

```
npm i @thomasweinert/reveal-badges
```

After that add it to the plugins.

```javascript
const deck = new Reveal(
    {
        plugins: [ Markdown, Highlight, Badges ]
    }
)
```

## Options

```javascript
deck.initialize(
  {
    // ...
    badges: {
      defaults: {
        bg: 'black',
        fg: 'white',
        position: 'tr'
      }, 
      languages: true
    }
    // ...
  }
);
```

### Defaults

`@var {Object} defaults`

You can change the default colors and position for badges
using the `defaults` option.

* `bg` - background color
* `fg` - text color
* `position` - badge position (tr, br, bl, tl)

### Languages

`@var {boolean|{}} languages`

If set to `true`, the plugin will add `data-badge` attributes to all
`pre > code` constructs that have a `language-*` class. 
It will use the language from the class name as text for the badge.

You can use this property to configure the badge for a specific 
language, too. 

```javascript
deck.initialize(
  {
    // ...
    badges: {
      languages: {
        php: {
          label: 'PHP 7',
          fg: 'white',
          bg: 'black',
          position: 'tr'
        }
      }
    }
    // ...
  }
);
```

#### Disable

To disable the badge for a specific language, set it to `false`.

```javascript
deck.initialize(
  {
    // ...
    badges: {
      languages: {
        plaintext : false
      }
    }
    // ...
  }
);
```

## Data Attributes

You can add `data-badge` attributes to any element. A manually added
data attribute will take priority. It allows you to override
the defaults for a language badge or add individual badges.

```html
<pre data-badge="PHP 7.1" data-badge-fg="red">
  <code class="language-php">...</code>
</pre>
```

### Available Attributes

* data-badge - text
* data-badge-fg - text color
* data-badge-bg - background color
* data-badge-position - tr (default), tl, br, bl
* data-badge-class - additional css classes
