import React from 'react';

// Importing the sections of the About Us page
import AboutUs1 from './section1/AboutUs';
import AboutUs2 from './section2/AboutUs';
import AboutUs3 from './section3/AboutUs';

const AboutUs = () => {
  return (
    <>
        <AboutUs1 />
        <AboutUs2 />
        <AboutUs3 />
    </>
  );
};

export default AboutUs;