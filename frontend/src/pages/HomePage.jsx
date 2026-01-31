import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";



const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");

        console.log("API RESPONSE:", response.data);

        // RATE LIMIT CHECK
        if (response.data?.rateLimit) {
          setIsRateLimited(true);
          setLoading(false);
          return;
        }

        // IF API RETURNS ARRAY DIRECTLY
        if (Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          // IF API RETURNS { notes: [...] }
          setNotes(response.data.notes || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("FETCH ERROR:", error);
        console.log(error);

        // IF STATUS = 429
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

 return (
  <div className="min-h-screen">
    <Navbar />

    {isRateLimited && <RateLimitedUI />}

    <div className="max-w-7xl mx-auto p-4 mt-6">

      {loading && (
        <div className="text-center text-primary py-10">
          Loading notes...
        </div>
      )}
      {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound/>}

      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note}  setNotes={setNotes}/>
          ))}
        </div>
      )}

    </div>
  </div>
);
};

export default HomePage;
