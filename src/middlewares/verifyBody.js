'use strict';
/**
 * `verifyBody` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      await config.validate(ctx.request.body.data)
      await next();
    } catch (e) {
      if (e.errors) {
        return ctx.badRequest(e.errors[0])
      } {
        return ctx.badRequest("Something went wrong")
      }
    }
  };
};
