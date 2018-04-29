/* eslint import/no-extraneous-dependencies: off */
import {
  expect
} from 'chai';
import Controller from '../../../controllers/controller';

describe('Controller', () => {

  const model = [
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
    },
  ];
  const noModel = undefined;
  const errorResponse = {
    message: 'records unavailable',
    statusCode: 404
  };

  describe('getAllRecords()', () => {

    const successResponse = {
      message: null,
      statusCode: 200
    };
    it('should return all records', () => {

      const controller = new Controller(model);
      successResponse.message = model;
      expect(controller.getAllRecords()).to.eql(successResponse);
    });

    it('should return an error message if no data in database', () => {

      const controller = new Controller(noModel);
      expect(controller.getAllRecords()).to.eql(errorResponse);
    });
  });

  describe('getSingleRecord()', () => {

    const successResponse = {
      message: null,
      statusCode: 200
    };
    it('should return a record if data is returned from database', () => {
      const req = {
        params: {
          id: 1
        }
      };
      const controller = new Controller(model);
      successResponse.message = model[req.params.id - 1];

      expect(controller.getSingleRecord(req)).to.eql(successResponse);
    });
    it('should return an error message if no data in database', () => {
      const req = {
        params: {
          id: 4
        }
      };
      const controller = new Controller(model);

      expect(controller.getSingleRecord(req)).to.eql(errorResponse);
    });
  });

  describe('postRecord', () => {
    const req = {
      body: model[1]
    };
    const successResponse = {
      message: null,
      statusCode: 201
    };
    it('should create a record', () => {
      const controller = new Controller(model);
      successResponse.message = req.body;

      expect(controller.postRecord(req)).to.eql(successResponse);
    });
    it('should return an error message if error occurs when accessing database', () => {
      const controller = new Controller(noModel);
      expect(controller.postRecord(req)).to.eql(errorResponse);

    });
  });

  describe('updateRecord()', () => {

    it('should update a record', () => {
      const req = {
        body: {
          title: 'Updated meal',
          price: 1500,
        },
        params: {
          id: 2
        }
      };
      const controller = new Controller(model);
      const { message } = controller.updateRecord(req);
      expect(message[1].title).to.eql(req.body.title);

    });
    it('should return an error message if error occurs when accessing database', () => {
      const req = {
        body: {
          title: 'Updated meal',
          price: 1500,
        },
        params: {
          id: 4
        }
      };
      const controller = new Controller(model);
      expect(controller.updateRecord(req)).to.eql(errorResponse);

    });
  });
  describe('deleteRecord()', () => {
    const successResponse = {
      message: null,
      statusCode: 200
    };
    it('should delete a record', () => {
      const req = {
        params: {
          id: 2
        }
      };
      const controller = new Controller(model);
      successResponse.message = 'Record deleted';

      expect(controller.deleteRecord(req)).to.eql(successResponse);
    });
    it('should return an error message if error occurs when accessing database', () => {
      const req = {
        params: {
          id: 4
        }
      };
      const controller = new Controller(model);
      expect(controller.deleteRecord(req)).to.eql(errorResponse);
    });
  });
});