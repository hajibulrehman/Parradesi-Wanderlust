import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, MessageSquare, Users, Eye } from "lucide-react";

interface Stats {
  totalPackages: number;
  publishedPackages: number;
  totalInquiries: number;
  newInquiries: number;
  totalUsers: number;
  totalViews: number;
}

const StatCard = ({ icon: Icon, label, value, sub }: { icon: any; label: string; value: number; sub?: string }) => (
  <div className="bg-card rounded-xl p-6 shadow-card">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <p className="text-3xl font-display font-bold">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalPackages: 0,
    publishedPackages: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalUsers: 0,
    totalViews: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [packages, inquiries, profiles, views] = await Promise.all([
        supabase.from("packages").select("id, published"),
        supabase.from("inquiries").select("id, status, name, email, created_at, package_id").order("created_at", { ascending: false }).limit(5),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("package_views").select("id", { count: "exact", head: true }),
      ]);

      const pkgs = packages.data || [];
      const inqs = inquiries.data || [];

      setStats({
        totalPackages: pkgs.length,
        publishedPackages: pkgs.filter((p) => p.published).length,
        totalInquiries: inqs.length,
        newInquiries: inqs.filter((i) => i.status === "new").length,
        totalUsers: profiles.count || 0,
        totalViews: views.count || 0,
      });
      setRecentInquiries(inqs);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Packages" value={stats.totalPackages} sub={`${stats.publishedPackages} published`} />
        <StatCard icon={MessageSquare} label="Inquiries" value={stats.totalInquiries} sub={`${stats.newInquiries} new`} />
        <StatCard icon={Users} label="Users" value={stats.totalUsers} />
        <StatCard icon={Eye} label="Page Views" value={stats.totalViews} />
      </div>

      <div className="bg-card rounded-xl shadow-card p-6">
        <h2 className="text-lg font-display font-bold mb-4">Recent Inquiries</h2>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{inq.name}</p>
                  <p className="text-xs text-muted-foreground">{inq.email}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    inq.status === "new" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {inq.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
