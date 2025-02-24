import Navbar from "./components/layouts/Navbar.jsx"
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import * as Sentry from "@sentry/react";
import AppleIntelligence from "./components/AppleIntelligence";

const App = () => {
  // return <button onClick={() => methodDoesNotExist()}>Break the world</button>;

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <AppleIntelligence />
      <Footer />
    </main>
  );
};

export default Sentry.withProfiler(App);
