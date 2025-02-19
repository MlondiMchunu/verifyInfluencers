const express = require("express");
const cors = require("cors")
const fetch = require("node-fetch")
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors({
  origin:["https://verify-influencers-1.vercel.app/"],
  methods:["POST","GET"],
  credentials:true
}));

const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

app.post("/api/research", async (req, res) => {
  try {
    const { influencerName, timeRange, claimsToAnalyze, productsToFind, isToggledRA, isToggledVSJ, selectedJournals } = req.body;

    const prompt = `
### **Task Overview:**
Analyze recent health-related content from "${influencerName}" within the "${timeRange}" period. This includes:
- Extracting and analyzing health-related tweets and podcast transcripts.
- Identifying and structuring distinct health claims.
- Removing duplicate claims (e.g., the same fact stated in multiple posts).
- Categorizing claims into "Nutrition", "Fitness", "Medicine", or "Mental Health etc".
- Verifying claims using ${isToggledVSJ ? `scientific journals: ${selectedJournals.join(", ")}` : "reliable sources"}.

---

### **Expected JSON Response Format:**
\`\`\`json
{
  "influencer": {
    "name": "${influencerName}",
    "category": (Nutrition, Fitness, Medicine, Mental Health etc),
    "followers": (integer),
    "trustScore": (number (0-100)),
    "trend": "Upward | Stable | Declining"
  },
  "claims": [
    {
      "text": "Health claim text here",
      "category": (Nutrition, Fitness, Medicine, Mental Health etc),
      "verified": true,
      "source": (PubMed, Nature, Science, etc),
      "confidenceScore": (number)
    }
  ],
  "products": [
    {
      "name": (Product Name/STRING),
      "type": (Supplement, Equipment, Service, ETC),
      "price": (amount)
    }
  ],
  ${isToggledRA ? `"estimatedRevenue": (number),` : ""}
  "analysisSummary": "A brief summary of the influencer's work history i.e institutions worked for, impact and credibility."
}
\`\`\`

---

### **Steps for AI Processing:**
1. **Data Extraction:** Fetch tweets and podcast transcripts from "${influencerName}" over the last "${timeRange}".
2. **Claim Identification:** Spot all health-related statements.
3. **Duplicate Removal:** Eliminate repeated claims (same claim across multiple sources).
4. **Claim Categorization:** Assign each claim a category: "Nutrition", "Fitness", "Medicine", or "Mental Health".
5. **Claim Verification:** Cross-check claims against ${isToggledVSJ ? `selected journals: ${selectedJournals.join(", ")}` : "trusted health databases"}.
6. **Final Output:** Provide structured JSON data following the expected format.

---

### **Additional Instructions:**
- The **trustScore** (0-100) should be calculated based on claim accuracy and follower engagement.
- The **trend** should reflect whether the influencer\'s credibility is increasing or declining.
- Ensure **consistent formatting** in the JSON output.`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    });

    // Log the response for debugging
    if (!response.ok) {
      const errorDetails = await response.text(); // Read the error message
      console.error("OpenAI API Error:", errorDetails);
      throw new Error(`AI API request failed: ${errorDetails}`);
    }

    const data = await response.json();
    const JSONdata = data.choices[0].message.content
    console.log("Response from AI API : ", JSONdata)

    const JSON_to_String = JSONdata.replace(/```json|_|```/g, '').trim()
    console.log("JSON converted to String: ", JSON_to_String)

    const jsonObject = JSON.parse(JSON_to_String);
    console.log("JSON String parsed to Javascript Object : ", jsonObject)

    console.log("Influencer categories: ", jsonObject.influencer.category,",",jsonObject.claims[0].category)


    res.json(data);
  } catch (error) {
    console.error("Error processing research:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
