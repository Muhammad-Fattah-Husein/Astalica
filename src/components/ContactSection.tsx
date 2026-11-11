'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import BlurText from '@/components/reactbits/BlurText';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    emailAddress: '',
    serviceType: 'private-styling',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMsg(json.error || 'Gagal mengirim pesan. Periksa kembali isian Anda.');
        setIsSubmitting(false);
        return;
      }

      const waText = encodeURIComponent(
        `Halo Concierge Astalica, saya ${formData.fullName} baru saja mengirim permintaan konsultasi (${formData.serviceType}) melalui website. ${formData.message || ''}`
      );
      setSubmittedWhatsappUrl(`https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        whatsappNumber: '',
        emailAddress: '',
        serviceType: 'private-styling',
        message: '',
      });
    } catch {
      setErrorMsg('Terjadi gangguan koneksi server. Silakan coba beberapa saat lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hubungi-kami" className="w-full py-20 lg:py-28 bg-surface">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-sans">
            FLAGSHIP BUTIK &amp; RESERVASI
          </span>
          <BlurText
            as="h2"
            text="Kunjungi Butik & Hubungi Concierge"
            delay={60}
            stepDuration={0.35}
            animateBy="words"
            direction="bottom"
            distance={24}
            blur={6}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-on-surface max-w-2xl leading-tight font-semibold mt-2 justify-center text-center"
          />
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mt-4 leading-relaxed">
            Kami siap menyambut kehadiran Anda di ruang privat atelier kami untuk pengalaman belanja yang personal dan tenang.
          </p>
          <div className="w-16 h-0.5 bg-primary mt-5" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Details & Inquiry Form */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Information Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-border-champagne/60 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-on-surface mb-6">
                Informasi Flagship Store
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                      Alamat Flagship
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface font-medium mt-0.5 leading-snug">
                      {siteConfig.contact.address}
                    </p>
                  </div>
                </div>

                {/* Phone / WA */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                      WhatsApp &amp; Telepon
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface font-medium mt-0.5 leading-snug">
                      {siteConfig.contact.phone} <br />
                      {siteConfig.contact.tel}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                      Surel Resmi
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface font-medium mt-0.5 leading-snug">
                      {siteConfig.contact.email} <br />
                      {siteConfig.contact.pressEmail}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                      Jam Operasional
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface font-medium mt-0.5 leading-snug">
                      {siteConfig.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Elegant Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-border-champagne/60 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-on-surface mb-2">
                Kirim Pesan ke Tim Concierge
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
                Isi data berikut untuk permintaan appointment private styling, custom veil, atau katalog korporat.
              </p>

              {isSubmitted ? (
                <div
                  role="status"
                  className="p-6 bg-secondary-fixed/50 border border-secondary/30 rounded-2xl flex flex-col items-center text-center gap-3 animate-in fade-in duration-300"
                >
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                  <h4 className="font-serif text-base font-semibold text-on-surface">
                    Permintaan Anda Telah Tersimpan!
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                    Tim Concierge Astalica akan menghubungi Anda melalui nomor WhatsApp dalam waktu maksimal 1 jam kerja.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    {submittedWhatsappUrl && (
                      <a
                        href={submittedWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-secondary-hover text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Lanjutkan via WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-primary hover:underline px-3 py-2"
                    >
                      Kirim pesan lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Formulir Konsultasi Concierge" className="flex flex-col gap-4">
                  {errorMsg && (
                    <div role="alert" className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fullName"
                        className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Nama Lengkap <span className="text-error" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Contoh: Sarah Anindya"
                        className="px-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="whatsappNumber"
                        className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Nomor WhatsApp <span className="text-error" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            whatsappNumber: e.target.value,
                          })
                        }
                        placeholder="0812-XXXX-XXXX"
                        className="px-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="emailAddress"
                        className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Alamat Email <span className="text-error" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        required
                        value={formData.emailAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailAddress: e.target.value,
                          })
                        }
                        placeholder="sarah@domain.com"
                        className="px-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all placeholder:text-outline-variant"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="serviceType"
                        className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                      >
                        Subjek / Kebutuhan
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        className="px-4 py-3 bg-surface text-on-surface text-sm rounded-full border border-border-champagne/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                      >
                        <option value="private-styling">Private Styling Concierge</option>
                        <option value="bespoke-bridal">Bespoke Bridal &amp; Custom Veil</option>
                        <option value="corporate-gifting">Corporate &amp; VIP Gifting</option>
                        <option value="care-restoration">Atelier Hijab Care</option>
                        <option value="general">Kunjungan Butik Umum</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                    >
                      Pesan atau Permintaan Khusus
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tuliskan tanggal preferensi kunjungan atau detail busana yang Anda impikan..."
                      className="px-4 py-3 bg-surface text-on-surface text-sm rounded-2xl border border-border-champagne/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline-variant"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary text-on-secondary hover:bg-secondary-hover text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Pesan ke Concierge</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps & Boutique Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Interactive Embedded Google Map */}
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-border-champagne/60 bg-surface-container-high h-[360px] flex flex-col justify-end p-4 sm:p-6">
              {/* Google Maps iframe with accessibility title and lazy loading */}
              <iframe
                title="Peta Lokasi Astalica Grand Atelier Senopati"
                src={siteConfig.googleMaps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="relative z-10 bg-surface/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-border-champagne/70 shadow-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">
                      {siteConfig.contact.locationName}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-on-surface-variant">
                      {siteConfig.contact.locationFloor}
                    </p>
                  </div>
                </div>

                <a
                  href={siteConfig.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary text-xs font-semibold rounded-full transition-colors shadow-sm"
                >
                  <span>Petunjuk Arah</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Boutique Architectural Facade Showcase */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-border-champagne/50 group">
                <Image
                  src="/images/boutique-interior.webp"
                  alt="Interior VIP Lounge Astalica Grand Atelier dengan pencahayaan hangat dan podium marmer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-surface/85 backdrop-blur-sm text-on-surface text-[11px] font-medium rounded-full border border-border-champagne/40">
                  Interior VIP Lounge
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-border-champagne/50 group">
                <Image
                  src="/images/boutique-facade.webp"
                  alt="Fasad eksterior modern minimalis butik adibusana Astalica di Senopati Jakarta"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-surface/85 backdrop-blur-sm text-on-surface text-[11px] font-medium rounded-full border border-border-champagne/40">
                  Fasad Butik Senopati
                </div>
              </div>
            </div>

            {/* VIP Valet & Fitting Callout */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-primary-fixed to-tertiary-fixed text-on-primary-fixed rounded-2xl border border-primary/20 shadow-sm flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-surface/90 text-primary flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-on-surface">
                  Layanan Valet &amp; Private Fitting Room
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                  {siteConfig.contact.valetNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
