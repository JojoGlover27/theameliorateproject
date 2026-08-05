import GuideList from "@/components/digihub/GuideList";
import { digitalRightsArticles } from "@/data/digihub";

const DigitalRights = () => (
  <GuideList
    title="Digital Rights"
    description="Understand your rights online and offline, how they are protected in Ghana, and what to do when they are violated."
    items={digitalRightsArticles}
  />
);

export default DigitalRights;
