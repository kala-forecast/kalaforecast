import { Mongo } from 'meteor/mongo';

export const FinancialRecords = new Mongo.Collection('FinancialRecords');

FinancialRecords.getCollectionName = function() {
  return this._name;
};
