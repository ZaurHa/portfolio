"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FadeInSection } from "../../../components/HomeAnimations";
import type { Dictionary, Locale } from "../../../lib/i18n";

type PackageKey = "muster" | "custom" | "seo" | "unklar";
type FormState = { name: string; email: string; phone: string; package: PackageKey | ""; message: string; website: string };
type Status = { kind: "idle" } | { kind: "success"; text: string } | { kind: "error"; text: string };

const EMPTY_FORM: FormState = { name: "", email: "", phone: "", package: "", message: "", website: "" };

/** Maps ?package= values (incl. legacy values like "muster-website", "Custom-Paket") to a known key. */
function normalizePackage(raw: string | null): PackageKey | "" {
  if (!raw) return "";
  const v = raw.toLowerCase();
  if (v.includes("muster")) return "muster";
  if (v.includes("custom")) return "custom";
  if (v.includes("seo")) return "seo";
  if (v === "unklar") return "unklar";
  return "";
}

export default function KontaktClient({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const submittingRef = useRef(false);

  useEffect(() => {
    setStartedAt(Date.now());
    // Read URL params client-side (avoids useSearchParams/Suspense during static rendering)
    const params = new URLSearchParams(window.location.search);
    const pkg = normalizePackage(params.get("package"));
    if (pkg) setFormData((prev) => ({ ...prev, package: pkg }));
    // Aus /muster gewählte Design-Version in die Nachricht übernehmen
    const design = params.get("design");
    if (design && /^[a-z0-9-]{2,60}$/i.test(design)) {
      const note = lang === "en" ? `Chosen design: ${design}\n\n` : `Gewähltes Design: ${design}\n\n`;
      setFormData((prev) => (prev.message ? prev : { ...prev, message: note }));
    }
    if (params.get("sent") === "1") setStatus({ kind: "success", text: t.successMsg });
    else if (params.get("error") === "1") setStatus({ kind: "error", text: t.errorMsg });
  }, [t.successMsg, t.errorMsg, lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return; // double-click protection
    submittingRef.current = true;
    setIsSubmitting(true);
    setStatus({ kind: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, startedAt, lang }),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string; error?: string };
      if (response.ok && result.success) {
        setStatus({ kind: "success", text: t.successMsg });
        setFormData(EMPTY_FORM);
        setStartedAt(Date.now());
      } else {
        setStatus({ kind: "error", text: result.error || t.errorMsg });
      }
    } catch (error) {
      console.error("Netzwerk-Fehler:", error);
      setStatus({ kind: "error", text: t.errorMsg });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="kontakt-page">
      <section className="v3-hero v3-page-hero v3-kontakt-hero">
        <div className="v3-wrap">
          <div className="v3-hero-top">
            <span className="v3-mono"><span className="v3-dot" />{t.eyebrow} · Geretsried</span>
            <span className="v3-mono v3-hide-sm"><b>{lang === "de" ? "Antwort meist innerhalb 24 h" : "Reply usually within 24 h"}</b></span>
          </div>
          <h1 className="v3-h1 v3-h1-page">
            <span className="l">{lang === "de" ? "Website" : "Request a"}</span>
            <span className="l"><span className="c">{lang === "de" ? "anfragen." : "website."}</span></span>
          </h1>
          <div className="v3-page-hero-grid">
            <p className="v3-lead">{t.heroDesc}</p>
            <div className="v3-cta-row v3-cta-end">
              <a href="tel:+491728471641" className="v3-btn v3-btn-accent">0172 8471641</a>
              <a href="https://wa.me/491728471641" target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <div className="kontakt-grid section-wrap">
        <FadeInSection>
          <div className="kontakt-form-wrap">
            <h2 className="kontakt-form-title">{t.formTitle}</h2>

            {/* Always-present live regions so screen readers announce status changes */}
            <div role="status" aria-live="polite">
              {status.kind === "success" && (
                <div className="form-status form-success">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8l4 4 8-8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {status.text}
                </div>
              )}
            </div>
            <div role="alert">
              {status.kind === "error" && (
                <div className="form-status form-error">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 5v4M8 11v.5" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {status.text}
                </div>
              )}
            </div>

            <form method="post" action="/api/contact" onSubmit={handleSubmit} className="contact-form">
              <input type="hidden" name="lang" value={lang} />
              <input type="hidden" name="startedAt" value={startedAt ? String(startedAt) : ""} />

              {/* Honeypot: invisible for humans, bots tend to fill it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="contact-website">{t.honeypotLabel}</label>
                <input type="text" id="contact-website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name" className="form-label">{t.labelName}</label>
                  <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} required aria-required="true" minLength={2} maxLength={100} autoComplete="name" className="form-input" placeholder={t.placeholderName} />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email" className="form-label">{t.labelEmail}</label>
                  <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} required aria-required="true" autoComplete="email" className="form-input" placeholder={t.placeholderEmail} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-phone" className="form-label">
                    {t.labelPhone} <span style={{ opacity: 0.7, fontWeight: 400 }}>{t.phoneHint}</span>
                  </label>
                  <input type="tel" id="contact-phone" name="phone" value={formData.phone} onChange={handleChange} maxLength={40} pattern="[0-9 +\-\(\)\/]*" autoComplete="tel" className="form-input" placeholder={t.placeholderPhone} />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-package" className="form-label">{t.labelPackage}</label>
                  <select id="contact-package" name="package" value={formData.package} onChange={handleChange} className="form-input">
                    <option value="">{t.selectPackage}</option>
                    <option value="muster">{t.packageMuster}</option>
                    <option value="custom">{t.packageCustom}</option>
                    <option value="seo">{t.packageSeo}</option>
                    <option value="unklar">{t.packageUnklar}</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="form-label">{t.labelMessage}</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required aria-required="true" minLength={10} maxLength={5000} className="form-input form-textarea" placeholder={t.placeholderMessage} />
              </div>

              <p style={{ fontSize: "0.85rem", opacity: 0.75, margin: 0 }}>
                {t.privacyBefore}
                <Link href={`/${lang}/datenschutz`} style={{ color: "var(--accent)", textDecoration: "underline" }}>{t.privacyLink}</Link>
                {t.privacyAfter}
              </p>

              <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="cta-btn-primary w-full justify-center">
                {isSubmitting ? t.submitting : t.submit}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </FadeInSection>

        <FadeInSection delay={150}>
          <div className="kontakt-sidebar">
            <div className="kontakt-info-card">
              <h3 className="kontakt-info-title">{t.directContact}</h3>
              <div className="kontakt-info-links">
                <a href="tel:+491728471641" className="kontakt-info-link">
                  <div className="kontakt-info-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <div className="kontakt-info-link-label">{lang === "de" ? "Telefon" : "Phone"}</div>
                    <div className="kontakt-info-link-value">0172 8471641</div>
                  </div>
                </a>
                <a href="mailto:brandwerkx@gmail.com" className="kontakt-info-link">
                  <div className="kontakt-info-icon">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z" /></svg>
                  </div>
                  <div>
                    <div className="kontakt-info-link-label">E-Mail</div>
                    <div className="kontakt-info-link-value">brandwerkx@gmail.com</div>
                  </div>
                </a>
                <a href="https://github.com/ZaurHa" target="_blank" rel="noopener noreferrer" className="kontakt-info-link">
                  <div className="kontakt-info-icon">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </div>
                  <div>
                    <div className="kontakt-info-link-label">GitHub</div>
                    <div className="kontakt-info-link-value">github.com/ZaurHa</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/zaur-hatuev-8559b91a1/" target="_blank" rel="noopener noreferrer" className="kontakt-info-link">
                  <div className="kontakt-info-icon">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </div>
                  <div>
                    <div className="kontakt-info-link-label">LinkedIn</div>
                    <div className="kontakt-info-link-value">Zaur Hatuev</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="kontakt-info-card">
              <h3 className="kontakt-info-title">{t.responseTime}</h3>
              <p className="kontakt-info-text">{t.responseDesc}</p>
              <div className="kontakt-hours">
                <div className="kontakt-hour"><span className="kontakt-dot" />{t.hours1}</div>
                <div className="kontakt-hour"><span className="kontakt-dot" />{t.hours2}</div>
              </div>
            </div>

            <div className="kontakt-info-card">
              <h3 className="kontakt-info-title">{t.nextSteps}</h3>
              <ol className="kontakt-steps">
                <li><span className="kontakt-step-num">1</span>{t.step1}</li>
                <li><span className="kontakt-step-num">2</span>{t.step2}</li>
                <li><span className="kontakt-step-num">3</span>{t.step3}</li>
                <li><span className="kontakt-step-num">4</span>{t.step4}</li>
              </ol>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
