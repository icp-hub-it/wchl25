export const locales = ["en", "fr", "it", "de"];
export const defaultLang = "en";

export const ui = {
  en: {
    "header.launchApp": "Launch App",
    "form.name": "Name",
    "form.email": "E-mail",
    "form.message": "Message",
    "form.acceptTerms": "I have read and agree to the ",
    "form.privacyPolicy": "Privacy Policy.",
    "form.submit": "Send",
    "form.success":
      "We received your message and will get back to you shortly.",
    "footer.copyright": "All Rights Reserved",
    "footer.links": "Links",
    "footer.contact": "Contact",
  },
  fr: {
    "header.launchApp": "Lancer l'application",
    "form.name": "Nom",
    "form.email": "E-mail",
    "form.message": "Message",
    "form.acceptTerms": "J'ai lu et j'accepte la ",
    "form.privacyPolicy": "Politique de confidentialité.",
    "form.submit": "Envoyer",
    "form.success":
      "Nous avons bien reçu votre message et nous vous répondrons sous peu.",
    "footer.copyright": "Tous droits réservés",
    "footer.links": "Liens",
    "footer.contact": "Contact",
  },
  de: {
    "header.launchApp": "App starten",
    "form.name": "Name",
    "form.email": "E-Mail",
    "form.message": "Nachricht",
    "form.acceptTerms": "Ich habe die gelesen und stimme der ",
    "form.privacyPolicy": "Datenschutzerklärung zu.",
    "form.submit": "Senden",
    "form.success":
      "Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.",
    "footer.copyright": "Alle Rechte vorbehalten",
    "footer.links": "Links",
    "footer.contact": "Kontakt",
  },
  it: {
    "header.launchApp": "Avvia app",
    "form.name": "Nome",
    "form.email": "E-mail",
    "form.message": "Messaggio",
    "form.acceptTerms": "Ho letto e accetto la ",
    "form.privacyPolicy": "Privacy Policy.",
    "form.submit": "Invia",
    "form.success":
      "Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.",
    "footer.copyright": "Tutti i diritti riservati",
    "footer.links": "Link",
    "footer.contact": "Contatto",
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
