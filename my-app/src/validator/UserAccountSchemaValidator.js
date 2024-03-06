// user.schema.js
const yup = require('yup');

const userAccountSchema = yup.object({
  id: yup.number().positive.nullable(),
  username: yup.string().email.required(),
  password: yup.string().required(),
  displayName: yup.string.nullable(),
});

module.exports = userAccountSchema;