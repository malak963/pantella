import Skeleton from "react-loading-skeleton";
import Image from "next/image";

export default function PageLoader() {
    return (
        <div className="relative min-h-screen p-6">
            {/* Skeleton products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton height={220} borderRadius={16} />
                        <Skeleton height={16} width="80%" />
                        <Skeleton height={14} width="60%" />
                    </div>
                ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60">
                <div className="w-20 h-20 mb-3 animate-spin-slow">
                    <Image
                        src="/glassess1.jpg"
                        alt="Loading"
                        width={200}
                        height={200}
                        priority
                    />
                </div>

                <p className="text-3xl text-pink-950 ">
                    Just a moment… beauty is on the way
                </p>
            </div>
        </div>
    );
}