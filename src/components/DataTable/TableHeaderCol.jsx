import React from 'react';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

function TableHeaderCol({ label, colName, sortCol, sortDir, onHandleSort }) {

  return (
    <th onClick={() => onHandleSort(colName)} style={{ cursor: 'pointer' }}>
      {label}
      {sortCol === colName && (
        <span style={{ marginLeft: '5px' }}>
          {sortDir === 'asc' ? <FaSortUp /> : <FaSortDown />}
        </span>
      )}
      {sortCol !== colName && <span style={{ marginLeft: '5px' }}><FaSort /></span>}
    </th>
  );
}

export default TableHeaderCol;
