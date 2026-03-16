import { buildBlogPost } from "./ui.js";

function detectBrowserLang() {
  return navigator.language && navigator.language.startsWith("es")
    ? "es"
    : "en";
}

function getInitialLang() {
  try {
    return localStorage.getItem("lang") || detectBrowserLang();
  } catch {
    return detectBrowserLang();
  }
}

async function loadPost(lang) {
  const response = await fetch(`lang/${lang}.json`);

  if (!response.ok) {
    throw new Error(`Language file not found: ${lang}`);
  }

  return response.json();
}

async function bootstrap() {

  const lang = getInitialLang();
  document.documentElement.lang = lang;

  try {

    const data = await loadPost(lang);
    buildBlogPost(data);

  } catch (error) {

    console.error("Failed to load blog post:", error);

  }

}

bootstrap();
