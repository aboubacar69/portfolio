import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { login, loginSchema, AdminApiError, isLoggedIn } from '@/lib/adminApi';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (isLoggedIn()) {
        navigate('/admin', { replace: true });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse(form);
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
            await login(result.data);
            navigate('/admin', { replace: true });
        } catch (err) {
            toast.error('Connexion échouée', {
                description: err instanceof AdminApiError ? err.message : 'Veuillez réessayer.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <p className="font-mono text-primary text-sm mb-2 tracking-wider text-center">
                    <span className="text-muted-foreground">$</span> ./admin --login
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="border border-border rounded-lg bg-card p-8 border-glow space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="username" className="font-mono text-sm text-muted-foreground">
                            Nom d'utilisateur
                        </Label>
                        <Input
                            id="username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="font-mono"
                            autoComplete="username"
                        />
                        {errors.username && (
                            <p className="text-xs text-destructive font-mono">{errors.username}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-mono text-sm text-muted-foreground">
                            Mot de passe
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="font-mono"
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive font-mono">{errors.password}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full font-mono">
                        {isSubmitting ? 'Connexion...' : 'Se connecter'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
