import React from 'react';
import './wrapper.scss';
import ImageViewer from '../Image-Grid/index';
import {Link} from 'react-router-dom';


const Wrapper = () => {
  return(
    <div className="content-wrapper">
      <section id="home">
        <Link to='/products/inDepartment/1'><ImageViewer image="190125_Shop_mens_desk.jpg" /></Link>
        <Link to='/products/inDepartment/2'><ImageViewer image="GoingWhereTheWindBlows_ShopWomensTees_desktop.jpg" /></Link>
        <Link to='/products/inDepartment/3'><ImageViewer image="OBeautiful_WomensLongsleeve_desktop.jpg" /></Link>
      </section>
    </div>
  );
};

export default Wrapper;
