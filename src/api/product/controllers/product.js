'use strict';

/**
 *  product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async create(ctx) {
    const { Title, Percent, Description } = ctx.request.body.data
    const { id } = await strapi.entityService.create('api::product.product', {
      data: {
        Title: Title,
        Percent: Percent,
        Description: Description,
      }
    })
    if (ctx.request.body.data.entry_items && ctx.request.body.data.entry_items.length > 0) {
      const entry_item_array = ctx.request.body.data.entry_items.map((entry_item) => {
        return ({
          ...entry_item,
          product: parseInt(id)
        })
      })
      for (let i = 0; i < entry_item_array.length; i++) {
        await strapi.entityService.create("api::entry-item.entry-item", {
          data: entry_item_array[i]
        })
      }

    }
    return { id }
  },
  async delete(ctx) {
    const product = await strapi.entityService.findOne("api::product.product", ctx.request.params.id, {
      populate: ["entry_items"]
    })
    if (product) {
      for (let i = 0; i < product.entry_items.length; i++) {
        await strapi.entityService.delete("api::entry-item.entry-item", product.entry_items[i].id)
      }
      await strapi.entityService.delete("api::product.product", product.id)
    }
    return { id: ctx.request.params.id }
  }
}));
