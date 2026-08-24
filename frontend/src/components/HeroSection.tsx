import { Download } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-3xl w-full relative z-10">
        <div className="animate-fade-up">
          <p className="font-mono text-primary text-sm mb-4 tracking-wider">
            <span className="text-muted-foreground">$</span> whoami
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl font-mono font-bold text-foreground animate-fade-up-delay-1 leading-tight">
          Aboubacar Said Mouinou Spécialiste en{' '}
          <span className="text-primary text-glow">Business Intelligence, Dev Backend</span>
          <br />
          Django Junior
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up-delay-2">
          Je développe des solutions qui combinent <span className="text-foreground font-medium">Business Intelligence</span> et <span className="text-foreground font-medium">Développement Backend</span>,
          avec une approche orientée données et performance.
        </p>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up-delay-2">
          Mon objectif est de concevoir des solutions fiables, exploitables et adaptées aux besoins des entreprises,
          tout en continuant à progresser dans les domaines de la <span className="text-foreground font-medium">Data</span>,
          du <span className="text-foreground font-medium">Backend</span> et des systèmes d'information.
        </p>

        <div className="mt-8 flex items-center gap-4 animate-fade-up-delay-3">
          <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
            <span className="text-primary">→</span>
            <span>Moins de magie, plus de logique.</span>
            <span className="inline-block w-2 h-5 bg-primary cursor-blink" />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 animate-fade-up-delay-3">
          <a
            href="#skills"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Découvrir mes compétences
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-border text-foreground font-mono text-sm font-medium rounded-md hover:border-primary hover:text-primary transition-colors"
          >
            Me contacter
          </a>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary font-mono text-sm font-medium rounded-md hover:bg-primary/10 transition-colors"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
