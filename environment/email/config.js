import { createTestAccount } from 'nodemailer';

export default async () => ({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: await createTestAccount(),
});
