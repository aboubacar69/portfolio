import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ParcoursSection from '@/components/ParcoursSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import Reveal from '@/components/Reveal';
import AboutSection1 from '@/components/AboutSection1';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Reveal>
        <SkillsSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <AboutSection1 />
      </Reveal>
      <ParcoursSection />
      <Reveal>
        <ContactSection />
      </Reveal>
      <Reveal>
        <FooterSection />
      </Reveal>
    </div>
  );
};

export default Index;
