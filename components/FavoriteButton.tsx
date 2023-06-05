import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = user?.favouriteIds || [];

    return list.includes(movieId);
  }, [user, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favouriteIds;

    mutate({
      ...user,
      favouriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, user, mutate, mutateFavorites]);

  const Icon = ({ className }: { className: string }) =>
    isFavorite ? (
      <AiOutlineCheck className={className} />
    ) : (
      <AiOutlinePlus className={className} />
    );

  return (
    <div
      role="button"
      onClick={toggleFavorites}
      className="group-item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white w-3 h-3 lg:w-5 lg:h-5" />
    </div>
  );
};

export default FavoriteButton;
