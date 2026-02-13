import { loadLanguage, getInitialLang } from "./i18n.js";
import { buildUI } from "./ui.js";
import { initTerminals } from "./terminal.js";

async function bootstrap() {
  const lang = getInitialLang();
  document.documentElement.lang = lang;

  try {
    const i18n = await loadLanguage(lang);

    buildUI(i18n);
    initTerminals(i18n);

  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

bootstrap();

