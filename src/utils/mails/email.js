import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import Response from 'utils/response';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL_ADDRESS,
    pass: process.env.GMAIL_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class Emails {
  /**
   * sets header for email
   * @param {object} data
   * @returns {object} email header
   */
  static header(data) {
    const from = data.from || process.env.FROM_EMAIL;
    const { to } = data;
    const { subject } = data;
    return {
      from,
      to,
      subject,
    };
  }

  /**
   * sends email
   * @param {object} res - response object
   * @param {object} header - email headers
   * @param {object} template - email template
   * @returns {object} response
   */
  static async sendMail(res, header, template) {
    try {
      const response = await transporter.sendMail({ ...header, ...template });
      return response;
    } catch (error) {
      return Response.customResponse(res, 500, 'Email not delivered', error);
    }
  }
}

export default Emails;
