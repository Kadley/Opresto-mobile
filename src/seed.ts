import { faker } from '@faker-js/faker/locale/fr';
import { prisma } from './utils/prisma';
import type { Prisma } from '../generated/prisma';

function generateManagers(nb = 10): Prisma.ManagerCreateInput[] {
  return Array.from({ length: nb }).map(() => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
  }));
}
function generateCities(nb = 10): Prisma.CityCreateInput[] {
  return Array.from({ length: nb }).map(() => ({
    name: faker.location.city(),
    postalCode: faker.location.zipCode(),
    geopos: faker.location
      .nearbyGPSCoordinate({
        isMetric: true,
        origin: [46.71109, 1.7191036],
        radius: 500,
      })
      .join(','),
  }));
}

function generateRestaurants(
  nb: number,
  {
    managerIds,
    cityIds,
    cookingStyleIds,
  }: {
    managerIds: string[];
    cityIds: string[];
    cookingStyleIds: string[];
  },
): Prisma.RestaurantCreateManyInput[] {
  return Array.from({ length: nb }).map(() => ({
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    address: faker.location.streetAddress(),
    terrace: faker.datatype.boolean(),
    cityId: faker.helpers.arrayElements(cityIds, 1)[0],
    managerId: faker.helpers.arrayElements(managerIds, 1)[0],
  }));
}

function generateCookingStyles(nb = 10): Prisma.CookingStyleCreateInput[] {
  return Array.from({ length: nb }).map(() => ({
    label: faker.food.ethnicCategory(),
  }));
}

async function main() {
  const managers = generateManagers(100);
  const cities = generateCities(15); // On ne génère pas trop de villes pour les requêtes API de météo
  const cookingStyles = generateCookingStyles(10);

  const createdManagers = await prisma.manager.createManyAndReturn({
    data: managers,
  });
  const createdCities = await prisma.city.createManyAndReturn({
    data: cities,
  });
  const createdCookingStyles = await prisma.cookingStyle.createManyAndReturn({
    data: cookingStyles,
  });

  const managerIds = createdManagers.map((m) => m.id);
  const cityIds = createdCities.map((c) => c.id);
  const cookingStyleIds = createdCookingStyles.map((cs) => cs.id);

  const restaurants = generateRestaurants(50, {
    managerIds,
    cityIds,
    cookingStyleIds,
  });

  const createdRestaurants = await prisma.restaurant.createManyAndReturn({
    data: restaurants,
  });

  // On associe les styles de cuisine aux restaurants
  await Promise.all(
    createdRestaurants.map(async (restaurant) => {
      const randomCookingStyleIds = faker.helpers.arrayElements(
        cookingStyleIds,
        faker.number.int({ min: 1, max: 3 }),
      );

      await prisma.restaurant.update({
        where: { id: restaurant.id },
        data: {
          cookingStyles: {
            connect: randomCookingStyleIds.map((id) => ({ id })),
          },
        },
      });
    }),
  );
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
