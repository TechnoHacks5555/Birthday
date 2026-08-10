import { useState } from "react";
import Navbar from "../../components/netflix/Navbar";
import HeroBanner from "../../components/netflix/HeroBanner";
import MovieRow from "../../components/netflix/MovieRow";
import MovieDetailModal from "../../components/netflix/MovieDetailModal";
import MediaViewerModal from "../../components/netflix/MediaViewerModal";

import {
  continuewatching,
  prajawithoutraja,
  sonaPov,
  sakshiPov,
  kasePov,
  rutikaPov,
  gacchePov,
  neelamPov,
  zeelPov,
  dhyamaPov,
  parthPov,
  shailiFriends,
  shailiSchoolFrnds,
  shailibanner,
  birthdayWishes,
} from "../../data/moviesMapper";
import Footer from "../../components/netflix/Footer";

const Home = () => {
  const [infoMovie, setInfoMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);

  return (
    <div className="min-h-screen bg-[#141414] pb-20 text-white">
      <Navbar />

      <HeroBanner onPlay={setPlayingMovie} />
      <MovieRow
        title="Continue Watching"
        movies={continuewatching}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Birthday Messages, Just For Her"
        movies={birthdayWishes}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Praja Without Raja"
        movies={prajawithoutraja}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Kase's Unfiltered Memories"
        movies={kasePov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Parth's Version of US"
        movies={parthPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Rutika Remembers"
        movies={rutikaPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Sona's Memory Lane"
        movies={sonaPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Zeel's Collection of Chaos"
        movies={zeelPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Dhyama's Growing Up With Shaili"
        movies={dhyamaPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Gacche's Shaili Files"
        movies={gacchePov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Neelam's Side of the Memories"
        movies={neelamPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Sakshi's Shaili Stories"
        movies={sakshiPov}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="The People She Calls Friends"
        movies={shailiFriends}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieRow
        title="Back When It All Started"
        movies={shailiSchoolFrnds}
        onInfo={setInfoMovie}
        onPlay={setPlayingMovie}
      />

      <MovieDetailModal
        movie={infoMovie}
        onClose={() => setInfoMovie(null)}
        onPlay={(m) => {
          setInfoMovie(null);
          setPlayingMovie(m);
        }}
      />

      <MediaViewerModal
        movie={playingMovie}
        onClose={() => setPlayingMovie(null)}
      />

      <Footer />
    </div>
  );
};

export default Home;
