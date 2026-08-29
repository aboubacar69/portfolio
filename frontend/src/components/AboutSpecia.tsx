const BusinessIntelligenceSection = () => {

    return (

        <section className="py-24 px-6">

            <div className="max-w-4xl mx-auto">

                <div className="mb-12">

                    <p className="font-mono text-primary text-sm mb-2 tracking-wider">
                        <span className="text-muted-foreground">$</span> cat business_intelligence.md
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Spécialisation
                    </h2>

                </div>

                <div className="border border-border rounded-lg bg-card p-8 relative border-glow">

                    {/* Terminal header */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-secondary rounded-t-lg flex items-center px-4 gap-2">

                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                        <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
                        <div className="w-3 h-3 rounded-full bg-primary/60" />

                        <span className="ml-3 font-mono text-xs text-muted-foreground">
                            business_intelligence.md
                        </span>

                    </div>

                    <div className="mt-6 space-y-4 font-mono text-sm leading-relaxed">

                        <p className="text-muted-foreground">
                            <span className="text-primary">##</span>{' '}
                            <span className="text-foreground">
                                Business Intelligence
                            </span>
                        </p>

                        <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
                            Spécialisé dans l'analyse et la valorisation des données
                            pour produire des informations fiables et utiles à la décision.
                        </p>

                        <p className="text-muted-foreground mt-6">
                            <span className="text-primary">##</span>{' '}
                            <span className="text-foreground">
                                Data & Analyse
                            </span>
                        </p>

                        <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
                            Collecte, nettoyage, transformation et analyse des données,
                            avec une attention particulière portée aux indicateurs et aux tendances.
                        </p>

                        <p className="text-muted-foreground mt-6">
                            <span className="text-primary">##</span>{' '}
                            <span className="text-foreground">
                                Data Visualisation
                            </span>
                        </p>

                        <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
                            Conception de tableaux de bord et de visualisations
                            pour rendre les données simples à comprendre et à exploiter.
                        </p>

                        <p className="text-muted-foreground mt-6">
                            <span className="text-primary">##</span>{' '}
                            <span className="text-foreground">
                                Une spécialisation en évolution
                            </span>
                        </p>

                        <p className="text-muted-foreground pl-4 border-l-2 border-primary/30">
                            SQL, Power BI, Pandas, NumPy et Apache Spark pour
                            développer progressivement mes compétences en Data et BI.
                        </p>

                        <div className="mt-6 pt-4 border-t border-border">

                            <p className="text-primary text-xs tracking-wider">
                                Data → Analyse → Visualisation → Décision
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default BusinessIntelligenceSection;