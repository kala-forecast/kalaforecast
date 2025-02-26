import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';

// Call publish for all the collections.
MATPCollections.collections.forEach(collection => {
  const collectionName = collection.getCollectionName();
  Meteor.publish(collectionName, function () {
    return collection.find();
  });
});

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});
