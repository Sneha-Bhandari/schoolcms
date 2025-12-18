import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import VisionAndMission from "./Pages/VisionAndMission";
import HeroSection from "./Pages/HeroSection";
import Team from "./Pages/Team";
import ViewTeam from "./Component/PageComponent/Team/ViewTeam";
import EditTeam from "./Component/PageComponent/Team/EditTeam";
import Details from "./Pages/Details";
import Testimonial from "./Pages/Testimonial";
import EventTopSection from "./Component/PageComponent/Events/EventTopSection";
import AddTeam from "./Component/PageComponent/Team/AddTeam";
import Banner from "./Pages/Banner";

import EventsTable from "./Component/PageComponent/Events/EventsTable";

import OurFacilities from "./Pages/OurFacilities";



function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/banner" element={<Banner />} />

          <Route path="/team" element={<Team />} />
          <Route path="/addteam" element={<AddTeam />} />
          <Route path="/team/view/:id" element={<ViewTeam />} />
          <Route path="/team/edit/:id" element={<EditTeam />} />

          <Route path="/VisionAndMission" element={<VisionAndMission />} />
          <Route path="/HeroSection" element={<HeroSection />} />
          <Route path="/Details" element={<Details />} />

          <Route path="/events/event-top-section" element={<EventTopSection />}/>
          <Route path="/events" element={<EventsTable />} />
          <Route path="/events/:action/:id" element={<EventsTable />} />
          {/* <Route path="/events/edit/:id" element={<EventsTable/>} /> */}

          <Route path="/testimonial" element={<Testimonial />} />

      
          <Route path="/ourfacilities" element={<OurFacilities />} />
          <Route path="/ourfacilities/:action/:id" element={<OurFacilities />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
