import { asset } from '../utils/format';

export function MachineImage({
  name,
  alt,
  className = '',
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={[480, 768, 1200, 1600].map((size) => `${asset(`images/optimized/${name}-${size}.avif`)} ${size}w`).join(', ')}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
      />
      <source
        type="image/webp"
        srcSet={[480, 768, 1200, 1600].map((size) => `${asset(`images/optimized/${name}-${size}.webp`)} ${size}w`).join(', ')}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 620px"
      />
      <img
        src={asset(`images/optimized/${name}-1200.webp`)}
        alt={alt}
        className={className}
        width="1200"
        height="800"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
