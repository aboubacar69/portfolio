const AboutSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-primary text-sm mb-2 tracking-wider">
            <span className="text-muted-foreground">$</span> cat about.md
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pourquoi moi ?
          </h2>
        </div>

        <div className="border border-border rounded-lg bg-card p-8 relative border-glow">
          {/* Terminal header */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-secondary rounded-t-lg flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">about.md</span>
          </div>

          <div className="mt-6 space-y-4 font-mono text-sm leading-relaxed">
            <p className="text-muted-foreground">
              <span className="text-primary">##</span>{' '}
              <span className="text-foreground">Junior, mais engagé</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              Je suis développeur junior, mais sérieux dans mon travail. Je prends le temps de comprendre, de tester et d'améliorer. Chaque projet est une occasion d'apprendre et de livrer un code propre, maintenable et utile.
            </p>
            <p className="text-muted-foreground mt-6">
              <span className="text-primary">##</span>{' '}
              <span className="text-foreground">Ma philosophie</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              J'aime quand le code est propre, quand les routes sont logiques, et quand une API répond exactement comme prévu. Avec Django, je construis des applications backend structurées, sécurisées et prêtes à évoluer.
            </p>
            <p className="text-muted-foreground mt-6">
              <span className="text-primary">##</span>{' '}
              <span className="text-foreground">En dehors du code</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              À part le développement, je suis aussi passionné par les réseaux et l'infrastructure : comprendre comment les machines communiquent,
              configurer des serveurs, explorer la sécurité réseau et le fonctionnement des protocoles. J'aime apprendre en continu, que ce soit côté système,
              DevOps ou nouvelles technologies.
            </p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-primary text-xs tracking-wider">
                Toujours en apprentissage, toujours prêt à relever de nouveaux défis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
