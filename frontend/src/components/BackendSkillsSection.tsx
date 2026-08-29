import { Code, Database, Shield, TestTube, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const backendSkills = [
    {
        icon: Code,
        title: 'API REST',
        description: 'Django & Django REST Framework pour des API structurées et documentées.',
    },
    {
        icon: Database,
        title: 'Bases de données',
        description: 'Conception de schémas relationnels clairs, migrations, requêtes optimisées.',
    },
    {
        icon: Shield,
        title: 'Sécurité',
        description: 'Authentification, permissions, gestion des accès et bonnes pratiques.',
    },
    {
        icon: TestTube,
        title: 'Tests & Qualité',
        description: 'Tests unitaires, intégration, coverage et code review rigoureux.',
    },
    {
        icon: Server,
        title: 'Déploiement',
        description: 'Bases du DevOps, Docker, CI/CD et mise en production.',
    },
];

const BackendSkillsSection = () => {
    return (
        <section id="skills" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <p className="font-mono text-primary text-sm mb-2 tracking-wider">
                        <span className="text-muted-foreground">$</span> cat backend_skills.json
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Dev Backend
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {backendSkills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-6 rounded-lg border border-border bg-card hover:border-primary/40
                            hover:border-glow transition-all duration-300"
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

export default BackendSkillsSection;