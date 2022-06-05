'use strict';

/**
 * entry-value service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::entry-value.entry-value');
