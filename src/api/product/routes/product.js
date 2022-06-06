'use strict';

/**
 * product router.
 */
const yup = require("yup")
const { createCoreRouter } = require('@strapi/strapi').factories;
const newProductSchema = yup.object({
  Title: yup.string().required(),
  Percent: yup.number().positive().required(),
  Descriptin: yup.string(),
  entry_items: yup.array().of(yup.object({
    Title: yup.string().required(),
    defaultValue: yup.number().positive()
  }))
})

module.exports = createCoreRouter('api::product.product', {
  config: {
    create: {
      middlewares: [{
        name: 'global::verifyBody', config: newProductSchema
      }]
    }
  }
});
