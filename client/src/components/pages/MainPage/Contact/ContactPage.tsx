import React from 'react';
import MainLayout from '../../../layout/MainLayout';
import MainContact from './MainContact';

const ContactPage: React.FC = () => {
  return (
    <div>
      <MainLayout levelName='' courseName='' myComponent={<MainContact />} />
    </div>
  );
};

export default ContactPage;