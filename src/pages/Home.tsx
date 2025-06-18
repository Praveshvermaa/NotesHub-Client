import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/NotesHubBg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 text-white">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          Welcome to NotesHub 🚀
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl max-w-xl mx-auto">
          A collaborative platform for students, teachers, and professors to share and access valuable study resources. 📚
        </p>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl mt-4 mb-10 text-gray-200">
          Students can access a variety of study materials, past papers, and notes from their peers and educators. Teachers and professors can share their notes to help students learn better and achieve academic success.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Share Notes (For Teachers/Professors) */}
          <Card
            className="w-80 bg-white/90 border border-white/30 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer shadow-lg"
            onClick={() => navigate("/login")}
          >
            <CardHeader>
              <CardTitle className="text-black text-xl font-semibold">
                📤 Share Your Notes 
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 mb-4">
                Teachers and professors can upload study materials, notes, and past papers to help students succeed in their learning.
              </p>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={() => navigate("/login")}
              >
                Share Now
              </Button>
            </CardContent>
          </Card>

          {/* Access Notes (For Students) */}
          <Card
            className="w-80 bg-white/90 border border-white/30 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer shadow-lg"
            onClick={() => navigate("/access")}
          >
            <CardHeader>
              <CardTitle className="text-black text-xl font-semibold">
                📥 Access Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 mb-4">
                Students can browse and access a wide range of notes, past papers, and other study materials .
              </p>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={() => navigate("/access")}
              >
                Browse Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Extra Text */}
        <div className="text-center mt-12">
          <p className="text-gray-200 text-lg sm:text-xl">
            Empower your learning, share knowledge, and collaborate with others! 🌟
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full py-6 bg-black bg-opacity-40 text-center text-gray-300 z-10">
        <p>&copy; 2025 NotesHub. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
