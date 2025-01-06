import React from 'react';
import WatchedForm from './WatchedForm';

const AddWatched = () => {
  const handleOnSubmit = (libro) => {
    console.log(libro);
  };

  return (
    <React.Fragment>
      <WatchedForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddWatched;