import { useRouter } from "next/router";
import { FC } from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtoProps {
  movieId: string;
}

const PlayButton: FC<PlayButtoProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white rounded py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex justify-center items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill size={20} className="mr-1" />
      Play
    </button>
  );
};

export default PlayButton;