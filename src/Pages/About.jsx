import React from 'react'
import WhoWeAre from '../Component/PageComponent/About/WhoWeAre'
import TeamTopSection from '../Component/PageComponent/Team/TeamTopSection'
import VisionMissionTopSection from '../Component/PageComponent/VisionAndMission/VisionMissionTopSection'
import CurriculumTopSection from '../Component/PageComponent/Curriculum/CurriculumTopSection'
const About = () => {
  return (
    <div>
      <WhoWeAre/>
      <TeamTopSection/>
      <VisionMissionTopSection/>
      <CurriculumTopSection/>
    </div>
  )
}

export default About
