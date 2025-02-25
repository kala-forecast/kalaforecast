import React from 'react';
import { Button, Container } from 'react-bootstrap';
import swal from 'sweetalert';
import moment from 'moment';
import { ZipZap } from 'meteor/udondan:zipzap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { dumpDatabaseMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { ExecutiveProfiles } from '../../api/user/ExecutiveProfileCollection';

const ManageDatabase = () => {
  const databaseFileDateFormat = 'YYYY-MM-DD-HH-mm-ss';

  const { ready, validRole } = useTracker(() => {
    const userId = Meteor.userId();
    if (!userId) return { ready: false, validRole: false };
    const sub1 = Meteor.subscribe(AdminProfiles.getPublicationName());
    const sub2 = Meteor.subscribe(ExecutiveProfiles.getPublicationName());
    const isAdmin = AdminProfiles.findOne({ userID: userId }) !== undefined;
    const isExec = ExecutiveProfiles.findOne({ userID: userId }) !== undefined;
    return {
      ready: sub1.ready() && sub2.ready(),
      validRole: (userId && (isAdmin || isExec)),
    };
  }, []);

  const submit = () => {
    dumpDatabaseMethod.callPromise()
      .catch(error => swal('Error', error.message, 'error'))
      .then(result => {
        const zip = new ZipZap();
        const dir = 'matp-db';
        const fileName = `${dir}/${moment(result.timestamp).format(databaseFileDateFormat)}.json`;
        zip.file(fileName, JSON.stringify(result, null, 2));
        zip.saveAs(`${dir}.zip`);
      });
  };
  if (ready && validRole) {
    return (
      <Container id={PAGE_IDS.MANAGE_DATABASE}>
        <Button id={COMPONENT_IDS.MANGAGE_DATABASE_DUMP} onClick={() => submit()}>Dump Database</Button>
      </Container>
    );
  }
  return <div>You are not authorized to use this page. Must have Admin or Executive role.</div>;
};

export default ManageDatabase;
