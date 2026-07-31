# Contributing

Use Node.js 20 or newer and pnpm 11. Run `pnpm check` before opening a change.
Keep the UI asset-free, framework-neutral, accessible, and cancellation-safe.
Test pointer and keyboard input, narrow screens, reduced motion, DOM lifecycle,
and untrusted story text.

Do not commit fonts, images, audio, video, model data, extracted game content,
or credentials.

Maintainers publish from GitHub releases through npm trusted publishing. The
npm package must authorize this repository's `.github/workflows/publish.yml`
workflow before the first release.
