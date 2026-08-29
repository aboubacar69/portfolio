import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { LogOut, Mail, MailOpen, RefreshCw, Trash2 } from 'lucide-react';
import {
    fetchMessages,
    markAsRead,
    deleteMessage,
    logout,
    AdminApiError,
    type ContactMessage,
} from '@/lib/adminApi';

type PendingDelete = { ids: number[]; label: string } | null;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [markingId, setMarkingId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);
    const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadMessages = async () => {
        setIsLoading(true);
        try {
            const data = await fetchMessages();
            setMessages(data);
            setSelectedIds(new Set());
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

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === messages.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(messages.map((m) => m.id)));
        }
    };

    const confirmDeleteOne = (msg: ContactMessage) => {
        setPendingDelete({ ids: [msg.id], label: `le message de ${msg.name}` });
    };

    const confirmDeleteSelected = () => {
        setPendingDelete({
            ids: Array.from(selectedIds),
            label: `${selectedIds.size} message${selectedIds.size > 1 ? 's' : ''} sélectionné${selectedIds.size > 1 ? 's' : ''}`,
        });
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        setIsDeleting(true);
        try {
            await Promise.all(pendingDelete.ids.map((id) => deleteMessage(id)));
            toast.success('Supprimé', {
                description: `${pendingDelete.label} supprimé avec succès.`,
            });
            setPendingDelete(null);
            await loadMessages();
        } catch {
            toast.error('Erreur', { description: 'La suppression a échoué pour au moins un message.' });
        } finally {
            setIsDeleting(false);
        }
    };

    const unreadCount = messages.filter((m) => !m.is_read).length;
    const allSelected = messages.length > 0 && selectedIds.size === messages.length;

    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
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
                        {selectedIds.size > 0 && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={confirmDeleteSelected}
                                className="font-mono"
                            >
                                <Trash2 size={16} className="mr-2" />
                                Supprimer ({selectedIds.size})
                            </Button>
                        )}
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
                                    <TableHead className="w-10">
                                        <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
                                    </TableHead>
                                    <TableHead className="w-10"></TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Courriel</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Reçu le</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.map((msg) => (
                                    <TableRow key={msg.id} className={msg.is_read ? 'opacity-60' : ''}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedIds.has(msg.id)}
                                                onCheckedChange={() => toggleSelect(msg.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {msg.is_read ? (
                                                <MailOpen size={16} className="text-muted-foreground" />
                                            ) : (
                                                <Mail size={16} className="text-primary" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">{msg.name}</TableCell>
                                        <TableCell className="font-mono text-sm">{msg.email}</TableCell>
                                        <TableCell
                                            className="font-mono text-sm max-w-xs truncate cursor-pointer hover:text-primary"
                                            onClick={() => setViewingMessage(msg)}
                                            title="Cliquer pour lire le message complet"
                                        >
                                            {msg.message}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(msg.created_at).toLocaleString('fr-FR')}
                                        </TableCell>
                                        <TableCell className="text-right whitespace-nowrap">
                                            {!msg.is_read && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    disabled={markingId === msg.id}
                                                    onClick={() => handleMarkRead(msg.id)}
                                                    className="font-mono text-xs"
                                                >
                                                    Marquer lu
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => confirmDeleteOne(msg)}
                                                className="font-mono text-xs text-destructive hover:text-destructive"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* Dialog : voir le message complet */}
            <Dialog open={!!viewingMessage} onOpenChange={(open) => !open && setViewingMessage(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-mono">{viewingMessage?.name}</DialogTitle>
                        <DialogDescription className="font-mono text-xs">
                            {viewingMessage?.email} —{' '}
                            {viewingMessage && new Date(viewingMessage.created_at).toLocaleString('fr-FR')}
                        </DialogDescription>
                    </DialogHeader>
                    <p className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
                        {viewingMessage?.message}
                    </p>
                    {viewingMessage && !viewingMessage.is_read && (
                        <Button
                            size="sm"
                            onClick={() => {
                                handleMarkRead(viewingMessage.id);
                                setViewingMessage(null);
                            }}
                            className="font-mono w-fit"
                        >
                            Marquer comme lu
                        </Button>
                    )}
                </DialogContent>
            </Dialog>

            {/* Confirmation de suppression (simple ou multiple) */}
            <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                            Es-tu sûr de vouloir supprimer {pendingDelete?.label} ? Cette action est
                            irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminDashboard;