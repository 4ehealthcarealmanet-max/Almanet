import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../constants';

export async function sendContactForm(form: HTMLFormElement): Promise<void> {
  await emailjs.sendForm(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
    form,
    EMAILJS_CONFIG.PUBLIC_KEY,
  );
}

export async function sendJobApplication(form: HTMLFormElement): Promise<void> {
  await emailjs.sendForm(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.APPLY_TEMPLATE_ID,
    form,
    EMAILJS_CONFIG.PUBLIC_KEY,
  );
}