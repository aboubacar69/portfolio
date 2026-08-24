import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import projectApi from '@/assets/project-api.jpg';
import projectWebapp from '@/assets/project-webapp.jpg';
import projectPlatform from '@/assets/project-platform.jpg';

const projects = [
  {
    title: 'API REST de Gestion',
    description: 'API complète avec authentification JWT, permissions et documentation Swagger.',
    image: projectApi,
    url: '#',
    tech: ['Django', 'DRF', 'PostgreSQL', 'JWT'],
  },
  {
    title: 'Dashboard Web App',
    description: 'Application de suivi de tâches avec tableau de bord et statistiques en temps réel.',
    image: projectWebapp,
    url: '#',
    tech: ['Django', 'React', 'Tailwind', 'SQL'],
  },
  {
    title: 'Plateforme E-commerce',
    description: 'Plateforme sécurisée avec gestion des utilisateurs, paiements et catalogue produits.',
    image: projectPlatform,
    url: '#',
    tech: ['Django', 'DRF', 'React', 'Docker'],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-primary text-sm mb-2 tracking-wider">
            <span className="text-muted-foreground">$</span> ls ./projets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Applications réalisées
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:border-glow transition-all duration-300 flex flex-col"
            >
              {/* Image background */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute top-3 right-3 p-1.5 rounded-md bg-background/70 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-mono font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-1 rounded bg-secondary text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
