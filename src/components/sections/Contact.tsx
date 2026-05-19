// src/components/sections/Contact.tsx
"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";
const WA_EMAIL = process.env.NEXT_PUBLIC_WA_EMAIL ?? "";
const WA_INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM ?? "";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitRef = useRef<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 80%" },
      });
      gsap.from(infoRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.length < 2)
      newErrors.name = "Nama minimal 2 karakter";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = "Format email tidak valid";

    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Pesan minimal 10 karakter";

    const dangerousPattern = /<script|javascript:|on\w+=/i;
    if (dangerousPattern.test(formData.message))
      newErrors.message = "Pesan mengandung karakter tidak valid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitize = (str: string) =>
    str.replace(
      /[<>&"']/g,
      (c) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          '"': "&quot;",
          "'": "&#39;",
        })[c] ?? c,
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitRef.current < 30000) {
      const sisa = Math.ceil((30000 - (now - lastSubmitRef.current)) / 1000);
      setErrors({ submit: `Mohon tunggu ${sisa} detik sebelum mengirim lagi.` });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    lastSubmitRef.current = now;

    const msg = encodeURIComponent(
      `Halo Hydralune! 👋\n\nNama: ${sanitize(formData.name)}\nEmail: ${sanitize(formData.email)}\nPerusahaan: ${sanitize(formData.company)}\n\nPesan:\n${sanitize(formData.message)}`,
    );

    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");

    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", company: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1.1rem",
    borderRadius: "0.875rem",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255,255,255,0.7)",
    fontSize: "0.875rem",
    color: "#1e293b",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "var(--font-main)",
    boxSizing: "border-box",
  };

  const contactCards = [
    {
      label: "WhatsApp",
      value: "+62 8XX XXXX XXXX",
      href: `https://wa.me/${WA_NUMBER}`,
      bg: "#25D366",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: WA_EMAIL || "hello@hydralune.com",
      href: `mailto:${WA_EMAIL || "hello@hydralune.com"}`,
      bg: "#1e293b",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      value: `@${WA_INSTAGRAM || "hydralune.id"}`,
      href: `https://instagram.com/${WA_INSTAGRAM || "hydralune.id"}`,
      bg: "#E1306C",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: "6rem 0",
        background: "var(--brand-neutral)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "9999px",
          background: "var(--brand-tertiary)",
          opacity: 0.4,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "35vw",
          height: "35vw",
          borderRadius: "9999px",
          background: "var(--brand-primary)",
          opacity: 0.4,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "3.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              color: "#94a3b8",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Get In Touch
          </span>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Mari berkolaborasi
            <br />
            <span style={{ color: "#cbd5e1" }}>bersama kami.</span>
          </h2>
        </div>

        {/* 2 kolom */}
        <div className="contact-grid">
          {/* Form */}
          <div
            ref={formRef}
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(16px)",
              borderRadius: "2rem",
              padding: "2.5rem",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "3rem 0" }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "9999px",
                    background: "var(--brand-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#1e293b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.5rem" }}>
                  Pesan Terkirim!
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>
                  WhatsApp kami akan segera membalas pesanmu.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div className="form-name-email">
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "0.4rem" }}>
                      Nama *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama kamu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.25)"; e.target.style.background = "rgba(255,255,255,0.95)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.background = "rgba(255,255,255,0.7)"; }}
                    />
                    {errors.name && (
                      <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "0.4rem" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@kamu.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.25)"; e.target.style.background = "rgba(255,255,255,0.95)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.background = "rgba(255,255,255,0.7)"; }}
                    />
                    {errors.email && (
                      <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "0.4rem" }}>
                    Perusahaan / Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Nama perusahaan (opsional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.25)"; e.target.style.background = "rgba(255,255,255,0.95)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.background = "rgba(255,255,255,0.7)"; }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "0.4rem" }}>
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Ceritakan tentang kebutuhanmu atau ide kolaborasi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.25)"; e.target.style.background = "rgba(255,255,255,0.95)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.1)"; e.target.style.background = "rgba(255,255,255,0.7)"; }}
                  />
                  {errors.message && (
                    <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "0.3rem", display: "block" }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.95rem",
                    borderRadius: "0.875rem",
                    background: isSubmitting ? "#94a3b8" : "#1e293b",
                    color: "#fff",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    width: "100%",
                    fontFamily: "var(--font-main)",
                    marginTop: "0.5rem",
                    transition: "background 0.2s",
                  }}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {isSubmitting ? "Mengirim..." : "Kirim via WhatsApp"}
                </motion.button>

                {errors.submit && (
                  <p style={{ fontSize: "0.75rem", color: "#ef4444", textAlign: "center", margin: "0.5rem 0 0" }}>
                    {errors.submit}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Info */}
          <div
            ref={infoRef}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", margin: "0 0 0.75rem" }}>
                Tertarik berkolaborasi?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, margin: 0 }}>
                Kami terbuka untuk kerjasama distribusi, reseller, brand
                ambassador, hingga kolaborasi konten. Hubungi kami dan tim kami
                akan merespons dalam 1×24 jam.
              </p>
            </div>

            {contactCards.map((contact) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  borderRadius: "1.25rem",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  textDecoration: "none",
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "0.875rem",
                    background: contact.bg,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {contact.icon}
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: "0 0 0.2rem", fontWeight: 500 }}>
                    {contact.label}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#1e293b", margin: 0, fontWeight: 600 }}>
                    {contact.value}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: "auto", opacity: 0.3 }}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            ))}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                borderRadius: "9999px",
                background: "var(--brand-primary)",
                border: "1px solid rgba(0,0,0,0.06)",
                width: "fit-content",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "#22c55e", flexShrink: 0 }} />
              <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
                Respon dalam 1×24 jam
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .form-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .contact-grid {
            gap: 2.5rem;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .form-name-email {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
