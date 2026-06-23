import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Services from '@/components/Services/Services';
import Experience from '@/components/Experience/Experience';
import Projects from '@/components/Projects/Projects';
import TechRadar from '@/components/TechRadar/TechRadar';
import Insights from '@/components/Insights/Insights';
import Education from '@/components/Education/Education';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <TechRadar />
        <Insights />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
