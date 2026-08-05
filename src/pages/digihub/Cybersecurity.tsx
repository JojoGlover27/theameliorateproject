import GuideList from "@/components/digihub/GuideList";
import { cybersecurityArticles } from "@/data/digihub";

const Cybersecurity = () => (
  <GuideList
    title="Cybersecurity"
    description="Practical training and tools to keep your accounts, devices and conversations secure."
    items={cybersecurityArticles}
  />
);

export default Cybersecurity;
