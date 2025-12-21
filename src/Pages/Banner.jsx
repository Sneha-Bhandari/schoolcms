import React from 'react'
import AboutBanner from '../Component/PageComponent/Banner/AboutBanner'
import EventBanner from '../Component/PageComponent/Banner/EventBanner'
import BlogBanner from '../Component/PageComponent/Banner/BlogBanner'
import GalleryBanner from '../Component/PageComponent/Banner/GalleryBanner'
import CurriculumBanner from '../Component/PageComponent/Banner/CurriculumBanner'
import AdmissionBanner from '../Component/PageComponent/Banner/AdmissionBanner'
import ContactUsBanner from '../Component/PageComponent/Banner/ContactUsBanner'

const Banner = () => {
  return (
    <div className="md:w-11/12 w-full mx-auto  rounded-xl shadow-2xl px-8 py-2 flex flex-col  gap-2 mb-12">
      <AboutBanner/>
      <EventBanner/>
      <BlogBanner/>
      <GalleryBanner/>
      <CurriculumBanner/>
      <AdmissionBanner/>
      <ContactUsBanner/>
    </div>
  )
}

export default Banner
