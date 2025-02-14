import { Dispatch, SetStateAction } from "react";
import { Button } from "react95";

type Fields = {
  setMode: Dispatch<SetStateAction<number>>;
};

const LandingPage = ({ setMode }: Fields) => {
  return (
    <div className="flex flex-col items-center justify-evenly h-full w-full">
      <div className="text-3xl">G R O O V I V E R S E</div>
      <Button primary onClick={() => setMode(1)}>
        GENERATE
      </Button>
    </div>
  );
};

export default LandingPage;
