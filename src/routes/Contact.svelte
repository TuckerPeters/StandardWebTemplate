<script lang="ts">
    import { fade } from 'svelte/transition';
  
    let formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  
    let isSubmitting = false;
    let showSuccessMessage = false;
  
    const officeLocations = [
      {
        city: 'New York',
        address: '123 Broadway, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        email: 'ny@example.com',
        hours: 'Mon-Fri: 9AM-6PM EST'
      },
      {
        city: 'London',
        address: '456 Oxford Street, London, UK W1C 1AP',
        phone: '+44 20 1234 5678',
        email: 'london@example.com',
        hours: 'Mon-Fri: 9AM-6PM GMT'
      },
      {
        city: 'Tokyo',
        address: '789 Shibuya, Tokyo, Japan 150-0002',
        phone: '+81 3 1234 5678',
        email: 'tokyo@example.com',
        hours: 'Mon-Fri: 9AM-6PM JST'
      }
    ];
  
    async function handleSubmit() {
      isSubmitting = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccessMessage = true;
        formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
  
        setTimeout(() => {
          showSuccessMessage = false;
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        isSubmitting = false;
      }
    }
  </script>
  
  <div class="contact-container" transition:fade>
    <section class="hero">
      <h1>Contact Us</h1>
      <p class="subtitle">Get in touch with our team</p>
    </section>
  
    <section class="contact-grid">
      <div class="contact-form">
        <h2>Send us a Message</h2>
        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              placeholder="Your name"
            />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              placeholder="your.email@example.com"
            />
          </div>
  
          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              type="text"
              id="subject"
              bind:value={formData.subject}
              required
              placeholder="How can we help?"
            />
          </div>
  
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              placeholder="Tell us more about your inquiry..."
              rows="5"
            ></textarea>
          </div>
  
          <button type="submit" class="submit-button" disabled={isSubmitting}>
            {#if isSubmitting}
              Sending...
            {:else}
              Send Message
            {/if}
          </button>
  
          {#if showSuccessMessage}
            <div class="success-message" transition:fade>
              Message sent successfully! We'll get back to you soon.
            </div>
          {/if}
        </form>
      </div>
  
      <div class="contact-info">
        <h2>Our Offices</h2>
        <div class="office-locations">
          {#each officeLocations as office}
            <div class="office-card">
              <h3>{office.city}</h3>
              <div class="office-details">
                <p class="address">
                  <span class="icon location"></span>
                  {office.address}
                </p>
                <p class="phone">
                  <span class="icon phone"></span>
                  {office.phone}
                </p>
                <p class="email">
                  <span class="icon email"></span>
                  {office.email}
                </p>
                <p class="hours">
                  <span class="icon clock"></span>
                  {office.hours}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>How quickly do you respond?</h3>
          <p>We typically respond to all inquiries within 24 business hours.</p>
        </div>
        <div class="faq-item">
          <h3>Do you offer support?</h3>
          <p>Yes, we provide comprehensive support for all our products and services.</p>
        </div>
        <div class="faq-item">
          <h3>What are your business hours?</h3>
          <p>Our support team is available Monday through Friday, 9AM-6PM in your local timezone.</p>
        </div>
        <div class="faq-item">
          <h3>Do you work internationally?</h3>
          <p>Yes, we work with clients globally and have offices in multiple time zones.</p>
        </div>
      </div>
    </section>
  </div>
  
  <style lang="scss">
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
  
    .hero {
      text-align: center;
      padding: 4rem 0;
  
      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        color: transparent;
      }
  
      .subtitle {
        font-size: 1.25rem;
        opacity: 0.8;
      }
    }
  
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin: 4rem 0;
  
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }
  
    .contact-form {
      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
  
      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  
      label {
        font-weight: 500;
      }
  
      input, textarea {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background-color: var(--background-color);
        color: var(--text-color);
        font: inherit;
        transition: all 0.2s ease;
  
        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }
  
        &::placeholder {
          opacity: 0.5;
        }
      }
  
      textarea {
        resize: vertical;
        min-height: 120px;
      }
    }
  
    .submit-button {
      padding: 1rem 2rem;
      background-color: var(--primary-color);
      color: white;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: all 0.2s ease;
  
      &:hover:not(:disabled) {
        background-color: var(--secondary-color);
        transform: translateY(-2px);
      }
  
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  
    .success-message {
      padding: 1rem;
      background-color: #10b981;
      color: white;
      border-radius: 0.5rem;
      text-align: center;
      margin-top: 1rem;
    }
  
    .contact-info {
      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
    }
  
    .office-locations {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  
    .office-card {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
      h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
      }
    }
  
    .office-details {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
  
      p {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.875rem;
      }
    }
  
    .icon {
      display: block;
      width: 20px;
      height: 20px;
      background-color: var(--text-color);
      opacity: 0.7;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
    }
  
    .location {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'/%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'/%3E%3C/svg%3E");
    }
  
    .phone {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'/%3E%3C/svg%3E");
    }
  
    .email {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/%3E%3C/svg%3E");
    }
  
    .clock {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
    }
  
    .faq-section {
      padding: 4rem 0;
  
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
      }
    }
  
    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    .faq-item {
      padding: 2rem;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      transition: all 0.2s ease;
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
  
      h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
      }
  
      p {
        font-size: 0.875rem;
        opacity: 0.8;
        line-height: 1.6;
      }
    }
  </style>