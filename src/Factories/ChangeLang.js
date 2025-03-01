import i18n from "i18next"; // Assuming i18n is set up in your project
import storage from "./Storage"; // Import functional storage directly

export function changeLang(lang) {
  if (lang === "fa") {
    // Change language to Persian (Farsi) and set RTL
    document.dir = "rtl"; // Set document direction to RTL
    i18n.changeLanguage("fa"); // Update i18n language
    storage.set("Language", "fa"); // Persist language choice
  } else {
    // Change language to English and set LTR
    document.dir = "ltr"; // Set document direction to LTR
    i18n.changeLanguage("en"); // Update i18n language
    storage.set("Language", "en"); // Persist language choice
  }
  // No restart needed; web updates dynamically via i18n
}