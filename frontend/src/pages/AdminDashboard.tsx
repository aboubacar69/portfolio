import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { LogOut, Mail, MailOpen, RefreshCw } from 'lucide-react';
import {
    fetchMessages,
    markAsRead,
    logout,
    AdminApiError,
    type ContactMessage,
} from '@/lib/adminApi';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [markingId, setMarkingId] = useState<number | null>(null);

    const loadMessages = async () => {
        setIsLoading(true);
        try {
            const data = await fetchMessages();
            setMessages(data);
        } catch (err) {
            if (err instanceof AdminApiError && err.status === 401) {
                logout();
                navigate('/admin/login', { replace: true });
                return;
            }
            toast.error('Erreur', { description: 'Impossible de charger les messages.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMarkRead = async (id: number) => {
        setMarkingId(id);
        try {
            const updated = await markAsRead(id);
            setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
        } catch {
            toast.error('Erreur', { description: 'Impossible de marquer comme lu.' });
        } finally {
            setMarkingId(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login', { replace: true });
    };

    const unreadCount = messages.filter((m) => !m.is_read).length;

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="font-mono text-primary text-sm mb-1 tracking-wider">
                            <span className="text-muted-foreground">$</span> ./admin --messages
                        </p>
                        <h1 className="text-2xl font-bold text-foreground">
                            Messages reçus{' '}
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-2 align-middle">
                                    {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                                </Badge>
                            )}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={loadMessages} className="font-mono">
                            <RefreshCw size={16} className="mr-2" />
                            Actualiser
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="font-mono">
                            <LogOut size={16} className="mr-2" />
                            Déconnexion
                        </Button>
                    </div>
                </div>

                <div className="border border-border rounded-lg bg-card border-glow overflow-x-auto">
                    {isLoading ? (
                        <p className="p-8 text-center text-muted-foreground font-mono text-sm">
                            Chargement...
                        </p>
                    ) : messages.length === 0 ? (
                        <p className="p-8 text-center text-muted-foreground font-mono text-sm">
                            Aucun message reçu pour l'instant.
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10"></TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Courriel</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Reçu le</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.map((msg) => (
                                    <TableRow key={msg.id} className={msg.is_read ? 'opacity-60' : ''}>
                                        <TableCell>
                                            {msg.is_read ? (
                                                <MailOpen size={16} className="text-muted-foreground" />
                                            ) : (
                                                <Mail size={16} className="text-primary" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{msg.name}</TableCell>
                                        <TableCell className="font-mono text-sm">{msg.email}</TableCell>
                                        <TableCell className="font-mono text-sm max-w-xs truncate" title={msg.message}>
                                            {msg.message}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(msg.created_at).toLocaleString('fr-FR')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {!msg.is_read && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    disabled={markingId === msg.id}
                                                    onClick={() => handleMarkRead(msg.id)}
                                                    className="font-mono text-xs"
                                                >
                                                    Marquer comme lu
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
