/* =====================================================
   CONTACT & FEEDBACK FORM COMPONENT
   Allows users to send feedback via EmailJS or API
   WCAG 2.1 compliant with proper labels and ARIA
   ===================================================== */

import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      /* EmailJS integration - replace with your service/template IDs */
      if (window.emailjs) {
        await window.emailjs.send(
          'service_blockquest', // Replace with your EmailJS service ID
          'template_feedback',   // Replace with your EmailJS template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'BlockQuest Team'
          },
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );
      } else {
        /* Fallback: Log to console if EmailJS not configured */
        console.log('Feedback submitted:', formData);
      }

      setStatus({
        type: 'success',
        message: 'Thanks for your feedback! We\'ll get back to you soon. 🚀'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact"
      className="contact-section py-16 px-4 relative overflow-hidden"
      aria-labelledby="contact-title"
      role="region"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-cyan-400" aria-hidden="true" />
            <h2 
              id="contact-title"
              className="text-2xl sm:text-3xl font-black text-cyan-400"
            >
              GOT FEEDBACK?
            </h2>
          </div>
          <p className="text-gray-400">
            We love hearing from our players and readers! Send us your thoughts.
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-2xl bg-gray-900/60 border-2 border-gray-700/50"
          aria-label="Contact form"
        >
          {/* Name Field */}
          <div>
            <label 
              htmlFor="contact-name"
              className="block text-sm font-bold text-gray-300 mb-2"
            >
              Your Name
            </label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full h-12 bg-gray-800/60 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
              aria-required="true"
            />
          </div>

          {/* Email Field */}
          <div>
            <label 
              htmlFor="contact-email"
              className="block text-sm font-bold text-gray-300 mb-2"
            >
              Email Address
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full h-12 bg-gray-800/60 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
              aria-required="true"
            />
          </div>

          {/* Message Field */}
          <div>
            <label 
              htmlFor="contact-message"
              className="block text-sm font-bold text-gray-300 mb-2"
            >
              Your Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us what you think, report bugs, or suggest new features..."
              rows={5}
              className="w-full px-4 py-3 bg-gray-800/60 border-2 border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none resize-none"
              aria-required="true"
            />
          </div>

          {/* Status Message */}
          {status.type && (
            <div 
              className={`flex items-center gap-2 p-4 rounded-lg ${
                status.type === 'success' 
                  ? 'bg-green-900/30 border border-green-500/30 text-green-400' 
                  : 'bg-red-900/30 border border-red-500/30 text-red-400'
              }`}
              role="alert"
              aria-live="polite"
            >
              {status.type === 'success' 
                ? <CheckCircle className="w-5 h-5" aria-hidden="true" /> 
                : <AlertCircle className="w-5 h-5" aria-hidden="true" />
              }
              <span>{status.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-lg rounded-xl border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-blue-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                SEND FEEDBACK
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
