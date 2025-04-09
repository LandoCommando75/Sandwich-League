import React, { useState } from 'react';
import DeleteButton from './DeleteButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DataRow({ team, id, onHandleDelete, onEdit, logo }) {
  let deletePrompt = `Are you sure you want to delete team: ${team.name}`;
  const popover = (
    <Popover id="popover-basic">
      {logo && <img src={logo} alt="Team Logo" />}
    </Popover>
  );

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDelete = (itemKey) => {
    onHandleDelete(itemKey);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="auto"
      overlay={popover}
      delay={{ show: 300, hide: 200 }}
    >
      <tr key={id}>
        <td>{team.name}</td>
        <td>{team.coachName}</td>
        <td>{team.coachPhone}</td>
        <td>{team.coachEmail}</td>
        <td>
          <Link to={`/edit-team/${id}`}>
            <Button className="m-2" variant="primary">
              Edit
            </Button>
          </Link>
          <DeleteButton
            bodyText={deletePrompt}
            title="Confirm Delete"
            noText="Cancel"
            confirmText="Delete"
            iconClass="fas fa-trash"
            itemKey={id}
            callback={handleDelete}
          />
        </td>
        {showSuccessMessage && (
          <div className="success-message">
            {`Successfully deleted team: ${team.name}`}
          </div>
        )}
      </tr>
    </OverlayTrigger>
  );
}

export default DataRow;
