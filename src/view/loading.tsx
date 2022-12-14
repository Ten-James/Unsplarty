import Navigation from '../components/Navigation';
import { Grid, Typography, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../ContextData';
import { loadingQuotes } from '../utils';

export default function Loading({ reason }: { reason?: string }) {
  const { me } = useContext(DataContext);
  const [visibleQuote, setVisibleQuote] = useState(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]);
  useEffect(() => {
    const interval = setInterval(() => {
      const newQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
      const length = visibleQuote.length;
      const length2 = newQuote.length;
      const interval2 = setInterval(() => setVisibleQuote(x => x.slice(0, x.length - 1)), 20);
      setTimeout(() => clearInterval(interval2), length * 20);
      setTimeout(() => {
        const interval3 = setInterval(() => setVisibleQuote(x => x + newQuote[x.length]), 20);
        setTimeout(() => {
          setVisibleQuote(newQuote);
          clearInterval(interval3);
        }, length2 * 20);
      }, length * 20);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Navigation title="Loading" />
      {[1, 2, 3, 4].map(x => (
        <Box
          key={x}
          bgcolor={th => th.palette.primary.main}
          className={`load load${x}`}
        />
      ))}
      <Typography
        variant="h3"
        color="primary"
        className="load5"
      >
        {me && me.loaded ? 'I am Loaded...' : visibleQuote}
      </Typography>
      {reason && (
        <Typography
          variant="h6"
          color="primary"
          className="load6"
        >
          {reason}
        </Typography>
      )}
    </>
  );
}
