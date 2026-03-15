import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PackageData {
  id: string;
  slug: string;
  name: string;
  destination: string;
  description: string | null;
  price: number;
  duration: string | null;
  type: string;
  highlight: string | null;
  image_url: string | null;
  next_departure: string | null;
  published: boolean;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
}

export interface ItineraryDay {
  day_number: number;
  title: string;
  activities: string | null;
  stay: string | null;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const usePackages = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("packages")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPackages((data as PackageData[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { packages, loading };
};

export const usePackageDetail = (slug: string | undefined) => {
  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetch = async () => {
      const { data: pkgData } = await supabase
        .from("packages")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (pkgData) {
        setPkg(pkgData as PackageData);

        const [itinRes, faqRes] = await Promise.all([
          supabase.from("itineraries").select("*").eq("package_id", pkgData.id).order("day_number"),
          supabase.from("package_faqs").select("*").eq("package_id", pkgData.id).order("sort_order"),
        ]);

        setItinerary((itinRes.data as ItineraryDay[]) || []);
        setFaqs((faqRes.data as FAQ[]) || []);

        // Track view
        supabase.from("package_views").insert({ package_id: pkgData.id, session_id: getSessionId() });
      }

      setLoading(false);
    };

    fetch();
  }, [slug]);

  return { pkg, itinerary, faqs, loading };
};

function getSessionId() {
  let sid = sessionStorage.getItem("_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("_sid", sid);
  }
  return sid;
}
