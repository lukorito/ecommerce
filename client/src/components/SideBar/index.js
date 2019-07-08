import React from 'react';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Categories</h1>
      <ul>
        <li>French</li>
        <li>Italian</li>
        <li>Irish</li>
        <li>Animal</li>
        <li>Flower</li>
        <li>Christmas</li>
        <li>Valentine's</li>
      </ul>
    </div>
  );
};

export default Sidebar;
