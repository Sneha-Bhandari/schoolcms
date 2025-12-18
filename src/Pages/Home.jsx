import React from 'react'
import WhyChooseUs from '../Component/PageComponent/Home/WhyChooseUs'

import Academics from '../Component/PageComponent/Home/Academics'
import Message from '../Component/PageComponent/Home/Message'
import AboutSchool from '../Component/PageComponent/Home/AboutSchool'
import FacilitiesTopSection from '../Component/PageComponent/OurFacilities/FacilitiesTopSection'
import TestimonialTopSection from '../Component/PageComponent/Testimonial/TestimonialTopSection'



const Home = () => {
  return (
    <div className=''>  
      <WhyChooseUs/>
      <FacilitiesTopSection/>
      <AboutSchool />
      <Academics/>
      <Message/>
      <TestimonialTopSection/>
    </div>
  )
}

export default Home
