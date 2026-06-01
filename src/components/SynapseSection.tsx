import { Smartphone, ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import synapseLogo from "@/assets/synapse-logo.png";

const SynapseSection = () => (
  <section id="synapse" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-8">
          <img src={synapseLogo} alt="Synapse" className="h-14 w-14 rounded-xl shadow-md" />
          <h2 className="text-3xl md:text-4xl text-foreground">About Synapse</h2>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            Synapse is our secure, privacy-first digital platform designed to provide safe access to HIV prevention, testing, and care services for hidden and marginalised LGBTQI+ communities in Ghana.
          </p>
          <p>
            On Synapse, you engage using a generated unique ID. No face-to-face interaction is required, and all communications are end-to-end encrypted. The Ameliorate team and Synapse operations never see your identity.
          </p>
          <p>
            For prescribed medications such as ART, PrEP, and PEP, Ghana Health Service regulations require a clinician to hold a name and a contact for medication accountability. That information is shared only with your treating clinician, kept strictly confidential, and is never passed to the Ameliorate team, Synapse operations, or any external party. Self-testing, browsing, ordering supplies, and counselling remain anonymous end to end.
          </p>
          <p>
            The platform offers telemedicine consultations with affirming clinicians, self-testing kits for HIV and Hepatitis (delivered discreetly), PrEP/PEP initiation and follow-up, ART adherence reminders and refills, and nutritional support to accelerate viral suppression and sustain U=U (Undetectable = Untransmittable).
          </p>
          <p>
            By removing stigma, discrimination, and exposure risks, Synapse empowers you to manage your health privately and confidently, right where you are.
          </p>
        </div>
      </AnimatedSection>
      <motion.div
        className="grid sm:grid-cols-2 gap-4 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex items-start gap-3 bg-secondary p-5 rounded-xl">
          <Lock className="text-primary mt-1 shrink-0" size={20} />
          <p className="text-secondary-foreground text-sm">End-to-end encrypted communications with no personal data stored</p>
        </motion.div>
        <motion.div variants={fadeUp} className="flex items-start gap-3 bg-secondary p-5 rounded-xl">
          <ShieldCheck className="text-primary mt-1 shrink-0" size={20} />
          <p className="text-secondary-foreground text-sm">Anonymous unique IDs, no names, emails, or phone numbers required</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default SynapseSection;
