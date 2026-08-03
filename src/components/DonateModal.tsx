import { Banknote, Smartphone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { funds, payment, givingNote } from "@/data/giving";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export default function DonateModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Donate to The Ameliorate Project</DialogTitle>
          <DialogDescription>
            Help build privacy-first innovations that remove barriers. Choose where you would like your contribution to
            create impact.
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {funds.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <p className="font-semibold text-card-foreground mb-1">
                <span className="mr-1.5">{f.emoji}</span>
                {f.name}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ways to give</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <p className="font-semibold text-sm">Mobile Money</p>
              </div>
              <div className="space-y-1 text-sm">
                {payment.mobileMoney.map((m) => (
                  <p key={m.label}>
                    <strong>{m.label}:</strong> {m.value}
                  </p>
                ))}
                <p className="text-muted-foreground">Reference: {payment.reference}</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="w-4 h-4 text-primary" />
                <p className="font-semibold text-sm">Bank Transfer</p>
              </div>
              <div className="space-y-1 text-sm">
                <p><strong>Account Name:</strong> {payment.bank.accountName}</p>
                <p><strong>Bank:</strong> {payment.bank.bank}</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${payment.bank.email}`} className="text-primary hover:underline">
                    {payment.bank.email}
                  </a>
                </p>
                <p className="text-muted-foreground">Reference: {payment.reference}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mt-3">{givingNote}</p>
      </DialogContent>
    </Dialog>
  );
}
