import React from 'react';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

const Home = () => {
  return (
    <div
      style={{
        margin: '2rem',
      }}
    >
      <Projects />
      <Clients />
    </div>
  );
};

export default Home;
