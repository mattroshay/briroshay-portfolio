// Hand-curated exhibition list for the /exhibitions page.
//
// Bri edits this file directly — it's intentionally small and flat so it can
// be updated without touching components or the CMS. A Sanity schema for
// exhibitions is on the roadmap (Phase 3+); until then, this is the source of
// truth.
//
// Conventions
// - `year` is a string (display-only) so we can use ranges like "2024–25".
// - `monthEn` / `monthFr` are short display labels ("Mar — Jun", "Octobre").
// - `status: 'upcoming'` rows are pulled to the top of the list, then the rest
//   are sorted by year descending. Same-year ordering follows array order.

export type ExhibitionStatus = 'upcoming' | 'past';

export interface Exhibition {
  year: string;
  monthEn: string;
  monthFr: string;
  titleEn: string;
  titleFr: string;
  venueEn: string;
  venueFr: string;
  city: string;
  status: ExhibitionStatus;
}

export const exhibitions: Exhibition[] = [
  {
    year: '2026',
    monthEn: 'Sep — Oct',
    monthFr: 'Sept — Oct',
    titleEn: 'Light, Returned',
    titleFr: 'Lumière, retrouvée',
    venueEn: 'Galerie du Vieux Port',
    venueFr: 'Galerie du Vieux Port',
    city: 'Marseille, FR',
    status: 'upcoming',
  },
  {
    year: '2026',
    monthEn: 'Mar — Jun',
    monthFr: 'Mars — Juin',
    titleEn: 'Open Studio',
    titleFr: 'Atelier ouvert',
    venueEn: 'Studio Roshay',
    venueFr: 'Atelier Roshay',
    city: 'Lyon, FR',
    status: 'upcoming',
  },
  {
    year: '2024',
    monthEn: 'October',
    monthFr: 'Octobre',
    titleEn: 'Intimate Landscapes',
    titleFr: 'Paysages intimes',
    venueEn: 'Galerie du Vieux Port',
    venueFr: 'Galerie du Vieux Port',
    city: 'Marseille, FR',
    status: 'past',
  },
  {
    year: '2023',
    monthEn: 'May',
    monthFr: 'Mai',
    titleEn: 'Matter & Motion',
    titleFr: 'Matière & mouvement',
    venueEn: "Artists' Salon",
    venueFr: 'Salon des Artistes',
    city: 'Annecy, FR',
    status: 'past',
  },
  {
    year: '2022',
    monthEn: 'November',
    monthFr: 'Novembre',
    titleEn: 'Sculpting Silence',
    titleFr: 'Sculpter le silence',
    venueEn: 'Espace Pavé',
    venueFr: 'Espace Pavé',
    city: 'Lyon, FR',
    status: 'past',
  },
  {
    year: '2021',
    monthEn: 'June',
    monthFr: 'Juin',
    titleEn: 'First Landscapes',
    titleFr: 'Premiers paysages',
    venueEn: 'Central Library',
    venueFr: 'Médiathèque Centrale',
    city: 'Chambéry, FR',
    status: 'past',
  },
  {
    year: '2019',
    monthEn: 'September',
    monthFr: 'Septembre',
    titleEn: 'Faces of the Lake',
    titleFr: 'Visages du lac',
    venueEn: 'Maison des Arts',
    venueFr: 'Maison des Arts',
    city: 'Aix-les-Bains, FR',
    status: 'past',
  },
  {
    year: '2017',
    monthEn: 'April',
    monthFr: 'Avril',
    titleEn: 'Clay & Patience',
    titleFr: 'Argile & patience',
    venueEn: 'Atelier Bellevue',
    venueFr: 'Atelier Bellevue',
    city: 'Grenoble, FR',
    status: 'past',
  },
];

/**
 * Returns the exhibitions list with upcoming pinned to the top and past
 * sorted by year descending. Stable for same-year entries.
 */
export function sortedExhibitions(): Exhibition[] {
  const upcoming = exhibitions.filter((e) => e.status === 'upcoming');
  const past = exhibitions
    .filter((e) => e.status === 'past')
    .sort((a, b) => Number(b.year.slice(0, 4)) - Number(a.year.slice(0, 4)));
  return [...upcoming, ...past];
}
