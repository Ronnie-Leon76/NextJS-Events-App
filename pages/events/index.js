import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import { useRouter } from "next/router";
import EventSearch from "../../components/events/event-search";
import Head from "next/head";
const EventsPage = (props) => {
  const { events } = props;
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="All NextJS events"
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  //console.log(allEvents);
  return {
    props: {
      events: Object.values(allEvents),
    },
  };
}
export default EventsPage;
