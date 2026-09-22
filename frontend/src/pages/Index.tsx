import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ParcoursSection from '@/components/ParcoursSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import Reveal from '@/components/Reveal';
import AboutSpecia from '@/components/AboutSpecia';
import BackendSkillsSection from '@/components/BackendSkillsSection';
import BiSkillsSection from '@/components/BiSkillsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Reveal>
        <BiSkillsSection />
      </Reveal>
      <Reveal>
        <BackendSkillsSection />
      </Reveal>
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <Reveal>
          <AboutSpecia />
        </Reveal>
        <AboutSection />
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
