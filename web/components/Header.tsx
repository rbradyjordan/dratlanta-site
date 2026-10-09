'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Magnet from '@/components/Magnet';
import BlurText from '@/components/BlurText';
import { ShineBorder } from '@/components/ui/shine-border';
import { NumberTicker } from '@/components/ui/number-ticker';

type Peek = { title: string; body: string; img: string; links: { href: string; label: string }[]; price?: boolean };

const items: { href: string; label: string; peek: Peek }[] = [
  {
    href: '/veneers/', label: 'Veneers',
    peek: {
      title: 'Lab-made porcelain, conservative prep.',
      body: 'Three to four visits. You approve a wax-up and wear trial temporaries before any porcelain is made.',
      img: '/photos/loupes-macro.webp',
      links: [{ href: '/veneers/#process', label: 'The visits, in order' }, { href: '/veneers/#faq', label: 'Does it hurt? How long do they last?' }, { href: '/fix-botched-veneers/', label: 'Fixing veneers done elsewhere' }],
    },
  },
  {
    href: '/smile-design/', label: 'Shade studio',
    peek: {
      title: 'White is not one color.',
      body: 'Try porcelain shades against your own tone, then do it for real in daylight with Dr. Ennuson.',
      img: '/photos/loupes-side.webp',
      links: [{ href: '/smile-design/', label: 'Open the studio' }, { href: '/smile-design/#chart', label: 'The shade chart, in plain terms' }],
    },
  },
  {
    href: '/results/', label: 'Cases',
    peek: {
      title: 'Real patients, before and after.',
      body: 'No models, no filters. Scroll to reveal each after, drag to look closer.',
      img: '/photos/cases/sarah-after.webp',
      links: [{ href: '/results/', label: 'See every transformation' }, { href: '/results/#how-to-read', label: 'How to read a before and after' }],
    },
  },
  {
    href: '/pricing/', label: 'Pricing',
    peek: {
      title: 'The price is the price.',
      body: 'Full-arch smile design, published and confirmed in writing before treatment. Financing through Cherry, Sunbit, and HFD.',
      img: '/photos/operatory-light.webp',
      links: [{ href: '/pricing/', label: 'Monthly payment calculator' }, { href: '/pricing/#cost', label: 'What changes the cost' }],
      price: true,
    },
  },
  {
    href: '/about/', label: 'Dr. Ennuson',
    peek: {
      title: 'USC Herman Ostrow. Licensed in Georgia.',
      body: 'Photography-led planning, conservative by conviction, and a written price before anything is permanent.',
      img: '/photos/ennuson-hallway.webp',
      links: [{ href: '/about/', label: 'About the doctor' }, { href: '/why-licensed/', label: 'Licensed dentist vs. veneer tech' }, { href: '/contact/', label: 'Contact and directions' }],
    },
  },
];

