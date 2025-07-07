import { BackgroundLines } from "./ui/wavy-bg";

export default function Header() {
  return (
    <div className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center">
      <BackgroundLines className="absolute inset-0">
        <div className="relative z-10 max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-top h-full">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-bold text-center leading-tight mb-4">
            SecureEye
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold text-center mb-2">
            AI Smart Contract Auditor
          </p>
          <p className="text-base md:text-lg lg:text-xl text-white/80 font-normal text-center">
            Leverage the power of AI to audit your smart contracts
          </p>
        </div>
      </BackgroundLines>
    </div>
  );
}