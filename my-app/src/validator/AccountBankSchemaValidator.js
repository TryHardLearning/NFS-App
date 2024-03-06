// user.schema.js
const yup = require('yup');

const AccountBankSchema = yup.object({
  id: yup.number().positive.nullable(),
  bankName: yup.string().required(),
  accountNumber: yup.string().required(),
  userAccount: yup.string().required(),
});

module.exports = AccountBankSchema;
