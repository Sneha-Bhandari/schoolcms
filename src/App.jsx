import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";

import Login from "../src/Auth/Login";
import ProtectedRoute from "../src/Auth/ProtectedRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import VisionAndMission from "./Pages/VisionAndMission";
import HeroSection from "./Pages/HeroSection";
import Banner from "./Pages/Banner";
import OurFacilities from "./Pages/OurFacilities";

import TeamTable from "./Component/PageComponent/Team/TeamTable";
import AddTeam from "./Component/PageComponent/Team/AddTeam";

import EventTopSection from "./Component/PageComponent/Events/EventTopSection";
import EventsTable from "./Component/PageComponent/Events/EventsTable";
import AddEvent from "./Component/PageComponent/Events/AddEvent";

import TestimonialComponent from "./Component/PageComponent/Testimonial/TestimonialComponent";
import AddStudentForm from "./Component/PageComponent/Testimonial/AddStudentForm";

import BlogsTable from "./Component/PageComponent/Blogs/BlogsTable";
import BlogTopSection from "./Component/PageComponent/Blogs/BlogTopSection";
import FaqTable from "./Component/PageComponent/FAQ/FAQTable";
import FaqAdd from "./Component/PageComponent/FAQ/FaqAdd";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import AddBlog from "./Component/PageComponent/Blogs/AddBlog";
import AddFacilities from "./Component/PageComponent/OurFacilities/AddFacilities";

import CurriculumDetails from "./Component/PageComponent/Curriculum/CurriculumDetails";
import OurAcademicProgram from "./Pages/OurAcademicProgram";
import AddAcademicProgram from "./Component/PageComponent/OurAcademicProgram/AddAcademicProgram";
import Items from "./Component/PageComponent/Details/Items";
import AddItems from "./Component/PageComponent/Details/Additems";

import { Toaster } from "react-hot-toast";
import Logos from "./Pages/Logos";

function App() {
  return (
    <>
      <Routes>

        {/* ===== LOGIN ROUTE ===== */}
        <Route path="/login" element={<Login />} />

        <Route
          element={<ProtectedRoute>  <Layout /></ProtectedRoute>}>
          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Team */}
          <Route path="/team" element={<TeamTable />} />
          <Route path="/team/add" element={<AddTeam />} />
          <Route path="/team/view/:id" element={<TeamTable />} />
          <Route path="/team/edit/:id" element={<TeamTable />} />

          {/* CMS Pages */}
          <Route path="/VisionAndMission" element={<VisionAndMission />} />
          <Route path="/HeroSection" element={<HeroSection />} />
          <Route path="/Logos" element={<Logos />} />

          {/* Details Page */}
          <Route path="/details" element={<Items />} />
          <Route path="/details/add" element={<AddItems />} />
          <Route path="/details/view/:id" element={<Items />} />
          <Route path="/details/edit/:id" element={<Items />} />

          {/* Events */}
          <Route
            path="/events/event-top-section"
            element={<EventTopSection />}
          />
          <Route path="/events/eventlist" element={<EventsTable />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/events/eventlist/:view/:id" element={<EventsTable />} />
          <Route path="/events/eventlist/:edit/:id" element={<EventsTable />} />

          {/* blog pages */}
          <Route path="/blogs/blog-top-section" element={<BlogTopSection />} />
          <Route path="/blogs/bloglist" element={<BlogsTable />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blogs/bloglist/:view/:id" element={<BlogsTable />} />
          <Route path="/blogs/bloglist/:edit/:id" element={<BlogsTable />} />

          {/* Testimonial pages*/}
          <Route path="/testimonial" element={<TestimonialComponent />} />
          <Route
            path="/testimonial/addtestimonial"
            element={<AddStudentForm />}
          />
          <Route
            path="/testimonial/view/:id"
            element={<TestimonialComponent />}
          />
          <Route
            path="/testimonial/edit/:id"
            element={<TestimonialComponent />}
          />

          {/* Faq Pages */}
          <Route path="/faq" element={<FaqTable />} />
          <Route path="/faq/add" element={<FaqAdd />} />
          <Route path="/faq/view/:id" element={<FaqTable />} />
          <Route path="/faq/edit/:id" element={<FaqTable />} />

          <Route path="/ourfacilities" element={<OurFacilities />} />
          <Route path="/addfacilities" element={<AddFacilities />} />
          <Route
            path="/ourfacilities/:action/:id"
            element={<OurFacilities />}
          />

          <Route path="/curriculum" element={<CurriculumDetails />} />
          <Route path="/curriculum/view/:id" element={<CurriculumDetails />} />
          <Route path="/curriculum/edit/:id" element={<CurriculumDetails />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/ouracademicprogram" element={<OurAcademicProgram />} />
          <Route path="/addacademicprogram" element={<AddAcademicProgram />} />
          <Route
            path="/ouracademicprogram/edit/:id"
            element={<OurAcademicProgram />}
          />
          <Route
            path="/ouracademicprogram/view/:id"
            element={<OurAcademicProgram />}
          />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
