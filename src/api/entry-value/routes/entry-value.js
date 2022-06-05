'use strict';

/**
 * entry-value router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::entry-value.entry-value');
