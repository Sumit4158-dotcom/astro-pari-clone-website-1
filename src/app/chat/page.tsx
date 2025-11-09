import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function ChatPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chat with Astrologer</h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with expert astrologers instantly through our chat service.
            </p>
            <div className="bg-[#FFD700] rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-800">
                Our Chat service is under development. Get instant answers to your questions from expert astrologers!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
