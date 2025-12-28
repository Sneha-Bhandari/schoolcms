import React from 'react'
import WhyChooseUs from '../Component/PageComponent/Home/WhyChooseUs'

import Academics from '../Component/PageComponent/Home/Academics'
import Message from '../Component/PageComponent/Home/Message'
import AboutSchool from '../Component/PageComponent/Home/AboutSchool'
import FacilitiesTopSection from '../Component/PageComponent/OurFacilities/FacilitiesTopSection'
import TestimonialTopSection from '../Component/PageComponent/Testimonial/TestimonialTopSection'
import FaqTopSection from '../Component/PageComponent/FAQ/FaqTopSection'
import GalleryTopSection from '../Component/PageComponent/Gallery/GalleryTopSection'



const Home = () => {
  return (
    <div className=''>  
      <WhyChooseUs/>
      <FacilitiesTopSection/>
      <AboutSchool />
      <Academics/>
      <Message/>
      <TestimonialTopSection/>
      <FaqTopSection/>
      <GalleryTopSection/>
    </div>
  )
}

export default Home
