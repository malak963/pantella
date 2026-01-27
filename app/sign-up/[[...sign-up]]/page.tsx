import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/images/background.png')" }}
      ></div>

      <div className="relative z-10  w-full max-w-100  rounded-[2.5rem] shadow-2xl overflow-hidden  flex flex-col border border-white/20 my-10">
        
        <div className="bg-[#1a1a1a] pt-7 pb-6 text-center  shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <img
              className="w-45 h-auto object-contain"
              src="/images/icons/logo-rm-bg.png"
              alt="Pentella"
            />
          </div>
        </div>

        <div className="bg-[#fcfcfb]">
           <SignUp 
            
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-none ",
                // main: " w-full flex flex-col ",
                header: "hidden", 
                

                formFieldInput: "w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm focus:border-[#d6a38c] focus:ring-0 bg-white transition-all",
                

                formButtonPrimary: "w-full rounded-xl bg-[#c48c74] py-4 text-white font-bold hover:bg-[#b67b63] transition-all normal-case text-base shadow-md mt-2",
                

                socialButtonsBlockButton: "w-full border border-gray-200 rounded-xl py-3 hover:bg-gray-50 transition-colors",
                socialButtonsBlockButtonText: "font-medium text-gray-600",
                
              
                dividerText: "text-gray-400 font-medium px-3",


                footer: "bg-gray-50/50 border-t border-gray-100 px-8 py-6",
                footerActionLink: "text-[#c48c74] font-bold hover:text-[#a57560] ml-1",

                "clerk-branding": "hidden",
              },
              variables: {
                colorPrimary: "#c48c74",
                borderRadius: "2px",
              },
            }}
            
         afterSignUpUrl="/confirm-name"
         />
        </div>
      </div>
    </div>
  )
}