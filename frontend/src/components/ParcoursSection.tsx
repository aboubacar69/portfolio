import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code2, Briefcase, type LucideIcon } from 'lucide-react';

interface ParcoursItem {
  year: string;
  title: string;
  location: string;
  description: string;
  icon: LucideIcon;
}

const parcours: ParcoursItem[] = [
  {
    year: '2025 — Ajourd\'hui',
    title: 'Spécialisation en Business Intelligence et Dev Backend (Django Rest Framework)',
    location: 'ETABLISSEMENT : Université Cheikh Anta Diop De Dakar, (SENEGAL)',
    description: "Approfondissement du backend avec Python, Django et la conception d'API REST.",
    icon: Code2,
  },
  {
    year: '2020 — 2025',
    title: "Licence en Génie Logiciel & Systèmes d'Information",
    location: 'ETABLISSEMENT : Université de Gabès, (TUNISIE)',
    description: 'Découverte de la programmation, des algorithmes et des bases de données relationnelles.',
    icon: GraduationCap,
  },
  {
    year: '2019 — 2020',
    title: 'Baccalauréat scientifique',
    location: 'ETABLISSEMENT : GSK, LOCATION : (COMORES)',
    description: 'Premiers pas dans la logique et les mathématiques, base de la pensée structurée.',
    icon: BookOpen,
  },
  {
    year: '2016 — 2017',
    title: "Brevet d'Etudes",
    location: 'ETABLISSEMENT : GSK, (COMORES)',
    description: '',
    icon: BookOpen,
  },
];

const ParcoursSection = () => {
  return (
    <section id="parcours" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-wider">
            <span className="text-muted-foreground">$</span> cat parcours.md
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Formation & Parcours
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Mon cheminement académique et les formations qui ont construit mes compétences.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {parcours.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full 
                -translate-x-1.5 mt-2 ring-4 ring-background z-10 shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                    }`}
                >
                  <div className="border border-border rounded-lg bg-card p-6 hover:border-primary/50 hover:border-glow transition-all duration-300">
                    <div
                      className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-primary">
                        <item.icon size={18} />
                      </div>
                      <span className="font-mono text-xs text-primary font-medium">{item.year}</span>
                    </div>
                    <h3 className="font-mono font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
