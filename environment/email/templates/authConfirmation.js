export default ({ token }) => ({
  subject: 'Restore access link',
  body: `<a href="http://localhost/auth/confirm?restore=${token}">restore link</a>`,
});
