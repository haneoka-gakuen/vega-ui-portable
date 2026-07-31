import {
  createAdvTextRenderValue,
  defineVegaPlugin,
  type VegaDisposable,
  type VegaUiSlotContext,
} from "@haneoka/vega/plugin";
import {
  VEGA_RICH_TEXT_SERVICE,
  type VegaRichTextHandle,
  type VegaRichTextService,
} from "@haneoka/vega-plugin-richtext";

type AdvPlayerState = VegaUiSlotContext["state"];
type AdvChoiceItem = AdvPlayerState["choices"]["items"][number];
type AdvChatMessage = AdvPlayerState["chat"]["messages"][number];

export const VEGA_PORTABLE_UI_THEME_ID = "portable";

export const VEGA_PORTABLE_UI_CSS = String.raw`
[data-vega-theme="portable"] {
  color: #fff;
  color-scheme: dark;
  font-family: "A-OTF Shin Go Pro", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans CJK JP", Inter, ui-sans-serif, system-ui, sans-serif;
  --vega-portable-line: rgb(218 241 255 / 28%);
  --vega-portable-surface: rgb(7 21 40 / 78%);
  --vega-portable-accent: #87c7ff;
  --vega-portable-text-shadow: 0 1px 3px rgb(0 0 0 / 95%), 0 0 6px rgb(0 0 0 / 72%);
}
[data-vega-theme="portable"][data-vega-high-contrast="true"] {
  --vega-portable-line: currentColor;
  --vega-portable-surface: #071528;
}
[data-vega-theme="portable"] .vega-portable-ui {
  position: absolute;
  inset: 0;
  color: #fff;
  pointer-events: none;
  text-shadow: var(--vega-portable-text-shadow);
}
[data-vega-theme="portable"] .vega-portable-ui [hidden] {
  display: none !important;
}
[data-vega-theme="portable"] .vega-portable-dialogue {
  position: absolute;
  inset: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
}
[data-vega-theme="portable"] .vega-portable-dialogue::before {
  position: absolute;
  bottom: -6.111111cqh;
  left: 50%;
  width: calc(100% + 74.074074cqh);
  height: 32.962963cqh;
  background: linear-gradient(
    180deg,
    rgb(24 18 41 / 0%) 0%,
    rgb(24 18 41 / 4.39%) 10%,
    rgb(24 18 41 / 10.7%) 20%,
    rgb(24 18 41 / 18.12%) 30%,
    rgb(24 18 41 / 26.36%) 40%,
    rgb(24 18 41 / 34.86%) 50%,
    rgb(24 18 41 / 43.37%) 60%,
    rgb(24 18 41 / 51.88%) 70%,
    rgb(24 18 41 / 59.3%) 80%,
    rgb(24 18 41 / 65.33%) 90%,
    rgb(24 18 41 / 70%) 100%
  );
  content: "";
  pointer-events: none;
  transform: translateX(-50%);
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="center"] {
  inset: 0;
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="center"]::before {
  top: 50%;
  bottom: auto;
  width: 100%;
  height: 18.518519cqh;
  background: rgb(0 0 0 / 49.02%);
  transform: translate(-50%, -50%);
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="psych"]::before {
  right: auto;
  bottom: 4.62963cqh;
  width: 125cqh;
  height: 28.703704cqh;
  background:
    linear-gradient(90deg, rgb(114 181 255 / 25%), rgb(190 248 236 / 18%) 72%, transparent),
    rgb(19 14 36 / 74%);
  transform: translateX(-50%);
}
[data-vega-theme="portable"] .vega-portable-speaker {
  position: absolute;
  bottom: 21.759259cqh;
  left: calc(50% - 56.111111cqh);
  display: flex;
  width: max-content;
  min-width: 18.518519cqh;
  max-width: 74.074074cqh;
  height: 5.555556cqh;
  box-sizing: border-box;
  align-items: center;
  overflow: visible;
  padding: 0 9.027778cqh 0 2.256944cqh;
  background: linear-gradient(
    90deg,
    rgb(114 181 255 / 40%) 0%,
    rgb(198 255 234 / 27.45%) 69.65%,
    rgb(198 255 234 / 0%) 100%
  );
  font-size: 3.333333cqh;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}
[data-vega-theme="portable"] .vega-portable-text {
  position: absolute;
  bottom: .176852cqh;
  left: calc(50% - 54.749074cqh);
  width: 111.111111cqh;
  height: 18.518519cqh;
  overflow: hidden;
  font-size: 3.333333cqh;
  font-weight: 400;
  line-height: 1.2;
  white-space: pre-wrap;
}
[data-vega-theme="portable"] .vega-portable-rich-text ruby {
  ruby-position: over;
}
[data-vega-theme="portable"] .vega-portable-rich-text rt {
  font-size: .46em;
  font-weight: 700;
  line-height: 1;
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="center"] .vega-portable-speaker {
  display: none;
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="center"] .vega-portable-text {
  top: 50%;
  bottom: auto;
  left: 50%;
  display: flex;
  width: 111.111111cqh;
  height: 18.518519cqh;
  align-items: center;
  font-size: 3.703704cqh;
  transform: translate(-50%, -50%);
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="psych"] .vega-portable-speaker {
  bottom: 26.388889cqh;
  left: calc(50% - 55.277778cqh);
  min-width: 55.555556cqh;
  height: 6.944444cqh;
}
[data-vega-theme="portable"] .vega-portable-dialogue[data-window="psych"] .vega-portable-text {
  bottom: 5.555556cqh;
  left: calc(50% - 52.5cqh);
  font-size: 3.703704cqh;
}
[data-vega-theme="portable"] .vega-portable-choices {
  position: absolute;
  z-index: 1;
  top: calc(50% - 9.259259cqh);
  left: 50%;
  display: grid;
  width: min(64.814815cqh, calc(100% - 32px));
  max-height: 50cqh;
  align-content: safe center;
  gap: 1.111111cqh;
  overflow: auto;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
[data-vega-theme="portable"] .vega-portable-choice {
  min-height: 11.111111cqh;
  padding: .87963cqh 3.703704cqh;
  border: 1px solid rgb(218 241 255 / 44%);
  border-radius: 5.555556cqh;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 10%), transparent 42%),
    linear-gradient(90deg, rgb(79 80 155 / 88%), rgb(75 136 177 / 84%));
  box-shadow: 0 .740741cqh 2.222222cqh rgb(2 9 22 / 28%);
  color: #fff;
  font-family: inherit;
  font-size: 3.888889cqh;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  text-shadow: var(--vega-portable-text-shadow);
  pointer-events: auto;
}
[data-vega-theme="portable"] .vega-portable-choice:not(:disabled):hover,
[data-vega-theme="portable"] .vega-portable-choice:not(:disabled):focus-visible {
  border-color: rgb(255 255 255 / 76%);
  outline: 2px solid var(--vega-portable-accent);
  outline-offset: 2px;
}
[data-vega-theme="portable"] .vega-portable-choice:disabled {
  cursor: not-allowed;
  filter: saturate(.35);
  opacity: .48;
}
[data-vega-theme="portable"] .vega-portable-title,
[data-vega-theme="portable"] .vega-portable-location,
[data-vega-theme="portable"] .vega-portable-subtitles {
  position: absolute;
  border: 0;
}
[data-vega-theme="portable"] .vega-portable-title {
  top: 2.777778cqh;
  left: 0;
  max-width: 100%;
  padding: 1.388889cqh 7.407407cqh;
  background: linear-gradient(
    90deg,
    rgb(114 181 255 / 40%) 0%,
    rgb(190 248 236 / 35.2941%) 90.02%,
    transparent 100%
  );
  font-size: 3.333333cqh;
  font-weight: 700;
  text-align: center;
}
[data-vega-theme="portable"] .vega-portable-location {
  top: 50%;
  left: 50%;
  display: flex;
  width: min(129.62963cqh, 100%);
  height: 5.740741cqh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(131 196 251 / 40%) 20%,
    rgb(181 239 240 / 40%) 80%,
    transparent 100%
  );
  font-size: 3.333333cqh;
  font-weight: 700;
  transform: translate(-50%, -50%);
}
[data-vega-theme="portable"] .vega-portable-subtitles {
  right: 0;
  bottom: 5.555556cqh;
  left: 0;
  display: flex;
  min-height: 13.055556cqh;
  align-items: center;
  justify-content: center;
  padding: 0 11.111111cqh;
  background: transparent;
  font-size: 3.333333cqh;
  text-align: center;
}
[data-vega-theme="portable"] .vega-portable-subtitles[hidden] {
  display: none;
}
[data-vega-theme="portable"] .vega-portable-error,
[data-vega-theme="portable"] .vega-portable-loading {
  position: absolute;
  padding: 10px 16px;
  border: 1px solid var(--vega-portable-line);
  background: rgb(5 14 28 / 84%);
}
[data-vega-theme="portable"] .vega-portable-loading {
  top: 50%;
  left: 50%;
  min-width: min(70%, 360px);
  transform: translate(-50%, -50%);
  text-align: center;
}
[data-vega-theme="portable"] .vega-portable-loading progress {
  display: block;
  width: 100%;
  margin-top: 8px;
  accent-color: var(--vega-portable-accent);
}
[data-vega-theme="portable"] .vega-portable-error {
  top: 24px;
  right: 24px;
  left: 24px;
  border-color: rgb(255 160 166 / 58%);
  color: #ffd7da;
}
[data-vega-theme="portable"] .vega-portable-chat {
  position: absolute;
  top: 6%;
  right: 8%;
  bottom: 8%;
  width: min(410px, 84%);
  overflow: auto;
  padding: 18px;
  border: 1px solid var(--vega-portable-line);
  border-radius: 18px;
  background: rgb(244 247 252 / 94%);
  color: #182235;
  text-shadow: none;
  pointer-events: auto;
}
[data-vega-theme="portable"] .vega-portable-chat h2 { margin: 0 0 14px; font-size: 16px; }
[data-vega-theme="portable"] .vega-portable-chat-message {
  max-width: 86%;
  margin: 7px 0;
  padding: 8px 11px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 9px rgb(32 50 75 / 12%);
  white-space: pre-wrap;
}
[data-vega-theme="portable"] .vega-portable-chat-message[data-self="true"] {
  margin-left: auto;
  background: #dff7cf;
}
[data-vega-theme="portable"] .vega-portable-chat-message b { display: block; margin-bottom: 3px; font-size: 11px; }
@container (max-aspect-ratio: 4 / 3) {
  [data-vega-theme="portable"] .vega-portable-speaker {
    left: 4cqh;
    max-width: calc(100% - 8cqh);
  }
  [data-vega-theme="portable"] .vega-portable-text {
    left: 4cqh;
    width: calc(100% - 8cqh);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-vega-theme="portable"] *, [data-vega-theme="portable"] *::before, [data-vega-theme="portable"] *::after {
    scroll-behavior: auto !important;
    transition-duration: .001ms !important;
    animation-duration: .001ms !important;
  }
}
[data-vega-theme="portable"][data-vega-reduced-motion="true"] *,
[data-vega-theme="portable"][data-vega-reduced-motion="true"] *::before,
[data-vega-theme="portable"][data-vega-reduced-motion="true"] *::after {
  scroll-behavior: auto !important;
  transition-duration: .001ms !important;
  animation-duration: .001ms !important;
}
`;

