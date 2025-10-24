import Container from "./Container";

interface PageHeroProps {
  title: string;
  subtitle: string;
  electionInfo?: {
    primary?: string;
    general?: string;
    termLength?: number;
    district?: string;
    [key: string]: string | number | undefined;
  };
}

function PageHero(props: PageHeroProps) {
  const title = props.title;
  const subtitle = props.subtitle;
  const electionInfo = props.electionInfo;

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
        <div className="max-w-4xl flex flex-col md:flex-row">
          <div className="grow-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-primary-50 leading-relaxed mb-6">
              {subtitle}
            </p>
          </div>

          {/* Election Information */}
          {electionInfo && (
            <div className="flex flex-col flex-wrap gap-2 mt-6 text-xs text-primary-50">
              {Object.entries(electionInfo).map(([key, value]) => {
                if (!value) return null;

                // Format the key to be human-readable
                const label = key
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-semibold text-white">{label}:</span>
                    <span>
                      {value}
                      {key === "termLength" ? " years" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default PageHero;
