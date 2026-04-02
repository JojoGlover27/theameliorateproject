import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl text-foreground mb-2">Anonymity, Privacy, and Security Policy</h1>
        <p className="text-muted-foreground mb-10 font-semibold">Effective Date: February 22, 2026</p>

        <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
          <p>
            The Ameliorate Project is committed to protecting the anonymity, privacy, and security of every person who visits our website or uses the Synapse platform. We exist to serve individuals who face stigma, discrimination, or fear of exposure, and we design every aspect of our work to eliminate any risk of identification or harm.
          </p>

          <div>
            <h2 className="text-2xl text-foreground mb-3">Anonymity</h2>
            <p>
              We do not require or collect any personal information. You can browse the website, read resources, and use Synapse without providing your name, email address, phone number, location, or any other identifier. Synapse operates solely through generated unique IDs. No accounts, logins, or user profiles are created. All interactions remain completely anonymous from start to finish.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-foreground mb-3">Privacy</h2>
            <p>
              We collect zero personal data by default. The website does not use cookies, trackers, analytics tools, or scripts that identify or profile visitors. Any optional contact form submissions are encrypted and deleted immediately after we respond. We do not store, share, sell, or use any information for marketing, advertising, or third-party purposes. We have no identifiable data to disclose even if legally compelled.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-foreground mb-3">Security</h2>
            <p>
              All traffic to the website uses HTTPS with up-to-date TLS encryption. Synapse employs end-to-end encryption for every communication and transaction. Our servers are protected by firewalls, regular security scans, and DDoS prevention. We do not store user data on servers or devices. We continuously monitor for vulnerabilities and apply updates to maintain the highest possible security standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-foreground mb-3">Your Rights</h2>
            <p>
              You have the right to contact us anonymously at any time via the secure form or phone number listed on the site. We comply with Ghana's Data Protection Act, 2012 (Act 843) and follow international best practices for privacy and security. This policy is reviewed regularly and may be updated; the current version is always posted here.
            </p>
          </div>

          <p>
            If you have questions or concerns about this policy, please reach out anonymously using the contact form on the website.
          </p>

          <p className="font-semibold text-foreground">
            We are deeply committed to ensuring that every interaction with The Ameliorate Project is safe, private, and free from judgment.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
