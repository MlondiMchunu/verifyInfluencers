import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function InfluencerPageComponent() {
    const location = useLocation();
    const [influencer, setInfluencer] = useState(null);
    const [activeTab,setActiveTab] = useState(["Claims"])

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
                    <p className="mt-1 text-gray-300 text-xs tracking-wide">
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
        </div>
    );
}
