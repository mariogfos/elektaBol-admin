import EventList from "@/components/EventList/EventList";
import HomePage from "@/components/Index/Index";
import useScreenSize from "@/mk/hooks/useScreenSize";


const Index = () => {
  const { isMobile } = useScreenSize();
  return isMobile ? <EventList /> : <HomePage />;
};

export default Index;
