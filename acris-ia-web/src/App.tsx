
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Problem } from './components/sections/Problem';
import { Solution } from './components/sections/Solution';
import { CostOfInaction } from './components/sections/CostOfInaction';
import { HowItWorks } from './components/sections/HowItWorks';

import { ForWho } from './components/sections/ForWho';
import { ContactCTA } from './components/sections/ContactCTA';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Problem />
        <CostOfInaction />
        <Solution />
        <HowItWorks />

        <ForWho />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
