import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users as UsersIcon } from "lucide-react";

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      setProfiles(data || []);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Users</h1>

      {profiles.length === 0 ? (
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <UsersIcon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No users yet.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{p.full_name || "—"}</td>
                    <td className="p-4 text-muted-foreground">{p.email || "—"}</td>
                    <td className="p-4 text-muted-foreground">{p.phone || "—"}</td>
                    <td className="p-4 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
