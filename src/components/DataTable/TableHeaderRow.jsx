import React from 'react';
import TableHeaderCol from './TableHeaderCol';

function TableHeaderRow({ onSort, sortCol, sortDir }) {
  return (
    <thead>
      <tr>
        <TableHeaderCol label="Team Name" colName="name" sortCol={sortCol} sortDir={sortDir} onHandleSort={onSort} />
        <TableHeaderCol label="Coach Name" colName="coachName" sortCol={sortCol} sortDir={sortDir} onHandleSort={onSort} />
        <TableHeaderCol label="Coach Phone" colName="coachPhone" sortCol={sortCol} sortDir={sortDir} onHandleSort={onSort} />
        <TableHeaderCol label="Coach Email" colName="coachEmail" sortCol={sortCol} sortDir={sortDir} onHandleSort={onSort} />
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeaderRow;
