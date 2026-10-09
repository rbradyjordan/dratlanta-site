type Props = {
  /** Shoot direction shown in the frame until photography is delivered. */
  cap: string;
  ratio?: '3x4' | '4x5' | '4x3' | '1x1' | '16x9' | '21x9';
  tone?: 'light' | 'deep' | 'skin';
  className?: string;
};

export default function Plate({ cap, ratio = '4x5', tone = 'light', className = '' }: Props) {
  return (
    <div className={`plate r-${ratio} ${tone === 'light' ? '' : tone} ${className}`} role="img" aria-label={cap}>
      <span className="cap">{cap}</span>
    </div>
  );
}
