import { useParams } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { ChapterReader } from '@/components/bible/ChapterReader';

const LeerCapitulo = () => {
  const { collectionSlug } = useParams<{ collectionSlug?: string }>();
  
  // Use 'santa-biblia' as default if collectionSlug is not provided
  const effectiveCollectionSlug = collectionSlug || 'santa-biblia';

  return (
    <>
      <ChapterReader collectionSlug={effectiveCollectionSlug} />
      <BottomNav />
    </>
  );
};

export default LeerCapitulo;
