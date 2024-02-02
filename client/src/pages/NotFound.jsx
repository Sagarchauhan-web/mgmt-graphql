import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10rem',
      }}
    >
      <h1>Not Found</h1>

      <Link to='/'>Go Back</Link>
    </div>
  );
};

export default NotFound;