export const vegaPortableUiPlugin = defineVegaPlugin({
  manifest: {
    id: "haneoka.vega-portable-ui",
    name: "Vega Portable UI",
    version: "0.1.0",
    apiVersion: 1,
    description: "Asset-free dialogue, choice, chat, and story status presentation",
    capabilities: ["theme", "ui-slot"],
    dependencies: {
      "haneoka.vega-richtext": "^0.1.0",
    },
  },
  setup(context) {
    context.contribute("theme", {
      id: VEGA_PORTABLE_UI_THEME_ID,
      name: "Vega Portable",
      tokens: {
        accent: "#87c7ff",
        text: "#ffffff",
      },
      cssText: VEGA_PORTABLE_UI_CSS,
    });
    context.contribute("ui-slot", {
      id: "portable-story-ui",
      name: "Portable story UI",
      slot: "dialogue",
      mount: mountPortableStoryUi,
    });
  },
});

const mountPortableStoryUi = (
  host: HTMLElement,
  context: VegaUiSlotContext,
): VegaDisposable => {
  const document = host.ownerDocument;
  const richText = createRichTextPresenter(
    context.services(VEGA_RICH_TEXT_SERVICE),
  );
  const root = node(document, "section", "vega-portable-ui");
  root.setAttribute("aria-live", "polite");

  const dialogue = node(document, "div", "vega-portable-dialogue vega-dialogue");
  dialogue.tabIndex = 0;
  dialogue.setAttribute("role", "button");
  dialogue.setAttribute("aria-label", "Advance dialogue");
  const speaker = node(document, "div", "vega-portable-speaker vega-dialogue__speaker");
  const text = node(document, "div", "vega-portable-text vega-dialogue__text");
  dialogue.append(speaker, text);

  const choices = node(document, "div", "vega-portable-choices vega-choice-list");
  const title = node(document, "div", "vega-portable-title");
  const location = node(document, "div", "vega-portable-location");
  const subtitles = node(document, "div", "vega-portable-subtitles");
  const loading = node(document, "div", "vega-portable-loading");
  const loadingText = node(document, "span");
  const loadingProgress = document.createElement("progress");
  loadingProgress.max = 1;
  loading.append(loadingText, loadingProgress);
  const error = node(document, "div", "vega-portable-error");
  error.setAttribute("role", "alert");
  const chat = node(document, "section", "vega-portable-chat");
  const chatTitle = document.createElement("h2");
  const chatMessages = node(document, "div");
  chat.append(chatTitle, chatMessages);

  root.append(dialogue, choices, title, location, subtitles, loading, error, chat);
  host.append(root);

  const advance = (event: Event) => {
    event.stopPropagation();
    context.player.requestNext();
  };
  const advanceByKey = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    advance(event);
  };
  dialogue.addEventListener("click", advance);
  dialogue.addEventListener("keydown", advanceByKey);

  let lastChoices = "";
  let lastChat = "";
  const render = () => {
    const state = context.state;
    dialogue.hidden = !state.talk.visible;
    dialogue.dataset.window = portableWindow(state.talk.window);
    dialogue.style.transform = `translate(${finite(state.talk.shakeX)}px, ${finite(state.talk.shakeY)}px)`;
    speaker.hidden = !state.talk.speaker;
    setText(speaker, state.talk.speaker);
    setLanguage(speaker, state.talk.speakerLang);
    const format = state.talk.textFormat?.toLowerCase();
    const deferCompilation =
      !state.talk.textComplete &&
      (format === "latex" ||
        format === "tex" ||
        format === "typst" ||
        format === "typ");
    richText.render(
      text,
      createAdvTextRenderValue(state.talk.displayedText, {
        format: deferCompilation ? "plain" : state.talk.textFormat,
        displayMode: state.talk.textDisplayMode,
        language: state.talk.textLang,
      }),
    );
    setLanguage(text, state.talk.textLang);

    const choiceSignature = choiceKey(state.choices.items, state.choices.visible);
    if (choiceSignature !== lastChoices) {
      lastChoices = choiceSignature;
      renderChoices(document, choices, state.choices.visible ? state.choices.items : [], context);
    }
    choices.hidden = !state.choices.visible;

    title.hidden = !state.title.visible;
    richText.render(title, state.title.text);
    setLanguage(title, state.title.lang);
    location.hidden = !state.location.visible;
    richText.render(location, state.location.text);
    setLanguage(location, state.location.lang);
    subtitles.hidden = !state.subtitles.visible;
    richText.render(subtitles, state.subtitles.text);
    setLanguage(subtitles, state.subtitles.lang);

    loading.hidden = !state.loading;
    loadingText.textContent = state.preload.total
      ? `Loading ${state.preload.done} / ${state.preload.total}`
      : "Loading";
    loadingProgress.value = state.preload.total
      ? Math.min(1, state.preload.done / state.preload.total)
      : 0;
    error.hidden = !state.error;
    setText(error, state.error);

    const chatSignature = chatKey(state);
    if (chatSignature !== lastChat) {
      lastChat = chatSignature;
      renderChat(document, chatTitle, chatMessages, state.chat.title, state.chat.messages);
      chat.scrollTop = chat.scrollHeight;
    }
    chat.hidden = !state.chat.visible;
  };
  const stop = animate(host, context.signal, render);
  render();

  return {
    dispose() {
      stop();
      richText.dispose();
      dialogue.removeEventListener("click", advance);
      dialogue.removeEventListener("keydown", advanceByKey);
      root.remove();
    },
  };
};

const renderChoices = (
  document: Document,
  host: HTMLElement,
  items: readonly AdvChoiceItem[],
  context: VegaUiSlotContext,
): void => {
  host.replaceChildren();
  for (const item of items) {
    const button = node(document, "button", "vega-portable-choice vega-choice-list__item");
    button.type = "button";
    button.textContent = item.text;
    button.disabled = item.enabled === false;
    button.setAttribute("aria-disabled", String(button.disabled));
    setLanguage(button, item.lang);
    if (!button.disabled) {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        context.player.choose(item.key);
      });
    }
    host.append(button);
  }
};

const renderChat = (
  document: Document,
  title: HTMLElement,
  messagesHost: HTMLElement,
  heading: string,
  messages: readonly AdvChatMessage[],
): void => {
  title.textContent = heading || "Chat";
  messagesHost.replaceChildren();
  for (const message of messages) {
    const item = node(document, "article", "vega-portable-chat-message");
    item.dataset.self = String(Boolean(message.self));
    if (message.speaker) {
      const speaker = document.createElement("b");
      speaker.textContent = message.speaker;
      setLanguage(speaker, message.speakerLang);
      item.append(speaker);
    }
    const body = document.createElement("span");
    body.textContent = message.text || (message.stamp ? `[${message.stamp}]` : "");
    setLanguage(body, message.textLang);
    item.append(body);
    messagesHost.append(item);
  }
};

