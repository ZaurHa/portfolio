import React, { useState } from 'react';

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Hier könnte ein echter Versand erfolgen
  }

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Kontakt</h1>
      <p>Sie erreichen uns unter:</p>
      <p>
        Max Mustermann<br />
        Musterstraße 1<br />
        12345 Musterstadt<br />
        E-Mail: info@example.com<br />
        Telefon: 01234 / 567890
      </p>
      <h2>Kontaktformular</h2>
      {submitted ? (
        <div style={{ color: 'green', margin: '1rem 0' }}>Vielen Dank für Ihre Nachricht!</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <input name="name" type="text" placeholder="Ihr Name" value={form.name} onChange={handleChange} required style={{ padding: '0.5rem', fontSize: '1rem' }} />
          <input name="email" type="email" placeholder="Ihre E-Mail" value={form.email} onChange={handleChange} required style={{ padding: '0.5rem', fontSize: '1rem' }} />
          <textarea name="message" placeholder="Ihre Nachricht" value={form.message} onChange={handleChange} required rows={5} style={{ padding: '0.5rem', fontSize: '1rem' }} />
          <button type="submit" style={{ padding: '0.7rem', fontSize: '1rem', background: '#0a5e53', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Absenden</button>
        </form>
      )}
    </main>
  );
} 