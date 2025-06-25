import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Trash2 } from "lucide-react"
import Navbar from "./Navbar"
import api from "@/lib/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface Note {
  _id: string;
  title: string;
  subject: string;
  semester: string;
  year: string;
  department: string;
  views: number;
  totalRatingUsers: number;
  ratingSum: number;
}

export default function UploaderDashboard() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchNotes = async () => {
      const toastId = toast.loading("Fetching uploaded notes...");
      try {
        const res = await api.get("/notes/fetch-all");
        setNotes(res.data.notes);
        toast.success("Notes loaded successfully!", { id: toastId });
      } catch (err) {
        toast.error("Failed to fetch notes.", { id: toastId });
        setError("Failed to fetch notes.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // 🔴 Handle note deletion
  const handleDelete = async (noteId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting note...");
    try {
      await api.delete(`/notes/delete/${noteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the note.", { id: toastId });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          📋 Uploaded Notes Overview
        </h2>

        {loading ? (
          <p className="text-center">Loading notes...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : notes.length === 0 ? (
          <p className="text-center">No notes uploaded yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {notes.map((note) => (
              <Card key={note._id}>
                <CardHeader className="flex justify-between items-start">
                  <CardTitle>{note.subject}</CardTitle>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 p-1"
                    onClick={() => handleDelete(note._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <Badge variant="outline">{note.subject}</Badge> • Semester{" "}
                    {note.semester} • {note.year}
                  </div>
                  <div className="text-sm">Department: {note.department}</div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {note.totalRatingUsers > 0
                        ? (note.ratingSum / note.totalRatingUsers).toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
