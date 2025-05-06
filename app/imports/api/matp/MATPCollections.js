import { Meteor } from 'meteor/meteor';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { AnalystProfiles } from '../user/AnalystProfileCollection';
import { AuditorProfiles } from '../user/AuditorProfileCollection';
import { ExecutiveProfiles } from '../user/ExecutiveProfileCollection';
import { Users } from '../user/UserCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { FinancialRecords } from '../financial/FinancialRecords';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATPCollections collections
    this.collections = [
      AdminProfiles,
      AnalystProfiles,
      AuditorProfiles,
      ExecutiveProfiles,
      Users,
      UserProfiles,
      FinancialRecords,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      AnalystProfiles,
      AuditorProfiles,
      ExecutiveProfiles,
      Users,
      UserProfiles,
      FinancialRecords,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATPCollections', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
