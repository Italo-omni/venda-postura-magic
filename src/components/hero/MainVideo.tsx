
interface MainVideoProps {
  videoId: string;
  title: string;
}

export const MainVideo = ({ videoId, title }: MainVideoProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl">
      <div className="aspect-video">
        <iframe 
          className="absolute top-0 left-0 w-full h-full" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&controls=0`}
          allow="autoplay; encrypted-media"
          title={title}
        />
      </div>
    </div>
  );
};
