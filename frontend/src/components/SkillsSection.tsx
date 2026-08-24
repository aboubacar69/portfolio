import {
  Code,
  Database,
  Shield,
  TestTube,
  Server,
  BarChart3,
  Table2,
  BrainCircuit,
  Binary,
  Workflow,
} from 'lucide-react';

import { motion } from 'framer-motion';

const skills = [

  // =========================
  // BACKEND
  // =========================

  {
    icon: Code,
    title: 'API REST',
    description:
      'Django & Django REST Framework pour concevoir des API structurées, sécurisées et documentées.',
  },

  {
    icon: Database,
    title: 'Bases de données',
    description:
      'Conception de schémas relationnels, migrations, modélisation et requêtes SQL optimisées.',
  },

  {
    icon: Shield,
    title: 'Sécurité',
    description:
      'Authentification, permissions, gestion des accès et mise en œuvre de bonnes pratiques de sécurité.',
  },

  {
    icon: TestTube,
    title: 'Tests & Qualité',
    description:
      'Tests unitaires, tests d’intégration, couverture de code et amélioration continue de la qualité.',
  },

  {
    icon: Server,
    title: 'Déploiement',
    description:
      'Bases du DevOps, Docker, CI/CD et déploiement d’applications backend.',
  },

  // =========================
  // BUSINESS INTELLIGENCE
  // =========================

  {
    icon: BarChart3,
    title: 'Power BI',
    description:
      'Création de tableaux de bord interactifs, visualisation des données et suivi des indicateurs clés.',
  },

  {
    icon: Table2,
    title: 'SQL & Analyse',
    description:
      'Extraction, transformation et analyse des données à travers des requêtes SQL structurées.',
  },

  {
    icon: BrainCircuit,
    title: 'Pandas & NumPy',
    description:
      'Manipulation, nettoyage, transformation et analyse de données avec Python.',
  },

  {
    icon: Binary,
    title: 'Apache Spark',
    description:
      'Traitement distribué et analyse de grands volumes de données avec Apache Spark.',
  },

  {
    icon: Workflow,
    title: 'Data Processing',
    description:
      'Préparation et transformation des données pour produire des informations fiables et exploitables.',
  },
];

const SkillsSection = () => {

  return (

    <section id="skills" className="py-24 px-6">

      <div className="max-w-4xl mx-auto">

        <div className="mb-16">

          <p className="font-mono text-primary text-sm mb-2 tracking-wider">
            <span className="text-muted-foreground">$</span> cat bi_backend.json
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ce que je fais (BI & Backend)
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {skills.map((skill, index) => (

            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
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

export default SkillsSection;