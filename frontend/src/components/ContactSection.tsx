import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { sendContactMessage, contactSchema, ApiError } from '@/lib/api';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await sendContactMessage(result.data);
      toast.success('Message envoyé !', {
        description: 'Merci, je vous répondrai dès que possible.',
      });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        const fieldErrors: Record<string, string> = {};
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          fieldErrors[field] = messages[0];
        });
        setErrors(fieldErrors);
      }
      toast.error("Échec de l'envoi", {
        description: err instanceof ApiError ? err.message : 'Veuillez réessayer plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-primary text-sm mb-2 tracking-wider">
            <span className="text-muted-foreground">$</span> ./contact --send
          </p>
          <h3 className="text-2xl md:text-2xl font-bold text-foreground">
            Un projet ou une opportunité à proposer ? <br />
            Ce formulaire est à votre disposition
            pour toute prise de contact
          </h3>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border rounded-lg bg-card p-8 border-glow space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="font-mono text-sm text-muted-foreground">
              Nom complet
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jean Dupont"
              className="font-mono"
            />
            {errors.name && <p className="text-xs text-destructive font-mono">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-mono text-sm text-muted-foreground">
              Courriel
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jean.dupont@email.com"
              className="font-mono"
            />
            {errors.email && <p className="text-xs text-destructive font-mono">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-mono text-sm text-muted-foreground">
              Message
            </Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Votre message..."
              rows={5}
              className="font-mono resize-none"
            />
            {errors.message && <p className="text-xs text-destructive font-mono">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground
            font-mono text-sm font-medium rounded-md hover:opacity-90 transition-opacity
            disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {isSubmitting ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
