import { forwardRef } from 'react';
import Hero from './Hero';
import Countdown from './Countdown';
import Details from './Details';
import Story from './Story';
import FunFacts from './FunFacts';
import Gallery from './Gallery';
import RsvpForm from './RsvpForm';
import Footer from './Footer';

const Landing = forwardRef(function Landing(props, ref) {
  return (
    <main ref={ref}>
      <Hero />
      <Countdown />
      <Details />
      <Story />
      <FunFacts />
      <Gallery />
      <RsvpForm />
      <Footer />
    </main>
  );
});

export default Landing;
