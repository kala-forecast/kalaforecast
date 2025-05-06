import { Meteor } from 'meteor/meteor';
import { FinancialRecords } from '/imports/api/financial/FinancialRecords';

Meteor.startup(() => {
  if (FinancialRecords.find().count() === 0) {
    const data = [
      {
        id: 1,
        title: 'Net Sales',
        auditData: [131345, 142341, 150772],
        expandableRows: [
          { id: 2, title: 'Revenue', auditData: [131345, 142341, 150772] },
        ],
      },
      {
        id: 3,
        title: 'Cost of Goods Sold',
        auditData: [49123, 53254, 57310],
        expandableRows: [
          { id: 4, title: 'Cost of Contracting', auditData: [48456, 52587, 56643] },
          { id: 5, title: 'Overhead', auditData: [667, 667, 667] },
        ],
      },
      { id: 6, title: 'Gross Profit', auditData: [82222, 89087, 93462] },
      { id: 7, title: 'Gross Margin %', auditData: [62.6, 62.6, 62.0] },
      {
        id: 8,
        title: 'Total Operating Expenses',
        auditData: [52589, 52564, 52930],
        expandableRows: [
          { id: 9, title: 'Salaries and Benefits', auditData: [24040, 24096, 24460] },
          { id: 10, title: 'Rent and Overhead', auditData: [10840, 11091, 11114] },
          { id: 11, title: 'Depreciation and Amortization', auditData: [16610, 16411, 16367] },
          { id: 12, title: 'Interest', auditData: [1100, 967, 989] },
          { id: 13, title: 'Scenario 3 - Stress Effect', auditData: [] },
          { id: 14, title: 'Scenario 4 - Stress Effect', auditData: [] },
          { id: 15, title: 'Scenario 5 - Stress Effect', auditData: [] },
        ],
      },
      { id: 16, title: 'Operating Expenses %', auditData: [34.4, 33.8, 33.6] },
      { id: 17, title: 'Profit (loss) from Operations', auditData: [52589, 52564, 52930] },
      { id: 18, title: 'Profit (loss) from Operations %', auditData: [34.4, 33.8, 33.6] },
      {
        id: 19,
        title: 'Total Other Income (expense)',
        auditData: [],
        expandableRows: [
          { id: 20, title: 'Interest Income', auditData: [] },
          { id: 21, title: 'Interest Expense', auditData: [] },
          { id: 22, title: 'Gain (loss) on disposal of assets', auditData: [] },
          { id: 23, title: 'Other income (expense)', auditData: [] },
        ],
      },
      { id: 24, title: 'Total other income (expense) %', auditData: [] },
      { id: 25, title: 'Income (loss) before income taxes', auditData: [35668, 37705, 37733] },
      { id: 26, title: 'Pre-tax income %', auditData: [23.3, 24.3, 23.9] },
      {
        id: 27,
        title: 'Net Income (loss)',
        auditData: [25338, 26759, 26775],
        expandableRows: [
          { id: 28, title: 'Income taxes', auditData: [10330, 10945, 10958] },
        ],
      },
      { id: 29, title: 'Net Income (loss) %', auditData: [16.6, 17.2, 17.0] },
      {
        id: 47,
        title: 'Total Current Assets',
        auditData: [205752, 207633, 207272],
        expandableRows: [
          { id: 48, title: 'Cash and cash equivalents', auditData: [188111, 189577, 189079] },
          { id: 49, title: 'Accounts receivable', auditData: [7074, 7243, 7286] },
          { id: 50, title: 'Inventory', auditData: [10566, 10813, 10907] },
        ],
      },
      {
        id: 51,
        title: 'Total Long-Term Assets',
        auditData: [62089, 69404, 73005],
        expandableRows: [
          { id: 52, title: 'Property, plant, and equipment', auditData: [38756, 38293, 38190] },
          { id: 53, title: 'Investment', auditData: [23333, 31111, 34815] },
        ],
      },
      {
        id: 54,
        title: 'TOTAL ASSETS',
        auditData: [267841, 277037, 280277],
      },
      {
        id: 55,
        title: 'Total Current Liabilities (due within 1 year)',
        auditData: [14169, 14167, 13687],
        expandableRows: [
          { id: 56, title: 'Accounts payable', auditData: [5283, 5406, 5453] },
          { id: 57, title: 'Debt Service', auditData: [5000, 5000, 5000] },
          { id: 58, title: 'Taxes payable', auditData: [3887, 3761, 3234] },
        ],
      },
      {
        id: 59,
        title: 'Total Long-term Liabilities (due after one year)',
        auditData: [58333, 66111, 69815],
        expandableRows: [
          { id: 60, title: 'Debt service', auditData: [15000, 15000, 15000] },
          { id: 61, title: 'Loans payable', auditData: [43333, 51111, 54815] },
        ],
      },
      {
        id: 62,
        title: 'Total Liabilities',
        auditData: [72503, 80278, 83502],
      },
      {
        id: 63,
        title: "Total Stockholder's Equity",
        auditData: [195338, 196759, 196775],
        expandableRows: [
          { id: 64, title: 'Equity Capital', auditData: [170000, 170000, 170000] },
          { id: 65, title: 'Retained Earnings', auditData: [25338, 26759, 26775] },
        ],
      },
      {
        id: 66,
        title: 'TOTAL LIABILITIES AND EQUITY',
        auditData: [267841, 277037, 280277],
      },
    ];

    let idCounter = 1;

    // eslint-disable-next-line no-inner-declarations
    function assignIds(records) {
      return records.map((record) => {
        const newRecord = { ...record, id: idCounter++ };
        if (record.expandableRows) {
          newRecord.expandableRows = assignIds(record.expandableRows);
        }
        return newRecord;
      });
    }

    const seededData = assignIds(data);
    seededData.forEach((record) => FinancialRecords.insert(record));

    console.log(`Seeded ${seededData.length} top-level financial records.`);
  }
});
