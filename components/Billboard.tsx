import { useBillBoard } from "@/hooks/useBillBoard";
import { FC, useCallback } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

export const Billboard: FC = () => {
  const { data } = useBillBoard();

  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [data?.id, openModal]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full w-2/4 lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-4/5 lg:w-2/4 drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex items-center mt-3 md:mt-4 gap-4">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="flex items-center hover:bg-opacity-20 transition bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
