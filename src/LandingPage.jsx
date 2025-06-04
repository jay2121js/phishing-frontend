import ZecureLogo from './ZecureLogo';

const LandingPage = ({ onGetStarted }) => (
  <div className="flex flex-col items-center justify-center min-h-screen text-white">
    <ZecureLogo />
    <h1 className="text-5xl font-bold mb-4">Zecure</h1>
    <p className="text-lg mb-8">Because Every Click Matters!</p>
    <button 
      onClick={onGetStarted}
      className="bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors"
      aria-label="Get started with Zecure"
    >
      Get Started
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default LandingPage;
