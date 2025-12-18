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
    <div>
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
