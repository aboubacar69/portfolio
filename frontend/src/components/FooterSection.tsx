import { Github, Linkedin, Mail, MessageCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EMAIL = 'saidmouinou.aboubacar20@gmail.com';
const WHATSAPP_NUMBER = '221788220989';
const SUBJECT = 'Contact depuis ton portfolio';
const BODY = '';
const WHATSAPP_MESSAGE = '';

const enc = encodeURIComponent;

const links = {
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(EMAIL)}&su=${enc(SUBJECT)}&body=${enc(BODY)}`,
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${enc(WHATSAPP_MESSAGE)}`,
};

const iconBtn =
  'p-3 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors';

const FooterSection = () => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success('Email copié !', { description: EMAIL });
    } catch {
      toast.error('Impossible de copier', { description: EMAIL });
    }
  };

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
            className={iconBtn}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={iconBtn} aria-label="Me contacter">
                <Mail size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="font-mono">
              <DropdownMenuItem asChild>
                <a href={links.gmail} target="_blank" rel="noopener noreferrer">
                  <Mail size={16} className="mr-2" /> Gmail
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} className="mr-2" /> WhatsApp
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleCopyEmail}>
                <Copy size={16} className="mr-2" /> Copier l'email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> echo "Merci d'avoir scrollé jusqu'ici 👋"
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;