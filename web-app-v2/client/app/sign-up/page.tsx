import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23] flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-114.5 560.5C80.5 427.5 284.5 755 573.5 755C862.5 755 1100.5 498.5 1309 498.5C1517.5 498.5 1544.5 668 1544.5 668" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 300.5C80.5 167.5 284.5 495 573.5 495C862.5 495 1100.5 238.5 1309 238.5C1517.5 238.5 1544.5 408 1544.5 408" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <path d="M-114.5 100.5C80.5 -32.5 284.5 295 573.5 295C862.5 295 1100.5 38.5 1309 38.5C1517.5 38.5 1544.5 208 1544.5 208" stroke="#FF7F50" strokeOpacity="0.1" strokeWidth="2"/>
          <circle cx="1300" cy="100" r="20" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="250" r="10" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="100" cy="700" r="50" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="200" cy="500" r="15" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1200" cy="600" r="30" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="1000" cy="400" r="25" fill="#FF7F50" fillOpacity="0.05"/>
          <circle cx="400" cy="200" r="40" fill="#FF7F50" fillOpacity="0.05"/>
        </svg>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0B4D2C] via-[#0B4D2C] to-[#083D23]">
        <SignUp />
      </div>
    </div>
  );
}

