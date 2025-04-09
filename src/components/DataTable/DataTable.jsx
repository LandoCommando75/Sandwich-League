import React from 'react';
import TableHeaderRow from './TableHeaderRow';
import DataRow from './DataRow';

function DataTable({ teams, onHandleDelete, onEdit, onSort }) {
  const handleDeleteClick = async (itemId, teamname) => {
    onHandleDelete(itemId, teamname);
  };

  const handleEditClick = async (itemId) => {
    onEdit(itemId);
  };

  return (
    <table className="table table-striped table-hover">
      <TableHeaderRow onSort={onSort} />
      <tbody>
        {teams.map((team) => (
          <DataRow
            key={team.id}
            team={team}
            id={team.id}
            onHandleDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
