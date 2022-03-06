//import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../helpers/api-util";
import { getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/UI/error-alert";
import Head from "next/head";
import Comments from "../../components/Input/comments";
export default function EventPage(props) {
  //const router = useRouter();
  //const eventId = router.query.eventId;
  //const event = getEventById(eventId);
  //console.log(props);
  const { eventById } = props;

  if (!eventById) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta name={eventById.title} content={eventById.description} />
      </Head>
      <EventSummary title={eventById.title} />
      <EventLogistics
        date={eventById.date}
        address={eventById.location}
        image={eventById.image}
        imageAlt={eventById.title}
      />
      <EventContent>
        <p>{eventById.description}</p>
      </EventContent>
      <Comments eventId={eventById.id} />
    </Fragment>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      eventById: event,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  //console.log(paths);

  return {
    paths: paths,
    fallback: true,
  };
}
