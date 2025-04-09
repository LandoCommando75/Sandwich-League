import React from 'react';
import ListView from '../../components/ListView/ListView';

function TeamsPage({viewModel, api}) {
  return (
    <div className="col-12">
      <ListView viewModel={viewModel} model={api} />
    </div>
  );
}

export default TeamsPage;