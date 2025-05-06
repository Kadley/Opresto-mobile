import DataLoader from 'dataloader';
import { prisma } from './utils/prisma';
import { Prisma, type Restaurant } from '../generated/prisma';

const restaurantLoader = new DataLoader(async (ids: readonly string[]) => {
  console.log('ids', ids);
  // On regroupe les ids pour éviter de faire une requête par restaurant
  // Ici on fait une requête pour récupérer tous les restaurants correspondant aux ids
  const restaurants: Restaurant[] =
    await prisma.$queryRaw`SELECT * FROM restaurant WHERE id IN (${Prisma.join(ids)})`;

  // On doit retourner les restaurants dans le même ordre que les ids
  // On utilise le map pour retourner le restaurant correspondant à chaque id et ainsi conserver l'ordre
  return ids.map((id) => {
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    if (!restaurant) {
      return null;
    }
    return restaurant;
  });
});

restaurantLoader
  .load('cma6l46kl003ho0apq2kzua4r')
  .then((d) => console.log('loaded 1', d));
restaurantLoader
  .load('cma6l46kl003ko0apk14xbsic')
  .then((d) => console.log('loaded 2', d));
restaurantLoader
  .load('cma6l46kl003po0apk4dkqgwf')
  .then((d) => console.log('loaded 3', d));
