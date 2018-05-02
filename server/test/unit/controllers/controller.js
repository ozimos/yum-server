/* eslint import/no-extraneous-dependencies: off */

import {
  expect
} from 'chai';
import td from 'testdouble';
import Controller from '../../../src/controllers/controller.js';

const Table = td.object();
const controller = new Controller(Table);
describe('Center Controllers', () => {
  afterEach(() => td.reset());
  describe('getAllRecords()', () => {
    it('should return a list of rows if data is returned from database', () => {
      const expectedResponse = [
        {
          id: 1,
          title: 'Beef with Rice',
          description: 'plain rice with ground beef',
          price: 1500,
        },
        {
          id: 2,
          title: 'Beef with Fries',
          description: 'beef slab with fried potato slivers',
          price: 2000,
        }
      ];

      td.when(Table.findAll()).thenResolve(expectedResponse);

      controller.getAllRecords()
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findAll()).thenResolve([]);
      controller.getAllRecords()
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findAll()).thenReject(error);
      controller.getAllRecords()
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('getSingleRecord()', () => {
    const req = {
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should return a row if data is returned from database', () => {
      const expectedResponse = {
        id: req.params.id,
        title: 'Beef with Fries',
        description: 'beef slab with fried potato slivers',
        price: 2000,
      };

      td.when(Table.findById(req.params.id)).thenResolve(expectedResponse);


      controller.getSingleRecord(req)
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findById(req.params.id)).thenResolve(null);
      controller.getSingleRecord(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findById(req.params.id)).thenReject(error);
      controller.getSingleRecord(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('postRecord()', () => {
    it('should create a row', () => {
      const req = {
        body: {
          title: 'Beef with Fries',
          description: 'beef slab with fried potato slivers',
          price: 2000,
        }
      };
      const returnValue = {
        body: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
          title: 'Beef with Fries',
          description: 'beef slab with fried potato slivers',
          price: 2000,
        }
      };
      td.when(Table.create(req.body)).thenResolve(returnValue.body);
      controller.postRecord(req)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.data).to.eql(returnValue.body);
        });
    });
    it('should return an error message if error occurs when accessing database', () => {
      const req = {
        body: 'wrong input',
      };
      const error = {
        message: 'database error'
      };
      td.when(Table.create(req.body)).thenReject(error);
      controller.postRecord(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('updateRecord()', () => {
    const req = {
      body: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
        title: 'Beef with Fries',
        description: 'beef slab with fried potato slivers',
        price: 2000,
      },
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should update a row', () => {
      td.when(Table.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })).thenResolve(req.body);

      controller.updateRecord(req)
        .then(response =>
          expect(response.data).to.eql(req.body));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true
      })).thenReject(error);
      controller.updateRecord(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
  describe('deleteRecord()', () => {
    const req = {
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should delete a row', () => {
      const req = {
        params: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
        }
      };
      td.when(Table.destroy({
        where: {
          id: req.params.id
        },
      })).thenResolve(1);
      controller.deleteRecord(req)
        .then(response =>
          expect(response.data).to.eql(1));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.destroy({
        where: {
          id: req.params.id
        },
      })).thenReject(error);
      controller.deleteRecord(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
});