import { Github, Linkedin, Mail } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-primary text-glow text-lg mb-6">
          Building reliable backends, one Django app at a time.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="saidmouinou.aboubacar20@gmail.com"
            className="p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> echo "Merci d'avoir scrollé jusqu'ici 👋"
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
