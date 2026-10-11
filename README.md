# Vega Portable UI

Vega Portable UI is the story interface every [Vega](https://github.com/haneoka-gakuen/vega)
player can use without a single image file: the dialogue box with speaker
names, choices, chat threads, chapter titles and location cards, subtitles for
video scenes, and the loading and error states. It is drawn entirely with CSS
and text, scales with the stage, works with mouse, touch and keyboard, and
respects the reader's high-contrast and reduced-motion settings.

Use it as is, restyle it with a theme, or replace any part with your own UI
plugin — the story data does not change either way. It is the base layer of
the [Haneoka theme](https://github.com/haneoka-gakuen/vega-theme-haneoka) and
is included in [Vega Full Preset](https://github.com/haneoka-gakuen/vega-preset-full).

## Install

```sh
pnpm add @haneoka/vega @haneoka/vega-plugin-richtext @haneoka/vega-ui-portable
```

It needs [Vega Rich Text](https://github.com/haneoka-gakuen/vega-plugin-richtext)
(`haneoka.vega-richtext ^0.1.0`) to render dialogue markup.

## Use it

```ts
import { VegaEngine } from "@haneoka/vega/engine";
import { vegaRichTextPlugin } from "@haneoka/vega-plugin-richtext";
import { VEGA_PORTABLE_UI_THEME_ID, vegaPortableUiPlugin } from "@haneoka/vega-ui-portable";

const engine = new VegaEngine({ officialPlugins: [vegaRichTextPlugin, vegaPortableUiPlugin] });
const player = await engine.createPlayer({ mount, story, theme: VEGA_PORTABLE_UI_THEME_ID });
```

The plugin (`haneoka.vega-portable-ui`) contributes:

| Contribution | Id | Details |
| --- | --- | --- |
| Theme | `portable` | Dark translucent surfaces, white text with a soft shadow, light-blue accent. |
| UI slot `dialogue` | `portable-story-ui` | The whole story interface listed below. |

## What it shows

| Part | Behaviour |
| --- | --- |
| Dialogue | Speaker name and text with full rich-text markup and the typewriter effect. Click, tap, Enter or Space advances. |
| Choices | A vertical list of buttons; keyboard focus moves between them. |
| Chat | Message bubbles for chat-window scenes, with speakers. |
| Title and location | Chapter title cards and location captions. |
| Subtitles | Captions for video scenes. |
| Loading and errors | A neutral loading indicator and a readable error message. |

The dialogue box is sized in container units (`cqh`), so it keeps its
proportions on any stage size and aspect ratio.

## Restyling

All parts use stable class names (`vega-portable-dialogue`,
`vega-portable-speaker`, `vega-portable-text`, `vega-portable-choices`,
`vega-portable-choice`, `vega-portable-chat`, `vega-portable-chat-message`,
`vega-portable-title`, `vega-portable-location`, `vega-portable-subtitles`,
`vega-portable-loading`, `vega-portable-error`) and a few custom properties:

| Property | Use |
| --- | --- |
| `--vega-portable-surface` | Panel background |
| `--vega-portable-line` | Borders and dividers |
| `--vega-portable-accent` | Highlights and focus |
| `--vega-portable-text-shadow` | Text legibility over art |

A theme can override them, or ship its own `dialogue` UI slot to replace the
interface entirely. `VEGA_PORTABLE_UI_CSS` exports the stylesheet if you want to
build on it.

High-contrast mode (`data-vega-high-contrast="true"` on the player) switches
to solid surfaces and full-strength borders; `prefers-reduced-motion` turns
off the animations.

## License

MPL-2.0. See [LICENSE](LICENSE).
