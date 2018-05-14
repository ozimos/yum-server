export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
      firstName: 'Tovieye',
      lastName: 'Ozi',
      email: 'ad.min@gmail.com',
      password: '$2a$10$JNmon8b2KLUT.31FsTwyDeSz3ge/BZ5OOpc6mq32CzdAfU.DCz.4e',
      isCaterer: true
    },
    {
      id: '20a0dcc4-0a78-43f6-881b-884dd6f32861',
      firstName: 'Toviey',
      lastName: 'Oz',
      email: 'adm.in@gmail.com',
      password: '$2a$10$JNmon8b2KLUT.31FsTwyDeSz3ge/BZ5OOpc6mq32CzdAfU.DCz.4e',
      isCaterer: false
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null)
};