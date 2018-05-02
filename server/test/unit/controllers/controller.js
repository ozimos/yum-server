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
  describe('getAllRows()', () => {
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

      controller.getAllRows()
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findAll()).thenResolve([]);
      controller.getAllRows()
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findAll()).thenReject(error);
      controller.getAllRows()
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('getRowById()', () => {
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


      controller.getRowById(req)
        .then(response => expect(response.data).to.eql(expectedResponse));
    });
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'no records available';

      td.when(Table.findById(req.params.id)).thenResolve(null);
      controller.getRowById(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };
      td.when(Table.findById(req.params.id)).thenReject(error);
      controller.getRowById(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('createRow()', () => {
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
      controller.createRow(req)
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
      controller.createRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('updateRow()', () => {
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

      controller.updateRow(req)
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
      controller.updateRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
  describe('deleteRow()', () => {
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
      controller.deleteRow(req)
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
      controller.deleteRow(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });
});