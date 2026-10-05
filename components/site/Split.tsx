import { Fragment } from 'react';

type SplitProps = {
  text: string;
  by?: 'chars' | 'words';
  className?: string;
  /** Words (punctuation ignored) to set in the accent serif. */
  accent?: string[];
  /** Skip the screen-reader copy when a parent already provides the accessible text. */
  decorative?: boolean;
};

const bare = (word: string) => word.replace(/[^a-z0-9]/gi, '').toLowerCase();

export default function Split({ text, by = 'chars', className, accent, decorative = false }: SplitProps) {
  const words = text.split(' ');
  const accented = new Set(accent?.map(bare));

  return (
    <span className={className}>
      {!decorative && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={accented.has(bare(word)) ? 'sw is-accent' : 'sw'}>
              {by === 'chars' ? (
                Array.from(word).map((char, j) => (
                  <span className="sc" key={j}>
                    {char}
                  </span>
                ))
              ) : (
                <span className="si">{word}</span>
              )}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