const animate = (
  host: HTMLElement,
  signal: AbortSignal,
  render: () => void,
): (() => void) => {
  const view = host.ownerDocument.defaultView;
  let active = true;
  let handle = 0;
  const request = view?.requestAnimationFrame?.bind(view) ??
    ((callback: FrameRequestCallback) => view?.setTimeout(() => callback(Date.now()), 16) ?? 0);
  const cancel = view?.cancelAnimationFrame?.bind(view) ??
    ((id: number) => view?.clearTimeout(id));
  const frame: FrameRequestCallback = () => {
    if (!active || signal.aborted) return;
    render();
    handle = request(frame);
  };
  handle = request(frame);
  const stop = () => {
    if (!active) return;
    active = false;
    cancel(handle);
  };
  signal.addEventListener("abort", stop, { once: true });
  return () => {
    signal.removeEventListener("abort", stop);
    stop();
  };
};

const node = <K extends keyof HTMLElementTagNameMap>(
  document: Document,
  tag: K,
  className = "",
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const setText = (element: HTMLElement, value: unknown): void => {
  const next = typeof value === "string" ? value : value == null ? "" : String(value);
  if (element.textContent !== next) element.textContent = next;
};

interface RichTextPresenter {
  render(element: HTMLElement, value: unknown): void;
  dispose(): void;
}

const richTextSource = (value: unknown): string => {
  if (
    value &&
    typeof value === "object" &&
    "source" in value &&
    typeof value.source === "string"
  ) {
    return value.source;
  }
  return typeof value === "string" ? value : value == null ? "" : String(value);
};

const richTextSignature = (value: unknown): string => {
  if (
    value &&
    typeof value === "object" &&
    "source" in value &&
    typeof value.source === "string"
  ) {
    const source = value as {
      readonly displayMode?: unknown;
      readonly format?: unknown;
      readonly language?: unknown;
      readonly source: string;
    };
    return JSON.stringify([
      source.format,
      source.source,
      source.displayMode,
      source.language,
    ]);
  }
  return JSON.stringify(["adv", richTextSource(value)]);
};

const createRichTextPresenter = (
  service: VegaRichTextService | undefined,
): RichTextPresenter => {
  const signatures = new WeakMap<HTMLElement, string>();
  const handles = new Map<HTMLElement, VegaRichTextHandle>();
  return {
    render(element, value) {
      const signature = richTextSignature(value);
      if (signatures.get(element) === signature) return;
      signatures.set(element, signature);
      handles.get(element)?.dispose();
      handles.delete(element);
      element.classList.add("vega-portable-rich-text");
      if (!service) {
        element.removeAttribute("data-vega-rich-text-error");
        element.removeAttribute("data-vega-rich-text-format");
        element.textContent = richTextSource(value);
        return;
      }
      handles.set(
        element,
        service.render(element, value, { defaultFormat: "adv" }),
      );
    },
    dispose() {
      for (const handle of handles.values()) handle.dispose();
      handles.clear();
    },
  };
};

const setLanguage = (element: HTMLElement, value: unknown): void => {
  const next = typeof value === "string" ? value : "";
  if (element.lang !== next) element.lang = next;
};

const finite = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

const portableWindow = (value: string): "default" | "center" | "psych" => {
  const normalized = value.toLowerCase();
  if (normalized.includes("center")) return "center";
  if (normalized.includes("psych")) return "psych";
  return "default";
};

const choiceKey = (items: readonly AdvChoiceItem[], visible: boolean): string =>
  visible
    ? items
        .map(
          ({ key, text, lang, enabled }) =>
            `${key}\u0000${text}\u0000${lang ?? ""}\u0000${enabled === false ? "0" : "1"}`,
        )
        .join("\u0001")
    : "";

const chatKey = (state: AdvPlayerState): string =>
  state.chat.visible
    ? `${state.chat.title}\u0000${state.chat.messages
        .map(({ id, speaker, text, stamp, self }) =>
          `${id}\u0000${speaker ?? ""}\u0000${text}\u0000${stamp ?? ""}\u0000${Boolean(self)}`)
        .join("\u0001")}`
    : "";
