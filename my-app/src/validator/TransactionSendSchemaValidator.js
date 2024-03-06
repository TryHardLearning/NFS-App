const yup = require('yup');

const TransactionSendSchema = yup.object({
  id: yup.number().positive.nullable(),
  type: yup.string().required(),
  priority: yup.number().positive().required(),
  month: yup.number().positive().min(1).max(12).required(),
  year: yup.number().positive().required(),
  thePrice: yup.number().positive().required(),
  accountBank: yup.number().positive().required(),
});

module.exports = TransactionSendSchema;
