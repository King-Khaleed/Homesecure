import NeighborhoodGuideClient from './NeighborhoodGuideClient';

export async function generateStaticParams() {
  const cities = ['lagos', 'abuja', 'portharcourt', 'ibadan', 'kano'];
  return cities.map((city) => ({
    city,
  }));
}

export default function Page() {
  return <NeighborhoodGuideClient />;
}
