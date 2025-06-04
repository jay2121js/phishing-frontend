import React, { useState } from 'react';
import LandingPage from './LandingPage.jsx';
import ScanPage from './ScanPage';

const App = () => {
  const [showScanPage, setShowScanPage] = useState(false);

  return showScanPage ? (
    <ScanPage />
  ) : (
    <LandingPage onGetStarted={() => setShowScanPage(true)} />
  );
};

export default App;
