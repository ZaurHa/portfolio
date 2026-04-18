"use client";

import { useState } from "react";
import { FadeInSection } from "../../../components/HomeAnimations";
import type { Dictionary, Locale } from "../../../lib/i18n";

export default function KontaktClient({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const [formData, setFormData] = useState({ name: "", email: "", company: "", project: "", budget: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", project: "", budget: "", message: "" });
      } else {
        console.error("API-Fehler:", result.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Netzwerk-Fehler:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="kontakt-page">
      <div className="page-hero">
        <FadeInSection>
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h1 className="page-hero-title">{t.heroTitle}</h1>
          <p className="page-hero-desc">{t.heroDesc}</p>
        </FadeInSection>
      </div>

      <div className="kontakt-grid section-wrap">
        <FadeInSection>
          <div className="kontakt-form-wrap">
            <h2 className="kontakt-form-title">{t.formTitle}</h2>

            {submitStatus === "success" && (
              <div className="form-status form-success">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8l4 4 8-8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.successMsg}
              </div>
            )}
            {submitStatus === "error" && (
              <div className="form-status form-error">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 5v4M8 11v.5" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {t.errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">{t.labelName}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder={t.placeholderName} />
                </div>
                <div className="form-field">
                  <label className="form-label">{t.labelEmail}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder={t.placeholderEmail} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">{t.labelCompany}</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder={t.placeholderCompany} />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">{t.labelProject}</label>
                  <select name="project" value={formData.project} onChange={handleChange} className="form-input">
                    <option value="">{t.selectProject}</option>
                    <option value="website">{t.projectWebsite}</option>
                    <option value="webapp">{t.projectWebapp}</option>
                    <option value="design">{t.projectDesign}</option>
                    <option value="branding">{t.projectBranding}</option>
                    <option value="consulting">{t.projectConsulting}</option>
                    <option value="other">{t.projectOther}</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">{t.labelBudget}</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} className="form-input">
                    <option value="">{t.selectBudget}</option>
                    <option value="790-1500">{t.budget1}</option>
                    <option value="1500-2500">{t.budget2}</option>
                    <option value="2500-5000">{t.budget3}</option>
                    <option value="5000+">{t.budget4}</option>
                    <option value="discuss">{t.budgetOpen}</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">{t.labelMessage}</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required className="form-input form-textarea" placeholder={t.placeholderMessage} />
              </div>

              <button type="submit" disabled={isSubmitting} className="cta-btn-primary w-full justify-center">
                {isSubmitting ? t.submitting : t.submit}
                {!isSubmitting && (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
                <a href="mailto:zaur@brandwerkx.de" className="kontakt-info-link">
                  <div className="kontakt-info-icon">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z" /></svg>
                  </div>
                  <div>
                    <div className="kontakt-info-link-label">E-Mail</div>
                    <div className="kontakt-info-link-value">zaur@brandwerkx.de</div>
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
