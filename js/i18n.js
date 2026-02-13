function detectBrowserLang() {
  return navigator.language && navigator.language.startsWith("es")
    ? "es"
    : "en";
}

export function getInitialLang() {
  try {
    return localStorage.getItem("lang") || detectBrowserLang();
  } catch {
    return detectBrowserLang();
  }
}

export async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);

  if (!response.ok) {
    throw new Error(`Language file not found: ${lang}`);
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    throw new Error("Invalid language file format");
  }

  return data;
}

