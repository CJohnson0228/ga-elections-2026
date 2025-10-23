import Container from "./Container";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

function PageHero(props: PageHeroProps) {
  const title = props.title;
  const subtitle = props.subtitle;
  return (
    <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 text-white py-16 overflow-hidden">
      {/* Patriotic stripes - matching navbar */}
      <div className="absolute inset-y-0 left-0 flex pointer-events-none">
        {/* Red stripe */}
        <div className="h-full w-3 sm:w-4 bg-red-600/70"></div>
        {/* White stripe */}
        <div className="h-full w-3 sm:w-4 bg-white/90"></div>
      </div>

      <Container className="relative pl-10 sm:pl-0">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-primary-50 leading-relaxed">{subtitle}</p>
        </div>
      </Container>
    </div>
  );
}

export default PageHero;
