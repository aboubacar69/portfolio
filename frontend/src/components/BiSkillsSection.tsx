import { BarChart3, SearchCode, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

const biSkills = [
    {
        icon: BarChart3,
        title: 'Power BI / Tableau',
        description: 'Création de tableaux de bord interactifs et visualisation de données décisionnelles.',
    },
    {
        icon: SearchCode,
        title: 'SQL avancé',
        description: 'Requêtes analytiques complexes, agrégations, optimisation de performance.',
    },
    {
        icon: Workflow,
        title: 'ETL',
        description: 'Extraction, transformation et chargement de données entre systèmes hétérogènes.',
    },
];

const BiSkillsSection = () => {
    return (
        <section id="bi-skills" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <p className="font-mono text-primary text-sm mb-2 tracking-wider">
                        <span className="text-muted-foreground">$</span> cat bi_skills.json
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Business Intelligence
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {biSkills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/40 hover:border-glow transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-md bg-secondary text-primary">
                                    <skill.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-mono font-semibold text-foreground mb-1">
                                        {skill.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {skill.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BiSkillsSection;