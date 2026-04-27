import React, { createContext, useContext, useState, useEffect } from 'react';

interface Notification {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timestamp: Date;
    read: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    clearNotifications: () => void;
    unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Carregar notificações do localStorage ao inicializar
    useEffect(() => {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Converter timestamps de string para Date
                const notificationsWithDates = parsed.map((notif: {
                    id: string;
                    type: 'success' | 'error' | 'info' | 'warning';
                    message: string;
                    timestamp: string;
                    read: boolean;
                }) => ({
                    ...notif,
                    timestamp: new Date(notif.timestamp)
                }));
                setNotifications(notificationsWithDates);
            } catch (error) {
                console.error('Erro ao carregar notificações:', error);
            }
        }
    }, []);

    // Salvar notificações no localStorage sempre que mudarem
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
        const newNotification: Notification = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            type,
            message,
            timestamp: new Date(),
            read: false
        };

        setNotifications(prev => {
            // Adicionar nova notificação e manter apenas as últimas 10
            const updated = [newNotification, ...prev].slice(0, 10);
            return updated;
        });
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev =>
            prev.filter(notif => notif.id !== id)
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                markAllAsRead,
                deleteNotification,
                clearNotifications,
                unreadCount
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};