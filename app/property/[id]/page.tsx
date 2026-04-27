import PropertyDetailClient from './PropertyDetailClient';

export async function generateStaticParams() {
  const propertyIds = ['prop_1', 'prop_2', 'prop_3', 'prop_4', 'prop_5', 'prop_6', 'prop_7', 'prop_8', 'prop_9', 'prop_10', 'prop_11', 'prop_12'];
  return propertyIds.map((id) => ({
    id,
  }));
}

export default function Page() {
  return <PropertyDetailClient />;
}
