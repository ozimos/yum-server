export default {
  up: queryInterface => queryInterface.bulkInsert('Menus', [{
    title: 'Today'
  }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Menus', null)
};