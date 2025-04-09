import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBar({ onSearchHandler }) {
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    onSearchHandler(searchValue);
  };

  const handleClear = () => {
    onSearchHandler('');
  };

  return (
    <Form>
      <Form.Group controlId="searchInput">
        <Form.Control type="text" placeholder="Search..." onChange={handleSearchChange} />
      </Form.Group>
      <Button variant="secondary" onClick={handleClear}>Clear</Button>
    </Form>
  );
}

export default SearchBar;