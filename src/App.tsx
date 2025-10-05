import { useEffect, useState, useRef } from 'react';
import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import SkillSection from './components/SkillSection';
import ReseauxSection from './components/ReseauxSection';
import EndSection from './components/EndSection';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();

      if (e.deltaY > 0 && activeSection < 3) {
        setIsScrolling(true);
        setActiveSection(activeSection + 1);
      } else if (e.deltaY < 0 && activeSection > 0) {
        setIsScrolling(true);
        setActiveSection(activeSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, isScrolling]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  useEffect(() => {
    sectionsRef.current[activeSection]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [activeSection]);

  return (
    <div className="relative h-screen overflow-hidden">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <div
        ref={(el) => {
          if (el) sectionsRef.current[0] = el;
        }}
      >
        <HomeSection />
      </div>

      <div
        ref={(el) => {
          if (el) sectionsRef.current[1] = el;
        }}
      >
        <SkillSection isActive={activeSection === 1} />
      </div>

      <div
        ref={(el) => {
          if (el) sectionsRef.current[2] = el;
        }}
      >
        <ReseauxSection isActive={activeSection === 2} />
      </div>

      <div
        ref={(el) => {
          if (el) sectionsRef.current[3] = el;
        }}
      >
        <EndSection isActive={activeSection === 3} />
      </div>
    </div>
  );
}

export default App;
