import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, TrendingUp, Eye } from "lucide-react";

interface PackageStat {
  id: string;
  name: string;
  views: number;
  inquiries: number;
}

const AdminAnalytics = () => {
  const [packageStats, setPackageStats] = useState<PackageStat[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const [pkgRes, viewsRes, inqRes] = await Promise.all([
        supabase.from("packages").select("id, name"),
        supabase.from("package_views").select("package_id"),
        supabase.from("inquiries").select("package_id"),
      ]);

      const packages = pkgRes.data || [];
      const views = viewsRes.data || [];
      const inquiries = inqRes.data || [];

      const stats: PackageStat[] = packages.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        views: views.filter((v: any) => v.package_id === pkg.id).length,
        inquiries: inquiries.filter((i: any) => i.package_id === pkg.id).length,
      }));

      stats.sort((a, b) => b.views - a.views);
      setPackageStats(stats);
    };

    fetchAnalytics();
  }, []);

  const maxViews = Math.max(...packageStats.map((s) => s.views), 1);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Analytics</h1>

      {packageStats.length === 0 ? (
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No data yet. Add packages and get visitors!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Most viewed */}
          <div className="bg-card rounded-xl shadow-card p-6">
            <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Package Performance
            </h2>
            <div className="space-y-4">
              {packageStats.map((stat) => (
                <div key={stat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">{stat.name}</span>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{stat.views}</span>
                      <span>{stat.inquiries} inquiries</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-sunset rounded-full transition-all"
                      style={{ width: `${(stat.views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
