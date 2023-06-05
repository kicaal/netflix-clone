import { Billboard } from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import { MovieList } from "@/components/MovieList";
import NavBar from "@/components/NavBar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModal();

  return (
    <main>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <NavBar />
      <Billboard />
      <div className="pb-49">
        <MovieList data={movies} title="Trending Now" />
        <MovieList data={favourites} title="My List" />
      </div>
    </main>
  );
}
