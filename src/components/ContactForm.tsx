import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useTranslations } from "../utils/i18n";

const ContactForm = ({ locale }: { locale: "en" | "de" | "fr" | "it" }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false); // State for checkbox
  const [error, setError] = useState("");

  const t = useTranslations(locale);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!consent) {
      setError(
        "You must agree to the terms and conditions and privacy policy.",
      );
      return;
    }

    setError(""); // Clear any previous errors

    const serviceId = "service_tus6elr";
    const templateId = "template_t7kw8yd";
    const publicKey = "TNSHHbQHGunvJh5j9";

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
        setConsent(false); // Reset consent
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error sending email", error);
        setLoading(false);
      });
  };

  const labelClasses =
    "flex flex-col items-start p-4 0 w-full transition-all group";
  const labelSpanClasses = "group-focus-within:opacity-50 transition-all mono";
  const inputClasses = "bg-transparent focus:outline-hidden text-xl w-full";

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      {success ? (
        <p className="mono text-center">{t("form.success")}</p>
      ) : (
        <div className="flex w-full flex-col items-center">
          <label htmlFor="name" className={`${labelClasses} bg-neutral-200/60`}>
            <span className={`${labelSpanClasses}`}>{t("form.name")}</span>
            <input
              className={`${inputClasses}`}
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label
            htmlFor="email"
            className={`${labelClasses} bg-neutral-200/40`}
          >
            <span className={`${labelSpanClasses}`}>{t("form.email")}</span>
            <input
              className={`${inputClasses}`}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label
            htmlFor="message"
            className={`${labelClasses} bg-neutral-200/20`}
          >
            <span className={`${labelSpanClasses}`}>{t("form.message")}</span>
            <textarea
              className={`${inputClasses} h-40`}
              id="message"
              name="message"
              autoComplete="off"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <div className="w-full items-center justify-between gap-4 sm:flex">
            <label className="group mt-4 flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="peer hidden"
              />
              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-black">
                <span className="bg-primary h-2 w-2 rounded-full opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
              </div>
              <span>
                {t("form.acceptTerms")}
                <a
                  href="/en/privacy-policy"
                  className="transition-opacity hover:opacity-60"
                >
                  {t("form.privacyPolicy")}
                </a>
              </span>
            </label>

            <button
              className={`btn loading mt-4 disabled:pointer-events-none disabled:opacity-30 ${loading && "loading"}`}
              disabled={!consent}
            >
              <span className="text pill">{t("form.submit")}</span>
              <span className="arrow pill" />
            </button>
          </div>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
