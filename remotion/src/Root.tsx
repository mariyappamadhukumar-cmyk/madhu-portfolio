import { Composition } from "remotion";
import { BgVideo } from "./BgVideo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="main"
      component={BgVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
