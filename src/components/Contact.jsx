'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText, Phone, Send, User, MessageSquare } from 'lucide-react';
import './Contact.css';

const CONTACT_LINKS = [
  { name: 'Email', value: 'kiranbabubandela6@gmail.com', icon: Mail, url: 'mailto:kiranbabubandela6@gmail.com', color: '#00F0FF' },
  { name: 'LinkedIn', value: 'linkedin.com/in/kiranbabu18', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18', color: '#8B5CF6' },
  { name: 'GitHub', value: 'github.com/kiran1627', icon: Github, url: 'https://github.com/kiran1627', color: '#FF006E' },
  { name: 'WhatsApp', value: '+91 93813 42247', icon: Phone, url: 'https://wa.me/919381342247', color: '#33FFBD' },
  { name: 'Resume', value: 'Download PDF', icon: FileText, url: '/Kiran_Resume.pdf', color: '#3B82F6' }
];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-premium-section">
      <div className="contact-grid-overlay" />
      <div className="contact-glow-orb" />

      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-cinematic">
          <span className="section-eyebrow">
            <Mail size={12} className="pulse-icon" /> GET IN TOUCH
          </span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">CONTACT</span>
          </h2>
          <p className="section-subtitle-cinematic">
            Reach out for opportunities, collaborations, or just to say hello.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Contact Cards */}
          <motion.div 
            className="contact-cards-column"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {CONTACT_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-card glass-panel-premium"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ '--card-color': link.color }}
                >
                  <div className="contact-icon-wrapper" style={{ background: `${link.color}15`, color: link.color }}>
                    <Icon size={20} />
                  </div>
                  <div className="contact-info-content">
                    <span className="contact-info-label">{link.name}</span>
                    <span className="contact-info-value">{link.value}</span>
                  </div>
                  <div className="contact-card-border" style={{ background: link.color }} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-column glass-panel-premium"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="form-header">
              <h3>Send a Message</h3>
              <p>Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-contact-form">
              <div className="form-group">
                <div className="input-wrapper">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required 
                    className="premium-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper">
                  <Mail size={16} className="input-icon" />
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    required 
                    className="premium-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper textarea-wrapper">
                  <MessageSquare size={16} className="input-icon" />
                  <textarea 
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your Message" 
                    required 
                    className="premium-input premium-textarea"
                    rows="5"
                  />
                </div>
              </div>

              <button type="submit" className="premium-submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={16} className={isSubmitting ? 'sending-icon' : ''} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
