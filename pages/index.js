import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/Input/newsletter-registration";
const HomePage = (props) => {
  const { events } = props;
  //const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: Object.values(featuredEvents),
    },
    revalidate: 1800,
  };
}
export default HomePage;
