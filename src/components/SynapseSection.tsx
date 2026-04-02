import { Smartphone, ShieldCheck, Lock } from "lucide-react";

const SynapseSection = () => (
  <section id="synapse" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Smartphone className="text-primary" size={28} />
        <h2 className="text-3xl md:text-4xl text-foreground">About Synapse</h2>
      </div>
      <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
        <p>
          Synapse is our secure, fully anonymous digital platform designed to provide safe access to HIV prevention, testing, and care services for hidden and marginalized LGBTQI+ communities in Ghana.
        </p>
        <p>
          With Synapse, users can engage entirely through generated unique IDs — no personal data is collected, no face-to-face interaction is required, and all communications are end-to-end encrypted.
        </p>
        <p>
          The platform offers telemedicine consultations with affirming clinicians, self-testing kits for HIV and Hepatitis (delivered discreetly), PrEP/PEP initiation and follow-up, ART adherence reminders and refills, and nutritional support to accelerate viral suppression and sustain U=U (Undetectable = Untransmittable).
        </p>
        <p>
          By eliminating stigma, discrimination, and exposure risks, Synapse empowers users to manage their health privately and independently, right where they are.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <div className="flex items-start gap-3 bg-secondary p-5 rounded-xl">
          <Lock className="text-primary mt-1 shrink-0" size={20} />
          <p className="text-secondary-foreground text-sm">End-to-end encrypted communications with no personal data stored</p>
        </div>
        <div className="flex items-start gap-3 bg-secondary p-5 rounded-xl">
          <ShieldCheck className="text-primary mt-1 shrink-0" size={20} />
          <p className="text-secondary-foreground text-sm">Anonymous unique IDs — no names, emails, or phone numbers required</p>
        </div>
      </div>
    </div>
  </section>
);

export default SynapseSection;
