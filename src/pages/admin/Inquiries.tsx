import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MessageSquare, Check, Archive } from "lucide-react";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [packages, setPackages] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    const [inqRes, pkgRes] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("packages").select("id, name"),
    ]);
    setInquiries(inqRes.data || []);
    const map: Record<string, string> = {};
    (pkgRes.data || []).forEach((p: any) => (map[p.id] = p.name));
    setPackages(map);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) toast.error("Failed to update");
    else {
      toast.success(`Marked as ${status}`);
      fetchData();
    }
  };

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Inquiries</h1>

      <div className="flex gap-2 mb-6">
        {["all", "new", "responded", "archived"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No inquiries found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => (
            <div key={inq.id} className="bg-card rounded-xl shadow-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display font-bold">{inq.name}</p>
                  <p className="text-sm text-muted-foreground">{inq.email}{inq.phone ? ` • ${inq.phone}` : ""}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    inq.status === "new" ? "bg-primary/10 text-primary" :
                    inq.status === "responded" ? "bg-accent text-accent-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {inq.status}
                  </span>
                </div>
              </div>
              {inq.message && <p className="text-sm text-muted-foreground mb-3">{inq.message}</p>}
              {inq.package_id && packages[inq.package_id] && (
                <p className="text-xs text-primary mb-3">📦 {packages[inq.package_id]}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {new Date(inq.created_at).toLocaleString()}
                </p>
                <div className="flex gap-1">
                  {inq.status !== "responded" && (
                    <button
                      onClick={() => updateStatus(inq.id, "responded")}
                      className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors"
                      title="Mark as responded"
                    >
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </button>
                  )}
                  {inq.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(inq.id, "archived")}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      title="Archive"
                    >
                      <Archive className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
