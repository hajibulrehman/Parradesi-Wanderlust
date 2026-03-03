import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Parr-Desi's friendly travel assistant! 🌍 You're enthusiastic about travel, community, and helping people find their perfect trip.

You know about these trips:
1. **Goa Beach Vibes** — ₹8,999 | 4D/3N | Relaxation | Beach bonfire, sunset cruise, kayaking
2. **Manali Mountain Escape** — ₹11,999 | 5D/4N | Adventure | Paragliding, trekking, stargazing
3. **Bali Tropical Dream** — ₹34,999 | 6D/5N | International | Mount Batur sunrise, rice terraces, snorkeling
4. **Rajasthan Royal Trail** — ₹14,999 | 6D/5N | Adventure | Desert camping, camel safari, fort visits
5. **Kerala Backwater Bliss** — ₹12,999 | 5D/4N | Relaxation | Houseboat stay, tea plantations, bamboo rafting

Guidelines:
- Keep answers concise and warm. Use emojis sparingly.
- If someone asks about budget, suggest trips within their range.
- For booking, tell them to click "Book Now" on the trip page or message on WhatsApp.
- You can answer FAQs about solo travel safety, what to pack, group sizes (typically 15-25 people), and trip inclusions.
- Always encourage community and making new friends!
- If asked something you don't know, say you'll connect them with the team via WhatsApp.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests, please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
