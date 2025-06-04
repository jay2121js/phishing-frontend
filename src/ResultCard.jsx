const ResultCard = ({ isSafe, url, onReset }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mt-4 text-white max-w-md w-full">
    {isSafe ? (
      <>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-green-400">This Website Looks Safe!</h2>
        </div>
        <p className="mt-2 text-gray-200">
          All clear! No signs of malware or phishing. The site looks safe and secure.
        </p>
        <div className="mt-4">
          <h3 className="font-semibold">Quick Details</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Domain Age: 5+ years</li>
            <li>SSL Status: Active & Verified</li>
            <li>Trust Score: 92/100</li>
            <li>Scan Type: Real-time URL analysis</li>
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-400 hover:underline flex items-center gap-1" 
            aria-label="Open safe website"
          >
            Open Website
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <button onClick={onReset} className="text-blue-400 hover:underline" aria-label="Scan another URL">
            Scan Another
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-400">Warning: This Link Looks Suspicious</h2>
        </div>
        <p className="mt-2 text-gray-200">
          This site looks risky. It could be fake or trying to steal your info.
        </p>
        <div className="mt-4">
          <h3 className="font-semibold">Quick Details</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Domain registered recently</li>
            <li>SSL Certificate: Missing or Invalid</li>
            <li>Phishing/Malware Pattern</li>
            <li>Reputation Score: 23/100</li>
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <button className="text-blue-400 hover:underline" onClick={() => alert("Opening help or info modal")} aria-label="Learn more about suspicious link">
            Learn More
          </button>
          <button className="text-red-400 hover:underline flex items-center gap-1" aria-label="Report suspicious site">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Report this site
          </button>
        </div>
        <button onClick={onReset} className="text-blue-400 hover:underline mt-2 block" aria-label="Scan another URL">
          Scan Another
        </button>
      </>
    )}
  </div>
);

export default ResultCard;
