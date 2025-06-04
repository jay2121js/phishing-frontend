import { useState, useRef } from 'react';
import ZecureLogo from './ZecureLogo';
import ResultCard from './ResultCard';

const ScanPage = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const validateUrl = (value) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?\S*)?(#[\w-]*)?$/;
    return urlPattern.test(value);
  };

  const normalizeUrl = (value) => {
    let normalized = value.trim();
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'http://' + normalized;
    }
    return normalized.replace(/^https?:\/\//i, (match) => match.toLowerCase());
  };

 const handleScan = async () => {
  if (!url.trim()) {
    setError('Please enter a URL to scan.');
    inputRef.current.focus();
    return;
  }

  if (!validateUrl(url)) {
    setError('Please enter a valid URL.');
    inputRef.current.focus();
    return;
  }

  setError('');
  setLoading(true);
  setResult(null);

  const normalizedUrl = normalizeUrl(url);
  const requestBody = { url: normalizedUrl };
  const apiEndpoint = 'https://phishingdetection-mbyt.onrender.com/api/check-url';

  const performScan = async (retry = false) => {
    try {
      console.log('Request body being sent:', JSON.stringify(requestBody));

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      if (typeof data.flag === 'undefined') {
        throw new Error('Invalid API response: "flag" field is missing');
      }

      const isSafe = Number(data.flag) === 1;
      setResult({ isSafe, url: normalizedUrl });

    } catch (err) {
      console.error('Fetch error:', err);

      if (!retry) {
        console.log('Retrying after 1.5 seconds...');
        setTimeout(() => performScan(true), 1500); // Retry once
      } else {
        setError('Error scanning URL: ' + err.message + '. Possible CORS issue – make sure the API allows cross-origin requests.');
      }
    } finally {
      if (retry) setLoading(false);
    }
  };

  await performScan();
};


  const handleReset = () => {
    setResult(null);
    setUrl('');
    setError('');
    setLoading(false);
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <ZecureLogo />
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste any URL here..."
          ref={inputRef}
          className="w-full bg-white bg-opacity-10 backdrop-blur-lg text-white placeholder-gray-400 rounded-full py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Enter URL to scan for phishing"
          disabled={loading}
          onKeyDown={(e) => e.key === 'Enter' && handleScan()}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={handleScan}
          aria-label="Trigger scan"
          disabled={loading}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-2 text-center">
        Not sure if that link is safe? Paste it here and we’ll sniff it for fakes.
      </p>

      {error && (
        <p className="text-red-400 mt-2 text-center" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-gray-400 mt-2 text-center animate-pulse">
          Scanning URL...
        </p>
      )}

      {result && (
        <ResultCard isSafe={result.isSafe} url={result.url} onReset={handleReset} />
      )}

      <button
        onClick={handleScan}
        className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full mt-6 transition-colors"
        aria-label="Scan URL for phishing"
        disabled={loading}
      >
        {loading ? 'Scanning...' : 'Scan Now'}
      </button>
    </div>
  );
};

export default ScanPage;
