import { Spin } from 'antd';
import React from 'react';

const Loader = () => {
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
      <Spin />
    </div>
  );
};

export default Loader;
