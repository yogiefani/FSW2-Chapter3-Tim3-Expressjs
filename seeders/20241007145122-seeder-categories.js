'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        category_name: 'Electronics',
        description: 'Devices and gadgets',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Books',
        description: 'Various genres of books',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Clothing',
        description: 'Apparel and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Home & Garden',
        description: 'Furniture and garden supplies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Sports',
        description: 'Sports equipment and gear',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
