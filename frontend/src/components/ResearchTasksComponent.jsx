import React, { useState } from "react";
import { Settings, Plus } from "lucide-react";
import BackToDashboard from "./BackToDashboard";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const backendUrl = "http://localhost:4000"; // Replace with your backend URL

export default function ResearchTasksComponent() {
  const [isToggledRA, setIsToggledRA] = useState(false);
  const [isToggledVSJ, setIsToggledVSJ] = useState(false);
  const [selectSpecificInfluencer, setSelectSpecificInfluencer] = useState(false);
  const [discoverNewInfluencers, setDiscoverNewInfluencers] = useState(false);
  const [selectedJournals, setSelectedJournals] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const [influencerName, setInfluencerName] = useState("");
  const [claimsToAnalyze, setClaimsToAnalyze] = useState(0);
  const [productsToFind, setProductsToFind] = useState(0);
  const [influencers, setInfluencers] = useState([]);

  const navigate = useNavigate();

  const journals = [
    "PubMed Central",
    "Nature",
    "Science",
    "Cell",
    "The Lancet",
    "New England Journal of Medicine",
    "JAMA Network",
  ];

  const timeRanges = ["Last Week", "Last Month", "Last Year", "All Time"];

  const handleJournalSelect = (journal) => {
    if (selectedJournals.includes(journal)) {
      setSelectedJournals(selectedJournals.filter((j) => j !== journal));
    } else {
      setSelectedJournals([...selectedJournals, journal]);
    }
  };

  const handleStartResearch = async () => {
    const researchData = {
      influencerName,
      timeRange: selectedTimeRange,
      claimsToAnalyze,
      productsToFind,
      isToggledRA,
      isToggledVSJ,
      selectedJournals,
    };

    try {
      // Send the request to the backend
      const response = await fetch(`${backendUrl}/api/research`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(researchData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend");
      }

      const data = await response.json();
      console.log("Response from Backend:", data);

      // Parse the AI response from the backend
      const rawText = data.choices?.[0]?.message?.content;
      if (!rawText) {
        console.error("No content received from AI.");
        return;
      }

      const cleanedText = rawText.replace(/```json|```/g, "").trim();
      const influencersData = JSON.parse(cleanedText);

      // Transform the data for the frontend
      const transformedData = {
        profilePicture: "src/assets/andrew.jpg",
        name: influencersData.influencer?.name || "Influencer Name",
        categories: extractUniqueCategories(influencersData), // Extract unique categories
        description: influencersData.analysisSummary || "No description available.",
        trustScore: influencersData.influencer?.trustScore || 0,
        yearlyRevenue: influencersData.estimatedRevenue || 0,
        products: influencersData.products?.length || 0,
        followers: influencersData.influencer?.followers || 0,
      };
      
      // Helper function to extract unique categories
      function extractUniqueCategories(data) {
        const categories = new Set();
      
        // Add category from the influencer property
        if (data.influencer?.category) {
          categories.add(data.influencer.category);
        }
      
        // Add categories from the claims array
        if (data.claims && Array.isArray(data.claims)) {
          data.claims.forEach((claim) => {
            if (claim.category) {
              categories.add(claim.category);
            }
          });
        }
      
        // Convert the Set to an array
        return Array.from(categories);
      }

      // Save the data to localStorage and navigate to the influencer page
      localStorage.setItem("selectedInfluencer", JSON.stringify(transformedData));
      navigate("/influencer-page", { state: { influencer: transformedData } });
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
      alert("An error occurred while fetching data. Please try again.");
    }
  };


    return (
        <div className="relative w-full max-w-full">
            <div className="absolute flex">
                <BackToDashboard />
                <span className="text-white font-bold">Research Tasks</span>
            </div>

            <div className="bg-[#182130] w-full mx-auto my-[50px] rounded-sm flex flex-col items-center justify-center relative overflow-hidden p-4">
                <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
                    <Settings className="w-3 h-3 text-[#1db687]" />
                    <p className="text-white text-sm font-bold">Research Configuration</p>
                </div>

                <div className="mt-16 flex flex-wrap gap-4 justify-center w-full">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col max-w-full sm:max-w-[1040px]">
                        <label
                            className={`ml-[10px] w-full bg-[#182130] border-1 ${selectSpecificInfluencer
                                ? "border-[#14b983] !bg-[#173438]"
                                : "border-gray-400"
                                } text-white px-[2px] py-4 rounded-sm mb-6 mt-[5px] flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300`}
                            onClick={() => setSelectSpecificInfluencer(!selectSpecificInfluencer)}
                        >
                            <span className="text-sm font-bold block">Specific Influencer</span>
                            <span className="text-xs/5 opacity-80 block mt-1">
                                Research a known health influencer by name
                            </span>
                        </label>

                        <div className="text-white text-xs/5 opacity-80 text-left">
                            <p className="ml-[5px]">Time Range</p>
                        </div>
                        <div className="ml-[10px] grid grid-cols-2 gap-1 w-full max-w-[1040px] opacity-80">
                            {timeRanges.map((range, index) => (
                                <label
                                    key={index}
                                    className={`w-full min-h-[30px] bg-[#182130] border-1 ${selectedTimeRange === range
                                        ? "border-[#14b983] !bg-[#173438]"
                                        : "border-gray-400"
                                        } text-white flex items-center justify-center text-xs/5 rounded-sm cursor-pointer text-center transition-all duration-300`}
                                    onClick={() => setSelectedTimeRange(range)}
                                >
                                    {range}
                                </label>
                            ))}
                        </div>

                        <div className="text-white text-xs/5 opacity-80 mt-[20px]">
                            <p className="ml-[5px] text-left">Influencer Name</p>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={influencerName}
                                onChange={(e) => setInfluencerName(e.target.value)}
                                className="bg-[#182130] border border-gray-400 text-white px-2 py-2 rounded-sm w-full"
                            />
                        </div>

                        <div className="text-white text-xs/5 opacity-80 mt-[20px]">
                            <p className="ml-[5px] text-left">Claims to Analyze Per Influencer</p>
                        </div>
                        <div>
                            <input
                                type="number"
                                value={claimsToAnalyze}
                                onChange={(e) => setClaimsToAnalyze(e.target.value)}
                                className="bg-[#182130] border border-gray-400 text-white px-2 py-2 rounded-sm w-full"
                            />
                        </div>
                        <div className="text-white text-xs/4 opacity-40 mt-[5px]">
                            <p className="ml-[5px] text-left">Recommended: 50-100 claims for comprehensive analysis</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col max-w-full sm:max-w-[1040px] w-full">
                        <label
                            className={`ml-[10px] w-full bg-[#182130] border-1 ${discoverNewInfluencers
                                ? "border-[#14b983] !bg-[#173438]"
                                : "border-gray-400"
                                } text-white px-[2px] py-4 rounded-sm mb-6 mt-[5px] flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300`}
                            onClick={() => setDiscoverNewInfluencers(!discoverNewInfluencers)}
                        >
                            <span className="text-sm font-bold block">Discover New</span>
                            <span className="text-xs/5 opacity-80 block mt-1">
                                Find and analyse new health influencers
                            </span>
                        </label>

                        <div className="text-white text-xs/5 opacity-80 mt-[10px]">
                            <p className="ml-[5px] text-left">Products to Find Per Influencer</p>
                        </div>
                        <div>
                            <input
                                type="number"
                                value={productsToFind}
                                onChange={(e) => setProductsToFind(e.target.value)}
                                className="bg-[#182130] border border-gray-400 text-white px-2 py-2 rounded-sm w-full"
                            />
                        </div>
                        <div className="text-white text-xs/4 opacity-40 mt-[5px]">
                            <p className="ml-[5px] text-left">Set to 0 to skip product research</p>
                        </div>

                        {/* Include Revenue Analysis Toggle */}
                        <div>
                            <span className="flex flex-row mt-[15px]">
                                <label className="ml-[10px] w-full bg-[#182130] border-0 border-gray-400 text-white px-6 py-4 rounded-sm flex flex-col items-left justify-center cursor-pointer text-left transition-all duration-300">
                                    <span className="text-sm font-bold block text-left">Include Revenue Analysis</span>
                                    <span className="text-xs/5 opacity-80 block mt-1">
                                        Analyze monetization methods and estimate earnings
                                    </span>
                                </label>
                                <div className="py-8">
                                    <button
                                        onClick={() => setIsToggledRA(!isToggledRA)}
                                        className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 flex items-center justify-center ${isToggledRA ? "!bg-[#14bc81]" : "bg-gray-600"
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-2 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isToggledRA ? "translate-x-6" : "translate-x-0"
                                                }`}
                                        ></div>
                                    </button>
                                </div>
                            </span>
                        </div>

                        {/* Verify with Scientific Journals Toggle */}
                        <div>
                            <span className="flex flex-row">
                                <label className="ml-[10px] w-full bg-[#182130] border-0 border-gray-400 text-white px-6 py-4 rounded-sm mb-6 flex flex-col items-left justify-center cursor-pointer text-left transition-all duration-300">
                                    <span className="text-sm font-bold block">Verify with Scientific Journals</span>
                                    <span className="text-xs/5 opacity-80 block mt-1">
                                        Cross-reference claims with scientific literature
                                    </span>
                                </label>
                                <div className="py-8">
                                    <button
                                        onClick={() => setIsToggledVSJ(!isToggledVSJ)}
                                        className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 flex items-center justify-center ${isToggledVSJ ? "!bg-[#14bc81]" : "bg-gray-500"
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-2 !bg-white rounded-full shadow-md transform transition-transform duration-300 ${isToggledVSJ ? "translate-x-2" : "translate-x-[-1px]"
                                                }`}
                                        ></div>
                                    </button>
                                </div>
                            </span>
                        </div>
                    </div>

                    {/* Scientific Journals Section */}
                    <div className="w-full mt-2 px-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-white text-xs/5 text-left">Scientific Journals</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedJournals([...journals])}
                                    className="!text-xs/5 text-[#14b983] hover:underline focus:outline-none !bg-transparent"
                                >
                                    Select All
                                </button>
                                |
                                <button
                                    onClick={() => setSelectedJournals([])}
                                    className="!text-xs/5 text-[#14b983] hover:underline focus:outline-none !bg-transparent"
                                >
                                    Deselect All
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {journals.map((label, index) => (
                                <label
                                    key={index}
                                    className={`w-full bg-[#182130] border-1 ${selectedJournals.includes(label)
                                        ? "border-[#14b983] !bg-[#173438]"
                                        : "border-gray-400"
                                        } text-white flex items-center justify-center text-xs py-2 rounded-sm cursor-pointer text-center transition-all duration-300`}
                                    onClick={() => handleJournalSelect(label)}
                                >
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Start Research Button */}
                    <div className="flex justify-end mt-4 w-full">
                        <button
                            onClick={handleStartResearch}
                            className={`!bg-[#17715b] h-8 text-white !text-xs/5 flex items-center justify-center gap-2 rounded-xs hover:bg-[#12a575] transition-colors duration-300 px-4`}
                        >
                            <Plus size={12} className="text-white" />
                            Start Research
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}