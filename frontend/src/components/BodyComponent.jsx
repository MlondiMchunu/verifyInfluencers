import React, { useState } from 'react';
import { Settings } from "lucide-react";
import InfluencerNameComponent from './InfluencerNameComponent';
import ClaimsPerInfluencer from './ClaimsPerInfluencer';
import ScientificJournalsComponent from './ScientificJournalsComponent';
import ProductsPerInfluencer from './ProductsPerInfluencer';
import RevenueAnalysisToggle from './RevenueAnalysisToggle';
import VerifyScientificJournalsToggle from './VerifyScientificJournalsToggle';
import Main from './Main';


export default function ResearchTasksComponent() {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <>
            <div className="bg-[#182130] w-[calc(100vw-100px)] h-[calc(100vh-100px)] mx-auto my-[50px] rounded-sm flex items-center justify-evenly">

                <Main />

                <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
                    <Settings className="w-3 h-3 text-[#1db687]" />
                    <p className="text-white text-sm text-lg font-bold">Research Configuration</p>
                </div>
                {/*Main content divided into two columns*/}

                <div className="mt-16 flex gap-2" >
                    {/*Left column**/}
                    <div className="flex-1 flex flex-col ">
                        {/*Left column content**/}

                        <label className="ml-[10px] w-full max-w-[1040px]  bg-[#182130] border-1 border-gray-400 text-white px-[2px] py-4 rounded-sm mb-6 mt-[5px] flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300">
                            <span className="text-sm font-bold block">Specific Influencer</span>
                            <span className="text-xs/5 opacity-80 block mt-1">
                                Research a known health influencer by name
                            </span>
                        </label>

                        <div className="text-white text-xs/5 opacity-80"><p className="ml-[5px]">Time Range</p></div>
                        <div className="ml-[10px] grid grid-cols-2 gap-1 w-full max-w-[1040px] opacity-80">
                            {["Last Week", "Last Month", "Last Year", "All Time"].map((label, index) => (
                                <label
                                    key={index}
                                    className="w-full min-h-[30px] bg-[#182130] border-1 border-gray-400 text-white flex items-center justify-center text-xs/5 rounded-sm cursor-pointer text-center transition-all duration-300">
                                    {label}
                                </label>
                            ))}
                        </div>

                        <div className="text-white text-xs/5 opacity-80 mt-[20px]" ><p className="ml-[5px]">Influencer Name</p></div>
                        <div>
                            <InfluencerNameComponent />
                        </div>

                        <div className="text-white text-xs/5 opacity-80 mt-[20px]" ><p className="ml-[5px]">Claims to Analyze Per Influencer</p></div>
                        <div>
                            <ClaimsPerInfluencer />
                        </div>
                        <div className="text-white text-xs/4 opacity-40 mt-[5px]" ><p className="ml-[5px]">Recommended: 50-100 claims for comprehensive analysis</p></div>

                        <div className="text-white text-xs/5 opacity-80 mt-[20px]" ><p className="ml-[5px]">Scientific Journals</p></div>

                        <div>
                            <ScientificJournalsComponent />
                        </div>
                    </div>

                    {/*Right Column**/}
                    <div className="flex-1 flex flex-col ">
                        {/*Right Column Content*/}
                        <label className="ml-[10px] w-full max-w-[1040px]  bg-[#182130] border-1 border-gray-400 text-white px-6 py-4 rounded-sm mb-6 mt-[5px] flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300">
                            <span className="text-sm font-bold block">Discover New</span>
                            <span className="text-xs/5 opacity-80 block mt-1">
                                Find and analyze new health influencers
                            </span>
                        </label>

                        <div className="text-white text-xs/5 opacity-80 mt-[10px]" ><p className="ml-[5px]">Products to Find Per Influencer</p></div>
                        <div>
                            <ProductsPerInfluencer />
                        </div>
                        <div className="text-white text-xs/4 opacity-40 mt-[5px]" ><p className="ml-[5px]">Set to 0 to skip product research</p></div>

                        <div>
                            <div>
                                <span className="flex flex-row mt-[15px]">
                                    <label className="ml-[10px] w-full max-w-[1040px]  bg-[#182130] border-0 border-gray-400 text-white px-6 py-4 rounded-sm   flex flex-col items-left justify-center cursor-pointer text-left transition-all duration-300">
                                        <span className="text-sm font-bold block">Include Revenue Analysis</span>
                                        <span className="text-xs/5 opacity-80 block mt-1">
                                            Analyze monetization methods and estimate earnings
                                        </span>
                                    </label>
                                    <div className="py-8">
                                        <RevenueAnalysisToggle isOn={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                                    </div>
                                </span>
                            </div>

                            <div>
                                <span className="flex flex-row">
                                    <label className="ml-[10px] w-full max-w-[1040px]  bg-[#182130] border-0 border-gray-400 text-white px-6 py-4 rounded-sm mb-6  flex flex-col items-left justify-center cursor-pointer text-left transition-all duration-300">
                                        <span className="text-sm font-bold block">Verify with Scientific Journals</span>
                                        <span className="text-xs/5 opacity-80 block mt-1">
                                            Cross-reference claims with scientific literature
                                        </span>
                                    </label>
                                    <div className="py-8">
                                        <VerifyScientificJournalsToggle isOn={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                                    </div>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}