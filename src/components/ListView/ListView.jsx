import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { Button } from 'react-bootstrap';
import AlertList from '../../views/TeamsPage/AlertList';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

function ListView({ viewModel, model }) {
  const [teams, setTeams] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterStr, setFilterStr] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await model.list(filterStr);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchData();
  }, [model, filterStr]);

  const handleDelete = async (itemId, teamname) => {
    try {
      await model.delete(itemId);
      const updatedTeams = await model.list(filterStr);
      setTeams(updatedTeams);
      addAlert(`${viewModel.entitySingle} has been deleted successfully.`, 'success');
      console.log(`Deleting item with ID: ${itemId}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      addAlert(`Error deleting ${viewModel.entitySingle}. Please try again.`, 'danger');
    }
  };

  const handleEdit = async (itemId) => {
    console.log(`Editing item with ID: ${itemId}`);
  };

  const handleSort = async (sortCol) => {
    try {
      const sortOrder =
        model.sortCol === sortCol && model.sortDir === 'asc' ? 'desc' : 'asc';
    
      model.sortCol = sortCol;
      model.sortDir = sortOrder;
    
      const updatedTeams = await model.list(filterStr);
      
      setTeams([...updatedTeams]);
      addAlert(`Sorting by ${sortCol} in ${sortOrder} order.`, 'info');
      console.log(`Sorting by ${sortCol} in ${sortOrder} order`);
    } catch (error) {
      console.error('Error sorting teams:', error);
      addAlert('Error sorting teams. Please try again.', 'danger');
    }
  };

  const handleReset = async () => {
    try {
      await model.reset();
      const updatedTeams = await model.list(filterStr);
      setTeams(updatedTeams);
      addAlert(`${viewModel.entityPlural} data reset successfully.`, 'success');
      console.log('Resetting teams data');
    } catch (error) {
      console.error('Error resetting teams data:', error);
      addAlert(`Error resetting ${viewModel.entityPlural} data. Please try again.`, 'danger');
    }
  };

  const filterTeams = (searchValue, teams) => {
    return teams.filter(team => {
      const search = searchValue.toLowerCase();
      return Object.values(team).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(search)
      );
    });
  };

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
    if (searchValue.length > 2) {
      const filteredTeams = filterTeams(searchValue, teams);
      setTeams(filteredTeams);
    } else {
      const fetchData = async () => {
        try {
          const teamsData = await model.list('');
          setTeams(teamsData);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };
  
      fetchData();
    }
  };

  const addAlert = (title, type) => {
    const newAlert = { title, type };
    setAlertList([...alertList, newAlert]);

    setTimeout(() => {
      setAlertList((prevAlerts) => prevAlerts.filter((alert) => alert !== newAlert));
    }, 3000);
  };

  return (
    <section id="teams-content">
      <h2>{viewModel.entityPlural} Page Content</h2>
      <AlertList alerts={alertList} />
      <div className="table-responsive">
        <DataTable teams={teams} onHandleDelete={handleDelete} onEdit={handleEdit} onSort={handleSort} />
      </div>
      <Button as={Link} to={`/add-${viewModel.entitySingle}`} className="m-2" variant="primary">New {viewModel.entitySingle}</Button>
      <Button onClick={handleReset}>Reset {viewModel.entityPlural}</Button>
      <SearchBar onSearchHandler={handleSearch} />
    </section>
  );
}

export default ListView;
