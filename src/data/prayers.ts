
import { PrayerTopic } from '../types/prayer';
import { paixPrayers } from './prayers/paix';
import { sagessePrayers } from './prayers/sagesse';
import { healingComfortPrayers } from './prayers/healing-comfort';
import { protectionPrayers } from './prayers/protection';
import { foiPrayers } from './prayers/foi';
import { famillePrayers } from './prayers/famille';
import { provisionBlessingPrayers } from './prayers/provision-blessing';
import { pardonPrayers } from './prayers/pardon';
import { directionPrayers } from './prayers/direction';
import { reconnaissancePrayers } from './prayers/reconnaissance';
import { spiritualGrowthPrayers } from './prayers/spiritual-growth';
import { societalGlobalPrayers } from './prayers/societal-global';
import { churchCommunityPrayers } from './prayers/church-community';
import { amourPrayers } from './prayers/amour';
import { protectionDeliverancePrayers } from './prayers/protection-deliverance';
import { wisdomGuidancePrayers } from './prayers/wisdom-guidance';
import { familyRelationshipPrayers } from './prayers/family-relationship';
import { additionalPrayers } from './prayers/additional';

export const allPrayers: PrayerTopic[] = [
  ...paixPrayers,
  ...sagessePrayers,
  ...healingComfortPrayers,
  ...protectionPrayers,
  ...foiPrayers,
  ...famillePrayers,
  ...provisionBlessingPrayers,
  ...pardonPrayers,
  ...directionPrayers,
  ...reconnaissancePrayers,
  ...spiritualGrowthPrayers,
  ...societalGlobalPrayers,
  ...churchCommunityPrayers,
  ...amourPrayers,
  ...protectionDeliverancePrayers,
  ...wisdomGuidancePrayers,
  ...familyRelationshipPrayers,
  ...additionalPrayers
].sort((a, b) => a.id - b.id);

export const prayersByCategory = {
  'paix': paixPrayers,
  'sagesse': sagessePrayers,
  'healing-comfort': healingComfortPrayers,
  'protection': protectionPrayers,
  'foi': foiPrayers,
  'famille': famillePrayers,
  'provision-blessing': provisionBlessingPrayers,
  'pardon': pardonPrayers,
  'direction': directionPrayers,
  'reconnaissance': reconnaissancePrayers,
  'spiritual-growth': spiritualGrowthPrayers,
  'societal-global': societalGlobalPrayers,
  'church-community': churchCommunityPrayers,
  'amour': amourPrayers,
  'protection-deliverance': protectionDeliverancePrayers,
  'wisdom-guidance': wisdomGuidancePrayers
};

// Validation pour s'assurer que nous avons bien 110 prières
console.log(`Total des prières : ${allPrayers.length}`);
if (allPrayers.length !== 110) {
  console.warn(`Attention : ${allPrayers.length} prières trouvées, 110 attendues`);
}

// Vérification des IDs uniques
const ids = allPrayers.map(p => p.id);
const uniqueIds = new Set(ids);
if (ids.length !== uniqueIds.size) {
  console.error('Des IDs de prières sont dupliqués');
}

// Vérification de la séquence des IDs (1 à 110)
for (let i = 1; i <= 110; i++) {
  if (!ids.includes(i)) {
    console.error(`Prière avec l'ID ${i} manquante`);
  }
}

export default allPrayers;
