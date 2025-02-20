import React from "react";
import { CircleCheckBig, Users, ChartColumn } from "lucide-react";
import { useState, useEffect } from 'react';
//import env from "react-dotenv";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

console.log("API KEY:", import.meta.env.VITE_API_KEY);
console.log("API URL:", import.meta.env.VITE_API_URL);

const Leaderboard = () => {

  //const [activeButton, setActiveButton] = useState(null);
  /*const handleClick = (button) => {
      setActiveButton(button)
    }*/

  //state for active filter
  const [activeFilter, setActiveFilter] = useState("All");
  const [influencers, setInfluencers] = useState([]);
  const [stats, setStats] = useState({
    totalInfluencers: 0,
    verifiedClaims: 0,
    averageTrustScore: 0,
  });

  useEffect(() => {
    async function fetchData(prompt) {
      try {
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

        //Check if response is JSON
        if (!response.ok) {
          throw new Error(`API error:${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Raw API Response ", data);

        let rawText = data.choices?.[0]?.message?.content;
        if (!rawText) {
          console.error("No content received from AI.");
          return;
        }

        rawText = rawText.replace(/^```json\n```$/g, "");

        let influencersData;

        try {
          influencersData = JSON.parse(rawText);
        } catch (jsonError) {
          console.error("Error parsing AI response as JSON:", jsonError, "Raw text ", rawText);
          return;
        }

        if (!Array.isArray(influencersData)) {
          console.error("API reponse is not an array:", influencersData);
          return;
        }

        //Calculate Stats
        const totalInfluencers = influencersData.length;
        const verifiedClaims = influencersData.reduce((acc, influencer) => acc + (influencer.verifiedClaims || 0), 0);
        const averageTrustScore = influencersData.reduce((acc, influencer) => acc + (influencer.trustScore || 0), 0) / totalInfluencers;

        setInfluencers(influencersData);
        setStats({
          totalInfluencers,
          verifiedClaims,
          averageTrustScore: averageTrustScore.toFixed(1),
        });


        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
          throw new Error("Invalid API response structure.");
        }

        const content = data.choices[0].message.content.trim();
        console.log("AI Response Content:", content);

        try {
          influencersData = JSON.parse(content);
        } catch (parseError) {
          console.warn("AI response is not valid JSON. Trying to extract JSON...");
          const match = content.match(/```json([\s\S]*?)```/);
          if (match) {
            try {
              influencersData = JSON.parse(match[1]);
            } catch (nestedError) {
              console.error("Error parsing extracted JSON:", nestedError);
              return;
            }
          } else {
            console.error("Could not find JSON in AI response.");
            return;
          }

        }

      } catch (error) {
        console.error("Error fetching influencer data:", error);
        //return null;
      }
    }
    fetchData(`Provide ONLY a JSON array of health influencers with these fields:
- "name" (string)
- "category" (string, one of: "Nutrition", "Fitness", "Medicine", "Mental Health")
- "trustScore" (number between 0-100)
- "trend" (string, e.g., "Upward" or "Stable")
- "followers" (integer)
- "verifiedClaims" (number)

Do NOT include explanations, markdown, or formatting—return raw JSON only.`).then((data) => {
      if (data) {
        console.log("AI Response:", data.choices[0].message.content);
      }
    });
  }, []);


  //function to handle category filter
  const filteredInfluencers = activeFilter === "All"
    ? influencers
    : influencers.filter(influencer => influencer.category === activeFilter);

  return (

    <>
      <div className="relative w-full max-w-full">

        <div className="w-full text-white text-left  max-w-[1200px] mx-auto bg-[#101727] p-6 rounded-lg shadow-md">
          {/* Header */}
          <h2 className=" text-xl font-bold">Influencer Trust Leaderboard</h2>
          <p className="text-xs/5 mt-2 opacity-80">Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.</p>

          <div className="flex justify-between mt-4 text-white ">
            <label className="bg-[#1f2937] px-6 py-3 rounded-sm shadow border-collapse border border-gray-600 border-opacity-50">
              <div className="flex col-2 gap-2">
                <span>
                  <Users size={20} className="text-[#10b97f] mt-3" />
                </span>
                <span>
                  <p className="text-lg font-semibold">{stats.totalInfluencers}</p>
                  <p className="text-xs text-gray-400">Active Influencers</p>
                </span>
              </div>
            </label>
            <label className="bg-[#1f2937] px-6 py-3 rounded-sm shadow border-collapse border border-gray-600 border-opacity-50">
              <div className="flex col-2 gap-2">
                <span>
                  <CircleCheckBig size={20} className="text-[#10b97f] mt-3" />
                </span>
                <span>
                  <p className="text-lg font-semibold">{stats.verifiedClaims}</p>
                  <p className="text-xs text-gray-400">Claims Verified</p>
                </span>
              </div>
            </label>
            <label className="bg-[#1f2937] px-6 py-3 rounded-sm shadow border-collapse border border-gray-600 border-opacity-50">
              <div className="flex col-2 gap-2">
                <span>
                  <ChartColumn size={20} className="text-[#10b97f] mt-3" />
                </span>
                <span>
                  <p className="text-lg font-semibold">{stats.averageTrustScore}%</p>
                  <p className="text-xs text-gray-400">Average Trust Score</p>
                </span>
              </div>
            </label>
          </div>


          <div className="w-1/2 mt-6 flex gap-2 text-xs/5 ">

            {["All", "Nutrition", "Fitness", "Medicine", "Mental Health"].map(category => (
              <button
                key={category}
                className={`px-4 py-2 !rounded-full whitespace-nowrap transition-all duration-300 !bg-[#182130] opacity-80 ${activeFilter === category ? "bg-[#1db885] !bg-[#1db885] text-white" : "bg-[#182130] text-white"
                  }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}


          </div>

          {/*Influencer Table */}
          <div className="mt-6 overflow-x-auti">
            <table className="w-full border-collapse border border-gray-600">
              {/*Table Head*/}
              <thead className="bg-[#182130] text-white text-xs/5 opacity-70">
                <tr>
                  <th className=" border-gray-600 px-4 py-2">Rank</th>
                  <th className=" border-gray-600 px-4 py-2">Influencer</th>
                  <th className=" border-gray-600 px-4 py-2">Category</th>
                  <th className="border-gray-600 px-4 py-2">Trust Score</th>
                  <th className=" border-gray-600 px-4 py-2">Trend</th>
                  <th className=" border-gray-600 px-4 py-2">Followers</th>
                  <th className=" border-gray-600 px-4 py-2">Verified Claims</th>
                </tr>
              </thead>

              {/*Table Body*/}
              <tbody className="text-gray-200">
                {filteredInfluencers.map((influencer, index) => (
                  <tr key={influencer.id || `infuencer-${index}`} className="text-center hover:bg-[#1b2a41] transition-all duration-300 text-xs/5 bg-[#182130]">
                    <td className="border-b border-gray-600 px-4 py-2">{index + 1}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.name}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.category}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.trustScore}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.trend}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.followers}</td>
                    <td className="border-b border-gray-600 px-4 py-2">{influencer.verifiedClaims}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Leaderboard;
