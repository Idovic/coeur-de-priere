
import { PrayerTopic } from '../types/prayer';
import { completePrayers } from './prayers/complete-prayers';

export const allPrayers: PrayerTopic[] = completePrayers;

export const prayersByCategory = {
  'paix': allPrayers.filter(p => p.category === 'paix'),
  'sagesse': allPrayers.filter(p => p.category === 'sagesse'),
  'healing-comfort': allPrayers.filter(p => p.category === 'healing-comfort'),
  'protection': allPrayers.filter(p => p.category === 'protection'),
  'foi': allPrayers.filter(p => p.category === 'foi'),
  'famille': allPrayers.filter(p => p.category === 'famille'),
  'provision-blessing': allPrayers.filter(p => p.category === 'provision-blessing'),
  'pardon': allPrayers.filter(p => p.category === 'pardon'),
  'direction': allPrayers.filter(p => p.category === 'direction'),
  'reconnaissance': allPrayers.filter(p => p.category === 'reconnaissance'),
  'spiritual-growth': allPrayers.filter(p => p.category === 'spiritual-growth'),
  'societal-global': allPrayers.filter(p => p.category === 'societal-global'),
  'church-community': allPrayers.filter(p => p.category === 'church-community'),
  'amour': allPrayers.filter(p => p.category === 'amour'),
  'protection-deliverance': allPrayers.filter(p => p.category === 'protection-deliverance'),
  'wisdom-guidance': allPrayers.filter(p => p.category === 'wisdom-guidance'),
  'family-relationship': allPrayers.filter(p => p.category === 'family-relationship')
};

// Validation stricte pour s'assurer que nous avons exactement 110 prières
console.log(`=== VALIDATION FINALE DES PRIÈRES ===`);
console.log(`Total des prières : ${allPrayers.length}`);

if (allPrayers.length !== 110) {
  console.error(`ERREUR CRITIQUE : ${allPrayers.length} prières trouvées, 110 attendues`);
} else {
  console.log(`✓ Nombre correct de prières : 110`);
}

// Vérification des IDs uniques et séquentiels
const ids = allPrayers.map(p => p.id).sort((a, b) => a - b);
const expectedIds = Array.from({length: 110}, (_, i) => i + 1);
const missingIds = expectedIds.filter(id => !ids.includes(id));
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

if (missingIds.length > 0) {
  console.error(`IDs manquants : [${missingIds.join(', ')}]`);
} else {
  console.log(`✓ Tous les IDs 1-110 sont présents`);
}

if (duplicateIds.length > 0) {
  console.error(`IDs dupliqués : [${duplicateIds.join(', ')}]`);
} else {
  console.log(`✓ Aucun ID dupliqué`);
}

// Vérification de la longueur des contenus
const shortPrayers = allPrayers.filter(p => p.content.length < 200);
if (shortPrayers.length > 0) {
  console.warn(`Prières potentiellement tronquées (< 200 caractères) : [${shortPrayers.map(p => p.id).join(', ')}]`);
} else {
  console.log(`✓ Toutes les prières ont un contenu suffisant`);
}

// Vérification des titres
const prayersWithoutTitle = allPrayers.filter(p => !p.title || p.title.trim() === '');
if (prayersWithoutTitle.length > 0) {
  console.error(`Prières sans titre : [${prayersWithoutTitle.map(p => p.id).join(', ')}]`);
} else {
  console.log(`✓ Toutes les prières ont un titre`);
}

console.log(`=== FIN DE LA VALIDATION ===`);

export default allPrayers;
