import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import VisionAndMission from "./Pages/VisionAndMission";
import HeroSection from "./Pages/HeroSection";
import Details from "./Pages/Details";
import Banner from "./Pages/Banner";
import OurFacilities from "./Pages/OurFacilities";
import FAQ from "./Pages/FAQ";

/* Team */
import TeamTable from "./Component/PageComponent/Team/TeamTable";
import AddTeam from "./Component/PageComponent/Team/AddTeam";

/* Events */
import EventTopSection from "./Component/PageComponent/Events/EventTopSection";
import EventsTable from "./Component/PageComponent/Events/EventsTable";
import AddEvent from "./Component/PageComponent/Events/AddEvent";

/* Testimonials */
import TestimonialComponent from "./Component/PageComponent/Testimonial/TestimonialComponent";
import AddStudentForm from "./Component/PageComponent/Testimonial/AddStudentForm";

// Blogs
import BlogsTable from "./Component/PageComponent/Blogs/BlogsTable";
import BlogTopSection from "./Component/PageComponent/Blogs/BlogTopSection";
import FaqTable from "./Component/PageComponent/FAQ/FAQTable";
import FaqAdd from "./Component/PageComponent/FAQ/FaqAdd";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/banner" element={<Banner />} />

        {/* Team */}
        <Route path="/team" element={<TeamTable />} />
        <Route path="/team/add" element={<AddTeam />} />
        <Route path="/team/view/:id" element={<TeamTable />} />
        <Route path="/team/edit/:id" element={<TeamTable />} />

        {/* CMS Pages */}
        <Route path="/VisionAndMission" element={<VisionAndMission />} />
        <Route path="/HeroSection" element={<HeroSection />} />
        <Route path="/Details" element={<Details />} />

        {/* Events */}
        <Route
          path="/events/event-top-section"
          element={<EventTopSection />}
        />
        <Route path="/events/eventlist" element={<EventsTable />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/events/:action/:id" element={<EventsTable />} />


        <Route path="/blogs/blog-top-section" element={<BlogTopSection />}/>
        <Route path="/blogs/bloglist" element={<BlogsTable/>} />

        {/* Testimonials */}
        <Route path="/testimonial" element={<TestimonialComponent />} />
        <Route path="/testimonial/addtestimonial" element={<AddStudentForm />}/>
        <Route path="/testimonial/view/:id"  element={<TestimonialComponent />}/>
        <Route path="/testimonial/edit/:id" element={<TestimonialComponent />}/>

        {/* Other Pages */}
        <Route path="/faq" element={<FaqTable />} />
        <Route path="/faq/add" element={<FaqAdd />} />
        <Route path="/faq/view/:id" element={<FaqTable />} />
        <Route path="/faq/edit/:id" element={<FaqTable />} />


        <Route path="/ourfacilities" element={<OurFacilities />} />
        <Route
          path="/ourfacilities/:action/:id"
          element={<OurFacilities />}
        />

      </Route>
    </Routes>
  );
}

export default App;
