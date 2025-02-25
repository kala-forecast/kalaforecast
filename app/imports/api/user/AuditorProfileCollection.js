import SimpleSchema from 'simpl-schema';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

class AuditorProfileCollection extends BaseProfileCollection {
  constructor() {
    super('AuditorProfiles', new SimpleSchema({}));
  }

  /**
   * Defines the profile associated with an Auditor profile and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param password The password for this profile.
   * @returns {*} the new Auditor profile, or the existing userID.
   */
  define({ email, firstName, lastName, password }) {
    const username = email;
    const user = this.findOne({ email, firstName, lastName });
    if (!user) {
      const role = ROLE.AUDITOR;
      const userID = Users.define({ username, role, password });
      return (this._collection.insert({ email, firstName, lastName, userID, role }));
    }
    return user._id;
  }

  /**
   * Updates an Auditor's profile. Right now it only updates the name of the profile.
   * @param docID the ID of the profile.
   * @param firstName the first name.
   * @param lastName the last name.
   */
  update(docID, { firstName, lastName }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes the profile with given ID
   * @param profileID
   * @returns {*|null}
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * Asserts that userId is logged in and has Auditor role defined.
   * @param userId the userId of the profile to assert.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.AUDITOR]);
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role.
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.AUDITOR) {
        problems.push(`UserProfile instance does not have ROLE.Auditor: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the AuditorProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName };
  }
}

export const AuditorProfiles = new AuditorProfileCollection();
