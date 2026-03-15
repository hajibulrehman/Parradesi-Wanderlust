import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface ItineraryDay {
  day_number: number;
  title: string;
  activities: string;
  stay: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const PackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== "new";
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    destination: "",
    description: "",
    price: "",
    duration: "",
    type: "Adventure",
    highlight: "",
    image_url: "",
    next_departure: "",
    published: false,
    inclusions: [""],
    exclusions: [""],
    highlights: [""],
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day_number: 1, title: "", activities: "", stay: "" },
  ]);

  const [faqs, setFaqs] = useState<FAQ[]>([{ question: "", answer: "" }]);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      const fetchPackage = async () => {
        const [pkgRes, itinRes, faqRes] = await Promise.all([
          supabase.from("packages").select("*").eq("id", id).single(),
          supabase.from("itineraries").select("*").eq("package_id", id).order("day_number"),
          supabase.from("package_faqs").select("*").eq("package_id", id).order("sort_order"),
        ]);

        if (pkgRes.data) {
          const p = pkgRes.data;
          setForm({
            name: p.name,
            slug: p.slug,
            destination: p.destination,
            description: p.description || "",
            price: String(p.price),
            duration: p.duration || "",
            type: p.type,
            highlight: p.highlight || "",
            image_url: p.image_url || "",
            next_departure: p.next_departure || "",
            published: p.published,
            inclusions: (p.inclusions as string[])?.length ? (p.inclusions as string[]) : [""],
            exclusions: (p.exclusions as string[])?.length ? (p.exclusions as string[]) : [""],
            highlights: (p.highlights as string[])?.length ? (p.highlights as string[]) : [""],
          });
        }

        if (itinRes.data?.length) {
          setItinerary(itinRes.data.map((d: any) => ({
            day_number: d.day_number,
            title: d.title,
            activities: d.activities || "",
            stay: d.stay || "",
          })));
        }

        if (faqRes.data?.length) {
          setFaqs(faqRes.data.map((f: any) => ({ question: f.question, answer: f.answer })));
        }

        setLoading(false);
      };
      fetchPackage();
    }
  }, [id, isEditing]);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!form.name || !form.destination || !form.price) {
      toast.error("Name, destination, and price are required");
      return;
    }

    setSaving(true);
    const slug = form.slug || generateSlug(form.name);

    const packageData = {
      name: form.name,
      slug,
      destination: form.destination,
      description: form.description,
      price: parseFloat(form.price),
      duration: form.duration,
      type: form.type,
      highlight: form.highlight,
      image_url: form.image_url,
      next_departure: form.next_departure || null,
      published: form.published,
      inclusions: form.inclusions.filter(Boolean),
      exclusions: form.exclusions.filter(Boolean),
      highlights: form.highlights.filter(Boolean),
    };

    let packageId = id;

    if (isEditing) {
      const { error } = await supabase.from("packages").update(packageData).eq("id", id);
      if (error) {
        toast.error("Failed to update: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase.from("packages").insert(packageData).select("id").single();
      if (error) {
        toast.error("Failed to create: " + error.message);
        setSaving(false);
        return;
      }
      packageId = data.id;
    }

    // Save itinerary
    await supabase.from("itineraries").delete().eq("package_id", packageId!);
    const validItinerary = itinerary.filter((d) => d.title);
    if (validItinerary.length) {
      await supabase.from("itineraries").insert(
        validItinerary.map((d) => ({ ...d, package_id: packageId }))
      );
    }

    // Save FAQs
    await supabase.from("package_faqs").delete().eq("package_id", packageId!);
    const validFaqs = faqs.filter((f) => f.question && f.answer);
    if (validFaqs.length) {
      await supabase.from("package_faqs").insert(
        validFaqs.map((f, i) => ({ ...f, package_id: packageId, sort_order: i }))
      );
    }

    toast.success(isEditing ? "Package updated!" : "Package created!");
    setSaving(false);
    navigate("/admin/packages");
  };

  const updateListItem = (
    list: string[],
    setList: (val: string[]) => void,
    index: number,
    value: string
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate("/admin/packages")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Packages
      </button>

      <h1 className="text-2xl font-display font-bold mb-6">
        {isEditing ? "Edit Package" : "New Package"}
      </h1>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card rounded-xl shadow-card p-6 space-y-4">
          <h2 className="font-display font-bold">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <Label>Destination *</Label>
              <Input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </div>
            <div>
              <Label>Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option>Adventure</option>
                <option>Relaxation</option>
                <option>Backpacking</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <Label>Price (₹) *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <Label>Duration</Label>
              <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 5 Days / 4 Nights" />
            </div>
            <div>
              <Label>Highlight</Label>
              <Input value={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.value })} />
            </div>
            <div>
              <Label>Next Departure</Label>
              <Input type="date" value={form.next_departure} onChange={(e) => setForm({ ...form, next_departure: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="published" className="mb-0">Published</Label>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-card rounded-xl shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold">Itinerary</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setItinerary([...itinerary, { day_number: itinerary.length + 1, title: "", activities: "", stay: "" }])}
            >
              <Plus className="w-3 h-3" /> Add Day
            </Button>
          </div>
          {itinerary.map((day, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">Day {day.day_number}</span>
                {itinerary.length > 1 && (
                  <button onClick={() => setItinerary(itinerary.filter((_, j) => j !== i).map((d, j) => ({ ...d, day_number: j + 1 })))}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                )}
              </div>
              <Input
                placeholder="Day title"
                value={day.title}
                onChange={(e) => {
                  const u = [...itinerary];
                  u[i] = { ...u[i], title: e.target.value };
                  setItinerary(u);
                }}
              />
              <Input
                placeholder="Activities"
                value={day.activities}
                onChange={(e) => {
                  const u = [...itinerary];
                  u[i] = { ...u[i], activities: e.target.value };
                  setItinerary(u);
                }}
              />
              <Input
                placeholder="Stay"
                value={day.stay}
                onChange={(e) => {
                  const u = [...itinerary];
                  u[i] = { ...u[i], stay: e.target.value };
                  setItinerary(u);
                }}
              />
            </div>
          ))}
        </div>

        {/* Inclusions/Exclusions/Highlights */}
        {(["inclusions", "exclusions", "highlights"] as const).map((field) => (
          <div key={field} className="bg-card rounded-xl shadow-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold capitalize">{field}</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setForm({ ...form, [field]: [...form[field], ""] })}
              >
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>
            {form[field].map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...form[field]];
                    updated[i] = e.target.value;
                    setForm({ ...form, [field]: updated });
                  }}
                  placeholder={`Add ${field.slice(0, -1)}`}
                />
                {form[field].length > 1 && (
                  <button onClick={() => setForm({ ...form, [field]: form[field].filter((_, j) => j !== i) })}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* FAQs */}
        <div className="bg-card rounded-xl shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold">FAQs</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}>
              <Plus className="w-3 h-3" /> Add FAQ
            </Button>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">FAQ {i + 1}</span>
                {faqs.length > 1 && (
                  <button onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                )}
              </div>
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) => {
                  const u = [...faqs];
                  u[i] = { ...u[i], question: e.target.value };
                  setFaqs(u);
                }}
              />
              <Textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => {
                  const u = [...faqs];
                  u[i] = { ...u[i], answer: e.target.value };
                  setFaqs(u);
                }}
                rows={2}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-sunset text-primary-foreground rounded-full hover:opacity-90"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Package"}
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/packages")} className="rounded-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageForm;
