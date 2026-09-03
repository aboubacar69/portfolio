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
              <span className="text-foreground">Développeur Backend Django</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              Jeune développeur passionné par la conception d'applications et la résolution de
              problèmes techniques. Chaque projet représente une occasion d'approfondir mes
              connaissances, d'expérimenter de nouvelles approches et d'améliorer la qualité de mon
              travail. Je privilégie la compréhension, la rigueur et l'apprentissage continu afin de
              construire des solutions fiables et maintenables.
            </p>
            <p className="text-muted-foreground mt-6">
              <span className="text-primary">##</span>{' '}
              <span className="text-foreground">Mon mindset</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              J'accorde une attention particulière à la qualité, à la simplicité et à la
              maintenabilité du code. Une architecture claire, des fonctionnalités cohérentes et des
              APIs bien conçues sont, selon moi, essentielles à la création d'un logiciel fiable.
              Au-delà du résultat, j'aime comprendre le problème, réfléchir à la solution et chercher
              constamment à améliorer ce que je construis.
            </p>
            <p className="text-muted-foreground mt-6">
              <span className="text-primary">##</span>{' '}
              <span className="text-foreground">Au delà du code & de la bi</span>
            </p>
            <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
              Mon intérêt pour l'informatique ne s'arrête pas au développement logiciel. Je m'intéresse
              également aux réseaux, aux systèmes et aux infrastructures. Comprendre comment les
              machines communiquent, configurer des environnements, explorer les protocoles réseau et
              découvrir les enjeux de la sécurité informatique sont autant de sujets que j'aime
              approfondir.
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
