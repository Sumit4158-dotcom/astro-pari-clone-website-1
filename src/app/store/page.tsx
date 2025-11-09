import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function StorePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AstroPari Store</h1>
            <p className="text-lg text-gray-700 mb-8">
              Explore our exclusive collection of spiritual and astrological products.
            </p>
            <div className="bg-[#FFD700] rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-800">
                Our exclusive store is under development. Discover premium spiritual products curated by experts!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
