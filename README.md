# `@haneoka/vega-ui-portable`

Asset-free story UI for Vega.

- Dialogue, speaker, choice, subtitle, title, location, loading, and error states
- Chat presentation
- Keyboard and pointer input
- Responsive, high-contrast, and reduced-motion styles

```sh
pnpm add @haneoka/vega @haneoka/vega-ui-portable
```

```ts
import { VegaEngine } from "@haneoka/vega";
import { vegaPortableUiPlugin } from "@haneoka/vega-ui-portable";

const engine = new VegaEngine({ plugins: [vegaPortableUiPlugin] });
```

Select the `portable` theme in the host. Another theme or `dialogue` UI-slot
plugin can override the presentation without changing story data.

## License

MPL-2.0.
