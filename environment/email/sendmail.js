import { createTransport, getTestMessageUrl } from 'nodemailer';
import config from './config.js';

export default async ({
  headers,
  body,
  attachments = [],
}) => {
  const transport = await createTransport(await config());
  const messageObject = {
    from: process.env.MAIL_SENDER,
    ...headers,
    html: body,
    attachments,
  };

  const info = await transport.sendMail(messageObject);

  const emailUrl = await getTestMessageUrl(info);
  if (process.env.DEBUG_MODE === 'On') {
    console.log({ info, emailUrl });
  }

  return { info, emailUrl };
};
