import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Events from './components/Events';
import Travel from './components/Travel';
import WeddingParty from './components/WeddingParty';
import ThingsToDo from './components/ThingsToDo';
import Registry from './components/Registry';
import Faq from './components/Faq';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';
import wedding from './data/wedding';

export default function App() {
  useEffect(() => {
    document.title = `${wedding.partnerA} & ${wedding.partnerB} — Wedding · June 5, 2027`;
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Events />
        <Travel />
        <WeddingParty />
        <ThingsToDo />
        <Registry />
        <Faq />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
