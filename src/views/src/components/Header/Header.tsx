import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
/**
 * Header component
 * @param props
 */
function Header(props: any) {
  return (
    <>
      <div id='overlay' className='hide'>
        <div className='spinner'></div>
        <br />
        Fetching your data...
      </div>
      <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
        <h5 className='my-0 mr-md-auto font-weight-normal'><Link className='p-2 text-dark' to='/'>Store Management</Link></h5>
        <nav className='ml-100 flex-grow-1'>
          {/* <Link className='p-2 text-dark' to='/store'>Stores</Link> */}
        </nav>
      </div>
      {props.children}
    </>
  );
}

export default Header;
