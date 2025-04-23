import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import '../imports/api/workpapers/Workpapers';
// quick testfix for handling weird meteor fetches as html instead of text for csv files
import { WebApp } from 'meteor/webapp';

WebApp.rawConnectHandlers.use((req, res, next) => {
  if (req.url.endsWith('.csv')) {
    res.setHeader('Content-Type', 'text/csv');
  }
  return next();
});
