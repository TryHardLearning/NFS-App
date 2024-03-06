const yup = require('yup');

const TransactionReceivedSchema = yup.object({
  id: yup.number().positive.nullable(),
  type: yup.string().required(),
  month: yup.number().positive().min(1).max(12).required(),
  year: yup.number().positive().required(),
  thePrice: yup.number().positive().required(),
  accountBank: yup.number().positive().required(),
});

module.exports = TransactionReceivedSchema;
