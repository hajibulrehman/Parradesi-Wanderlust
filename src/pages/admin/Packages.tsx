import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPackages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPackages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const togglePublish = async (id: string, published: boolean) => {
    const { error } = await supabase
      .from("packages")
      .update({ published: !published })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update");
    } else {
      toast.success(published ? "Unpublished" : "Published");
      fetchPackages();
    }
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Package deleted");
      fetchPackages();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Packages</h1>
        <Link to="/admin/packages/new">
          <Button className="bg-gradient-sunset text-primary-foreground rounded-full hover:opacity-90">
            <Plus className="w-4 h-4" /> Add Package
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : packages.length === 0 ? (
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <p className="text-muted-foreground mb-4">No packages yet. Create your first one!</p>
          <Link to="/admin/packages/new">
            <Button className="bg-gradient-sunset text-primary-foreground rounded-full">
              <Plus className="w-4 h-4" /> Create Package
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-card rounded-xl shadow-card p-4 flex items-center gap-4">
              {pkg.image_url && (
                <img src={pkg.image_url} alt={pkg.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-sm truncate">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground">{pkg.destination} • {pkg.duration} • ₹{Number(pkg.price).toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  pkg.published ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {pkg.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublish(pkg.id, pkg.published)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title={pkg.published ? "Unpublish" : "Publish"}
                >
                  {pkg.published ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-primary" />}
                </button>
                <Link to={`/admin/packages/${pkg.id}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </Link>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
