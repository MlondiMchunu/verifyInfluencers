import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export default function InfluencerPageComponent() {
    const location = useLocation();
    const [influencer, setInfluencer] = useState(null);
    const [activeTab, setActiveTab] = useState("claims"); // State to manage active tab
    const [searchClaimsQuery, setSearchClaimsQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(() => {
        if (location.state?.influencer) {
            setInfluencer(location.state.influencer);
            localStorage.setItem("selectedInfluencer", JSON.stringify(location.state.influencer));
        } else {
            const storedData = localStorage.getItem("selectedInfluencer");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    if (parsedData && typeof parsedData === "object") {
                        setInfluencer(parsedData);
                    }
                } catch (error) {
                    console.error("Error parsing stored influencer data:", error);
                }
            }
        }
    }, [location.state]);

    if (!influencer) {
        return <div className="text-white text-center">Loading influencer data...</div>;
    }

    console.log("Claims: ", influencer.claims)

    return (
        <div className="w-full text-white text-left max-w-[1200px] mx-auto bg-[#101727] p-6 rounded-lg shadow-md">
            {/* Profile Section */}
            <div className="flex items-start gap-6">
                {/* Profile Picture */}
                <div className="w-18 h-18 flex-shrink-0">
                    <img
                        src={influencer.profilePicture || "src/assets/andrew.jpg"}
                        alt={influencer.name || "Influencer"}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>

                {/* Influencer Info */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold">{influencer.name || "Influencer Name"}</h2>

                    {/* Categories */}
                    <div className="mt-3 flex-wrap gap-2">
                        {influencer.categories?.length > 0 ? (
                            influencer.categories.map((category, index) => (
                                <button
                                    key={index}
                                    className="px-3 py-1 mr-4 !bg-[#182130] text-white !rounded-full !text-xs/3"
                                >
                                    {category}
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-400 text-xs">No categories available</p>
                        )}
                    </div>
                    {/* Profile Description */}
                    <p className="mt-1 text-gray-300 text-xs">
                        {influencer.description || "No profile description available."}
                    </p>
                </div>
            </div>

            {/* Labels Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
                {/* Trust Score */}
                <div className="p-4 bg-[#182130] rounded-lg">
                    <p className="text-xs font-bold text-white text-left">Trust Score</p>
                    <p className="text-lg font-bold text-[#14b983] text-left">{influencer.trustScore || 0}%</p>
                    <p className="text-xs text-gray-400 mt-2">Based on verified claims</p>
                </div>

                {/* Yearly Revenue */}
                <div className="p-4 bg-[#182130] rounded-lg text-left">
                    <p className="text-xs font-bold text-white">Yearly Revenue</p>
                    <p className="text-lg font-bold text-[#14b983]">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(influencer.yearlyRevenue || 0)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Estimated earnings</p>
                </div>

                {/* Products */}
                <div className="p-4 bg-[#182130] rounded-lg text-left">
                    <p className="text-xs font-bold text-white">Products</p>
                    <p className="text-lg font-bold text-[#14b983]">{influencer.products || 0}</p>
                    <p className="text-xs text-gray-400 mt-2">Recommended products</p>
                </div>

                {/* Followers */}
                <div className="p-4 bg-[#182130] rounded-lg text-left">
                    <p className="text-xs font-bold text-white">Followers</p>
                    <p className="text-lg font-bold text-[#14b983]">{influencer.followers || 0}</p>
                    <p className="text-xs text-gray-400 mt-2">Total following</p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-6 bg-[#182130] rounded-sm p-4">
                {/* Tab Buttons */}
                <div className="flex gap-4 border-b border-gray-700 pb-2">
                    <button
                        onClick={() => setActiveTab("claims")}
                        className={`px-4 py-2 !text-xs/3 !bg-[#182130] ${activeTab === "claims"
                            ? "text-[#14b983] border-b-2 border-[#14b983]"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Claims Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-4 py-2 !text-xs/3 !bg-[#182130] ${activeTab === "products"
                            ? "text-[#14b983] border-b-2 border-[#14b983]"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Recommended Products
                    </button>
                    <button
                        onClick={() => setActiveTab("monetization")}
                        className={`px-4 py-2 !text-xs/3 !bg-[#182130] ${activeTab === "monetization"
                            ? "text-[#14b983] "
                            : "text-gray-400 "
                            }`}
                    >
                        Monetization
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                    {activeTab === "claims" && (
                        <>

                            <div>
                                {/* Search Input for Claims */}
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search claims..."
                                        className="w-full h-7 p-2 bg-[#101727] border border-gray-700 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#14b983]"
                                        value={searchClaimsQuery}
                                        onChange={(e) => setSearchClaimsQuery(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">

                                </div>
                                <div><p className="text-xs/3 mb-3 opacity-70">Categories</p></div>

                                {/* Category Buttons */}
                                <div className="flex overflow-x-auto gap-2 mb-4">
                                    {[
                                        "All Categories",
                                        "Sleep",
                                        "Performance",
                                        "Hormones",
                                        "Nutrition",
                                        "Exercise",
                                        "Stress",
                                        "Cognition",
                                        "Motivation",
                                        "Recovery",
                                        "Mental Health",
                                    ].map((category, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedCategory(category === "All Categories" ? "" : category)}
                                            className={`px-2 py-1 mr-1 bg-[#101727] text-white opacity-70 !rounded-full !text-xs/3 ${selectedCategory === (category === "All Categories" ? "" : category)
                                                ? "!bg-[#14b983] text-white"
                                                : "!bg-[#101727] text-gray-400 hover:bg-[#14b983] hover:text-white"
                                                } rounded-lg transition-colors duration-300`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </>
                    )}
                    {activeTab === "products" && (
                        <div>
                            <h3 className="text-xs/3">Recommended Products</h3>
                            <p className="text-gray-300 text-sm">
                                Products recommended or endorsed by {influencer.name}.
                            </p>
                            {/* Add recommended products content here */}
                        </div>
                    )}
                    {activeTab === "monetization" && (
                        <div>
                            <h3 className="text-xs/3">Monetization</h3>
                            <p className="text-gray-300 text-sm">
                                Insights into {influencer.name}'s revenue streams and monetization strategies.
                            </p>
                            {/* Add monetization content here */}
                        </div>
                    )}
                </div>
            </div>
            {/* Claims List Ordered by Trust Score */}
            <div className="mt-6 bg-[#101727] rounded-lg p-4">
                <p className="text-xs/3 mb-3 opacity-70">Showing {influencer.claims.length} claims</p>
                {influencer.claims?.filter((claim) => {
                    //filter by search query
                    const matchesSearch = claim.text.toLowerCase().includes(searchClaimsQuery.toLowerCase());

                    //Filtered by selected category
                    const matchesCategory = !selectedCategory || claim.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                })
                    .sort((a, b) => b.confidenceScore - a.confidenceScore)// sort by trust score(descending)\
                    .map((claim, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-4 mb-2 bg-[#101727] rounded-lg ">
                            <div>
                                <p className="text-white text-xs/5 font-bold">{claim.text}</p>
                                <p className="text-gray-400 text-xs mt-1">
                                    Category: {claim.category} | Verification: {claim.verification_status} | Date: {claim.date_of_the_claim}
                                </p>
                                <p className="text-gray-400 text-xs mt-1"><a href={claim.link_to_the_claim_source}>View Research</a></p>
                            </div>
                            <div >
                                <p className="text-[#14b983] text-xs/3 font-bold">{claim.confidenceScore}%</p>
                                <p className="text-white text-xs/2 opacity-70 mt-2 font-bold">Trust Score</p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}