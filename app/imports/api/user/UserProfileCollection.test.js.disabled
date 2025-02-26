import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { removeAllEntities } from '../base/BaseUtilities';
import { UserProfiles } from './UserProfileCollection';
import { MATPCollections } from '../matp/MATPCollections';
import { testDefine, testUpdate } from '../utilities/test-helpers';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

const collectionName = UserProfiles.getCollectionName();

if (Meteor.isServer) {
  describe(collectionName, function testSuite() {
    const collection = MATPCollections.getCollection(collectionName);

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(
          fc.lorem({ maxCount: 1 }),
          fc.lorem({ maxCount: 1 }),
          (firstName, lastName) => {
            const email = faker.internet.email();
            const role = 'ADMIN';
            const password = 'changeme';
            const definitionData = { email, firstName, lastName, role, password };
            testDefine(collection, definitionData);
          },
        ),
      );
      done();
    });

    it('Cannot define duplicates', function test2() {
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const role = 'ADMIN';
      const password = 'changeme';
      const docID1 = collection.define({ email, firstName, lastName, role, password });
      const docID2 = collection.define({ email, firstName, lastName, role, password });
      expect(docID1).to.equal(docID2);
    });

    it('Can update', function test3(done) {
      const email = faker.internet.email();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const password = faker.internet.password();
      const role = 'ADMIN';
      const docID = collection.define({ email, firstName, lastName, role, password });
      fc.assert(
        fc.property(
          fc.lorem({ maxCount: 1 }),
          fc.lorem({ maxCount: 1 }),
          (fName, lName) => {
            const updateData = { firstName: fName, lastName: lName };
            testUpdate(collection, docID, updateData);
          },
        ),
      );
      done();
    });
  });
}
