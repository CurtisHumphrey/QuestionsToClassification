import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const AboutView = () => (
  <div className='container text-center'>
    <Helmet title='About Us' />
    <h1>This is the about view!</h1>
    <hr />
    <Link to='/'>Back To Home View</Link>
  </div>
);

export default AboutView;
