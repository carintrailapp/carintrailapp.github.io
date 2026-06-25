import { LiquidGlassNav } from './components/LiquidGlassNav';
import { ScrollSequenceHero } from './components/ScrollSequenceHero';
import { StickyCompassFeatures } from './components/StickyCompassFeatures';
import { BentoFeatures } from './components/BentoFeatures';
import { SystemIntegration } from './components/SystemIntegration';
import { SocialCommunity } from './components/SocialCommunity';
import { SafetySection } from './components/SafetySection';
import { CtaFooter } from './components/CtaFooter';

function App() {
  return (
    <div className="min-h-screen w-full relative selection:bg-cairn-forest/20 selection:text-cairn-forest">
      <LiquidGlassNav />
      <main>
        <ScrollSequenceHero />
        <StickyCompassFeatures />
        <BentoFeatures />
        <SystemIntegration />
        <SocialCommunity />
        <SafetySection />
      </main>
      <CtaFooter />
    </div>
  );
}

export default App;