declare global {
  interface Window { __lenis?: { stop: () => void; start: () => void } }
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [peek, setPeek] = useState<number | null>(null);
  const peekTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const overHero = pathname === '/';

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); setPeek(null); }, [pathname]);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 40);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    return () => { document.documentElement.style.overflow = ''; window.__lenis?.start(); };
  }, [open]);
  useEffect(() => {
    if (!open && peek === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setPeek(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, peek]);

  const current = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');
  const light = overHero && !scrolled && !open && peek === null;

  // Peek panel opens after a short dwell so brushing past the nav does nothing.
  const armPeek = (i: number) => {
    setHover(i);
    if (peekTimer.current) window.clearTimeout(peekTimer.current);
    peekTimer.current = window.setTimeout(() => setPeek(i), peek === null ? 220 : 60);
  };
  const disarm = () => {
    setHover(null);
    if (peekTimer.current) window.clearTimeout(peekTimer.current);
    peekTimer.current = window.setTimeout(() => setPeek(null), 160);
  };
  const hold = () => { if (peekTimer.current) window.clearTimeout(peekTimer.current); };

  const active = peek !== null ? items[peek].peek : null;

  return (
    <>
      <header className={`hd${scrolled ? ' tight' : ''}${light ? ' light' : ''}${peek !== null ? ' peeking' : ''}`} onMouseLeave={disarm}>
        <div className="hd-shell">
          <div className="hd-bar">
            <Link className="mark" href="/" aria-label="Dr. Atlanta Cosmetic Dentistry, home">
              <span className="mark-name">Dr. Atlanta</span>
              <span className="mark-sub">Cosmetic Dentistry</span>
            </Link>

            <LayoutGroup id="hd-nav">
              <nav className="hd-nav" aria-label="Primary" onMouseEnter={hold}>
                {items.map((it, i) => {
                  const on = hover === i || (hover === null && current(it.href));
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      aria-current={current(it.href) ? 'page' : undefined}
                      className={`hd-link${current(it.href) ? ' is-current' : ''}${on ? ' is-on' : ''}`}
                      onMouseEnter={() => armPeek(i)}
                      onFocus={() => armPeek(i)}
                    >
                      {on && <motion.span layoutId="hd-pill" className="hd-pill" transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.6 }} />}
                      <span className="hd-label">{it.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </LayoutGroup>

            <div className="hd-end">
              <a className="hd-tel" href="tel:+14043834574">
                <span className="hd-dot" aria-hidden="true" />
                <span className="hd-tel-num">(404) 383-4574</span>
                <span className="hd-tel-sub">Evening &amp; weekend consults</span>
              </a>
              <span className="hd-cta-wrap">
                <Magnet padding={70} magnetStrength={3.2} wrapperClassName="hd-magnet" innerClassName="hd-magnet-inner">
                  <Link className="btn solid hd-cta" href="/consultation/">
                    <ShineBorder shineColor={['#F2F1ED', '#B9975B', '#F2F1ED']} borderWidth={1} duration={9} className="hd-shine" />
                    Book a consultation
                  </Link>
                </Magnet>
              </span>
              <button className="nav-toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
                {open ? 'Close' : 'Menu'}
              </button>
            </div>

            <span className="hd-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
          </div>

          <AnimatePresence>
            {active && (
              <motion.div
                key={peek}
                className="hd-peek"
                onMouseEnter={hold}
                initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -6, scaleY: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hd-peek-img" aria-hidden="true">
                  <img src={active.img} alt="" />
                </div>
                <div className="hd-peek-copy">
                  <p className="hd-peek-title">{active.title}</p>
                  <p className="hd-peek-body">{active.body}</p>
                </div>
                <div className="hd-peek-side">
                  {active.price && (
                    <div className="hd-peek-price">
                      <span className="hd-peek-price-k">Full-arch smile design, from</span>
                      <span className="hd-peek-price-v">$<NumberTicker value={250} startValue={190} delay={0.1} /><span className="hd-peek-price-u">/mo</span></span>
                      {/* Reg Z: a stated payment travels with its term, down payment and APR. */}
                      <span className="hd-peek-price-s">36 payments at 0% APR, $0 down, on the $8,999 full arch. Representative example; subject to credit approval.</span>
                    </div>
                  )}
                  <ul className="hd-peek-links">
                    {active.links.map((l) => <li key={l.href + l.label}><Link href={l.href}>{l.label}</Link></li>)}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {mounted && createPortal(
        <div id="menu" className={`menu${open ? ' open' : ''}`} aria-hidden={!open} inert={!open}>
          <nav aria-label="Primary, mobile">
            {items.map((it, i) => (
              <Link key={it.href} href={it.href} aria-current={current(it.href) ? 'page' : undefined}>
                {open ? <BlurText text={it.label} delay={70 + i * 55} animateBy="words" direction="top" className="menu-blur" /> : it.label}
              </Link>
            ))}
            <Link href="/consultation/" className="menu-cta">
              {open ? <BlurText text="Book a consultation" delay={400} animateBy="words" direction="top" className="menu-blur" /> : 'Book a consultation'}
            </Link>
          </nav>
          <div className="menu-foot">
            <div className="menu-more">
              <Link href="/fix-botched-veneers/">Fixing botched veneers</Link>
              <Link href="/why-licensed/">Licensed dentist vs. veneer tech</Link>
              <Link href="/contact/">Contact and directions</Link>
            </div>
            <a className="link" href="tel:+14043834574">(404) 383-4574</a>
            <span className="small">Serving metro Atlanta · Evening and weekend consultations</span>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
