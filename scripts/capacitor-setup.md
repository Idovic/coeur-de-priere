
# Guide d'installation Capacitor pour Cœur de Prière

## Étapes pour tester sur appareil physique

### 1. Transférer le projet vers GitHub
- Cliquez sur le bouton "Export to Github" dans Lovable
- Clonez le projet depuis votre repository GitHub sur votre machine

### 2. Installation des dépendances
```bash
npm install
```

### 3. Ajouter les plateformes
Pour Android :
```bash
npx cap add android
```

Pour iOS (Mac avec Xcode requis) :
```bash
npx cap add ios
```

### 4. Construire le projet
```bash
npm run build
```

### 5. Synchroniser avec les plateformes natives
```bash
npx cap sync
```

### 6. Lancer sur appareil/émulateur

Pour Android :
```bash
npx cap run android
```

Pour iOS :
```bash
npx cap run ios
```

## Prérequis

### Pour Android :
- Android Studio installé
- SDK Android configuré
- Appareil Android en mode développeur OU émulateur Android

### Pour iOS :
- Mac avec Xcode installé
- Compte développeur Apple (pour tester sur appareil physique)
- iPhone/iPad en mode développeur OU simulateur iOS

## Configuration de production

Le fichier `capacitor.config.ts` est configuré pour utiliser votre site Netlify (`https://coeurdepriere.netlify.app/`), ce qui offre plusieurs avantages :

- **Stabilité** : Application indépendante du sandbox Lovable
- **Performance** : Chargement optimisé depuis Netlify
- **Mises à jour** : Déployez de nouvelles versions sans recompiler l'app native
- **Professionnalisme** : URL personnalisée pour votre application

### Important
Assurez-vous que votre application est bien déployée et accessible sur `https://coeurdepriere.netlify.app/` avant de suivre les étapes ci-dessus.

## Commandes utiles

- `npx cap update android` - Mettre à jour les dépendances Android
- `npx cap update ios` - Mettre à jour les dépendances iOS  
- `npx cap sync` - Synchroniser les changements avec les plateformes
- `npx cap open android` - Ouvrir le projet dans Android Studio
- `npx cap open ios` - Ouvrir le projet dans Xcode
