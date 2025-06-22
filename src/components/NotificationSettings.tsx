
import React from 'react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useNotifications } from '../hooks/useNotifications';
import { Bell, BellOff, TestTube, Clock, MessageCircle } from 'lucide-react';

const NotificationSettings = () => {
  const { 
    settings, 
    permission, 
    requestPermission, 
    updateSettings, 
    sendTestNotification,
    isSupported 
  } = useNotifications();

  if (!isSupported) {
    return (
      <Card className="glass-card border-white/30 p-6">
        <div className="text-center">
          <BellOff className="w-12 h-12 text-serenity-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-prayer-800 mb-2">
            Notifications non disponibles
          </h3>
          <p className="text-serenity-600 text-sm">
            Votre navigateur ne supporte pas les notifications push
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-prayer-500" />
          <h3 className="text-xl font-semibold text-prayer-800 font-nunito">
            Rappels de Prière
          </h3>
        </div>

        <div className="space-y-6">
          {/* Activation des notifications */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-prayer-700">
                Activer les rappels quotidiens
              </Label>
              <p className="text-sm text-serenity-600 mt-1">
                Recevez 2 notifications par jour pour vos moments de prière
              </p>
            </div>
            <Switch
              checked={settings.enabled && permission === 'granted'}
              onCheckedChange={async (checked) => {
                if (checked && permission !== 'granted') {
                  const granted = await requestPermission();
                  if (granted) {
                    updateSettings({ enabled: true });
                  }
                } else {
                  updateSettings({ enabled: checked });
                }
              }}
            />
          </div>

          {/* Horaires */}
          {settings.enabled && permission === 'granted' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2 text-sm font-medium text-prayer-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Prière du matin
                  </Label>
                  <Input
                    type="time"
                    value={settings.morningTime}
                    onChange={(e) => updateSettings({ morningTime: e.target.value })}
                    className="bg-white/40 border-white/50"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 text-sm font-medium text-prayer-700 mb-2">
                    <Clock className="w-4 h-4" />
                    Prière du soir
                  </Label>
                  <Input
                    type="time"
                    value={settings.eveningTime}
                    onChange={(e) => updateSettings({ eveningTime: e.target.value })}
                    className="bg-white/40 border-white/50"
                  />
                </div>
              </div>

              {/* Messages motivationnels */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="flex items-center gap-2 text-base font-medium text-prayer-700">
                    <MessageCircle className="w-4 h-4" />
                    Messages d'encouragement
                  </Label>
                  <p className="text-sm text-serenity-600 mt-1">
                    Inclure des versets et bénédictions dans les notifications
                  </p>
                </div>
                <Switch
                  checked={settings.motivationalMessages}
                  onCheckedChange={(checked) => updateSettings({ motivationalMessages: checked })}
                />
              </div>

              {/* Test de notification */}
              <Button
                onClick={sendTestNotification}
                variant="outline"
                className="w-full bg-white/20 border-prayer-300 text-prayer-700 hover:bg-prayer-50"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Tester les notifications
              </Button>
            </>
          )}

          {/* Permission pas accordée */}
          {permission === 'denied' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-orange-800 mb-2">
                <BellOff className="w-5 h-5" />
                <span className="font-medium">Notifications bloquées</span>
              </div>
              <p className="text-sm text-orange-700">
                Activez les notifications dans les paramètres de votre navigateur, 
                puis rechargez la page.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationSettings;
