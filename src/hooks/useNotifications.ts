
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

interface NotificationSettings {
  enabled: boolean;
  morningTime: string;
  eveningTime: string;
  motivationalMessages: boolean;
}

const MOTIVATIONAL_MESSAGES = [
  "🙏 'Priez sans cesse' - 1 Thessaloniciens 5:17",
  "✨ Que cette journée soit bénie par votre communion avec Dieu",
  "💝 'L'Éternel, ton Dieu, est au milieu de toi' - Sophonie 3:17",
  "🌅 Commencez votre journée dans la présence divine",
  "🌟 'Cherchez d'abord le royaume de Dieu' - Matthieu 6:33",
  "💛 Dieu vous aime d'un amour éternel",
  "🕊️ 'Ma paix, je vous la donne' - Jean 14:27",
  "🎯 Prenez un moment pour vous connecter à l'Éternel",
  "🌸 'Il renouvelle ma force' - Psaume 23:3",
  "⭐ Votre prière d'aujourd'hui peut transformer votre journée",
];

export const useNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    morningTime: '08:00',
    eveningTime: '20:00',
    motivationalMessages: true,
  });
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  useEffect(() => {
    // Charger les paramètres depuis le localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Vérifier le statut des permissions
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Enregistrer le service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      toast({
        title: "Notifications non supportées",
        description: "Votre navigateur ne supporte pas les notifications",
        variant: "destructive",
      });
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      toast({
        title: "Notifications activées ✨",
        description: "Vous recevrez des rappels de prière quotidiens",
      });
      return true;
    } else {
      toast({
        title: "Permissions refusées",
        description: "Activez les notifications dans les paramètres de votre navigateur",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));

    if (updatedSettings.enabled && permission === 'granted') {
      scheduleNotifications(updatedSettings);
    }
  };

  const scheduleNotifications = (notificationSettings: NotificationSettings) => {
    // Clear existing intervals
    const intervals = JSON.parse(localStorage.getItem('notificationIntervals') || '[]');
    intervals.forEach((id: number) => clearInterval(id));

    if (!notificationSettings.enabled) return;

    const scheduleDaily = (time: string, isEvening = false) => {
      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const scheduled = new Date();
      scheduled.setHours(hours, minutes, 0, 0);

      if (scheduled <= now) {
        scheduled.setDate(scheduled.getDate() + 1);
      }

      const msUntilScheduled = scheduled.getTime() - now.getTime();

      setTimeout(() => {
        sendNotification(isEvening);
        // Répéter toutes les 24h
        const intervalId = setInterval(() => sendNotification(isEvening), 24 * 60 * 60 * 1000);
        
        const newIntervals = JSON.parse(localStorage.getItem('notificationIntervals') || '[]');
        newIntervals.push(intervalId);
        localStorage.setItem('notificationIntervals', JSON.stringify(newIntervals));
      }, msUntilScheduled);
    };

    scheduleDaily(notificationSettings.morningTime, false);
    scheduleDaily(notificationSettings.eveningTime, true);
  };

  const sendNotification = (isEvening = false) => {
    if (permission !== 'granted') return;

    const timeOfDay = isEvening ? 'du soir' : 'du matin';
    const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];

    const notification = new Notification(`Moment de prière ${timeOfDay}`, {
      body: settings.motivationalMessages ? randomMessage : 'Prenez un moment pour prier',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'daily-prayer',
      data: { url: '/' },
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto-close après 10 secondes
    setTimeout(() => notification.close(), 10000);
  };

  const sendTestNotification = () => {
    if (permission === 'granted') {
      sendNotification();
      toast({
        title: "Notification test envoyée 🔔",
        description: "Vérifiez que vous l'avez bien reçue",
      });
    } else {
      toast({
        title: "Permissions requises",
        description: "Activez d'abord les notifications",
        variant: "destructive",
      });
    }
  };

  return {
    settings,
    permission,
    requestPermission,
    updateSettings,
    sendTestNotification,
    isSupported: 'Notification' in window && 'serviceWorker' in navigator,
  };
};
