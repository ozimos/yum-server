/* eslint import/no-extraneous-dependencies: off */
import {
  expect
} from 'chai';
import td from 'testdouble';
import Controller from '../../../src/controllers/controller.js';


describe('Center Controllers', () => {

  const res = td.object();
  const model = [{
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
    },
  ];
  const noModel = null;

  afterEach(() => td.reset());

  describe('getAllRecords()', () => {

    const errorResponse = 'records unavailable';
    const req = {};

    it('should return all records', () => {

      const controller = new Controller(model);
      td.when(res.status(td.matchers.isA(Number))).thenReturn(res);
      td.when(res.json(this.model)).thenReturn((() => {
        res.body = model;
        return res;
      })());
      controller.getAllRecords(req, res);
      expect(res.body).to.eql(model);
    });

    it('should return an error message if no data in database', () => {

      const controller = new Controller(noModel);
      td.when(res.status(td.matchers.isA(Number))).thenReturn(res);
      td.when(res.json(this.model)).thenReturn((() => {
        res.body = errorResponse;
        return res;
      })());

      controller.getAllRecords(req, res);
      expect(res.body).to.equal(errorResponse);
    });
  });

  describe('getSingleRecord()', () => {

    it('should return a record if data is returned from database', () => {
      const req = {
        params: {
          id: '1'
        }
      };
      const controller = new Controller(model);

      td.when(res.status(td.matchers.isA(Number))).thenReturn(res);
      td.when(res.json(this.model[req.params.id])).thenReturn((() => {
        res.body = model[req.params.id];
        return res;
      })());


      controller.getSingleRecord(req, res);
      expect(res.body).to.eql(model[req.params.id]);
    });
    it('should return an error message if no data in database', () => {
      const req = {
        params: {
          id: '4'
        }
      };
      td.when(res.status(td.matchers.isA(Number))).thenReturn(res);
      td.when(res.json(this.model[req.params.id])).thenReturn((() => {
        res.body = model[req.params.id];
        return res;
      })());
      controller.getSingleRecord(req, res);
        .then(response => expect(response.message).to.equal(errorResponse));
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
    it('should create a record', () => {
      const req = {
        body: {
          id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
          recordName: 'Baranduil',
          description: 'a  dark and dank castle shrouded in gloom',
          country: 'Nigeria',
        }
      };
      const returnValue = {
        body: {
          state: 'Lagos',
          lga: 'Oshodi',
          capacity: 1500,
          cost: 100000.00,
          userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
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
        id: 1,
        recordName: 'Wembelton',
        location: 'Bayelsa',
        capacity: 1500,
        cost: 100000.00,
        userId: 5,
      },
      params: {
        id: 'c848bf5c-27ab-4882-9e43-ffe178c82602'
      }
    };
    it('should update a record', () => {
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
    it('should delete an event', () => {
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