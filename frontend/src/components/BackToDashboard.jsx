import React from "react";
import {ArrowLeft} from "lucide-react";

export default function BackToDashboard(){
    return(
        <div className="absolute -left-[20px] -top-[50px] flex items-center gap-4">
      {/* Back Button */}
      <label
        className="ml-6 mt-6 bg-[#101727] text-[#1db687] rounded-lg flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
        onClick={() => window.history.back()} // Navigate back
      >
        <ArrowLeft size={15} className="w-6 h-6 text-[#1db687]" />
        <span className="text-xs/3">Back to Dashboard</span>
      </label>

    
    </div>
    );
}
