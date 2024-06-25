import { onLCP, onINP, onCLS } from 'web-vitals';

const reportWebVitals = () => {
  onCLS(console.log);
  onINP(console.log);
  onLCP(console.log);
};

export default reportWebVitals;
