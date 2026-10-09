import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio for the frame; the image covers it. Defaults to the image's own ratio. */
  ratio?: string;
  position?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/** Brand photography frame. Explicit dimensions hold layout; object-fit covers the chosen ratio. */
export default function Photo({ src, alt, width, height, ratio, position = '50% 50%', priority, sizes = '(max-width: 960px) 100vw, 50vw', className = '' }: Props) {
  return (
    <div className={`photo ${className}`} style={{ aspectRatio: ratio ?? `${width} / ${height}` }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }}
      />
    </div>
  );
}
