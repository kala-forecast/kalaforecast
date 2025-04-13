import { Meteor } from 'meteor/meteor';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AnalystProfiles } from '../../api/user/AnalystProfileCollection';
import { AuditorProfiles } from '../../api/user/AuditorProfileCollection';
import { ExecutiveProfiles } from '../../api/user/ExecutiveProfileCollection';
/* eslint-disable no-console */

Meteor.methods({
  createNewUser: ({ email, role, firstName, lastName, password }) => {
    console.log(`  Creating user ${email} with role ${role}.`);
    // Temporary; role isn't case sensitive 'ADMIN' = 'admin', ...
    // Will be dropdown option
    const normalizedRole = role.toLowerCase();
    let collection;
    switch (normalizedRole) {
    case 'admin':
      collection = AdminProfiles;
      break;
    case 'analyst':
      collection = AnalystProfiles;
      break;
    case 'auditor':
      collection = AuditorProfiles;
      break;
    case 'executive':
      collection = ExecutiveProfiles;
      break;
    default:
      break;
    }

    UserProfiles.define({ email, firstName, lastName, password, role });
    collection.define({ email, firstName, lastName, password });
  },
});

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, firstName, lastName }) => {
      Meteor.call('createNewUser', { email, role, firstName, lastName, password });
    });
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
