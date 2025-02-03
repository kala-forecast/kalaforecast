import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const WorkPapers = () => (
  <Container id={PAGE_IDS.WORKPAPERS} className="py-3">
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Balance</th>
            <th scope="col">Yearly Contribution</th>
            <th scope="col">Interest Earned</th>
            <th scope="col">Interest + Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <th scope="row">50,000</th>
            <th scope="row">50,000</th>
            <th scope="row">2,100</th>
            <th scope="row">52,100</th>
          </tr>
          <tr>
            <th scope="row">1</th>
            <th scope="row">50,000</th>
            <th scope="row">50,000</th>
            <th scope="row">2,100</th>
            <th scope="row">52,100</th>
          </tr>
        </tbody>
      </Table>
    </div>
  </Container>
);
export default WorkPapers;
