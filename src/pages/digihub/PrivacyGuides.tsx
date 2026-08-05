import GuideList from "@/components/digihub/GuideList";
import { privacyGuides } from "@/data/digihub";

const PrivacyGuides = () => (
  <GuideList
    title="Privacy Guides"
    description="Step-by-step guides to reduce what others can see, trace and collect about you."
    items={privacyGuides}
  />
);

export default PrivacyGuides;
