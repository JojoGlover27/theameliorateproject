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
            Synapse is our secure, privacy-first digital platform designed to provide safe, anonymous access to HIV prevention, testing, and care services for hidden and marginalised LGBTQI+ communities in Ghana.
          </p>
          <p>
            On Synapse, you engage using a Generated Synapse ID. No face-to-face interaction is required, and all communications are end-to-end encrypted. Your Generated Synapse ID is all our team ever sees.
          </p>
          <p>
            For prescribed medications such as ART, PrEP, and PEP, you will first speak with a licensed clinician. During that call, the clinician may ask for a name and a contact number, this helps them support your care and maintain medication to user accountability as required by national health programs. These details are collected only by the clinician, directly during your call. They are not saved within Synapse and are never accessible to the Ameliorate team. Synapse itself remains anonymous.
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
