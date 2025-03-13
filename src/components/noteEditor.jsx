import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import './notes.css';

export default function NoteEditor({ noteId, folder, onClose }) {
    const [noteContent, setNoteContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Load the note content on mount
    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        try {
            setIsLoading(true);

            const res = await fetch(`http://localhost:5000/note/${noteId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch the note');
            }

            const data = await res.json();
            setNoteContent(data.content);
        } catch (error) {
            console.error('❌ Failed to fetch note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveNote = async () => {
        try {
            setIsLoading(true);

            const res = await fetch(`http://localhost:5000/note/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: noteContent }),
            });

            if (!res.ok) {
                throw new Error('Failed to save the note');
            }

            alert('✅ Note saved!');
        } catch (error) {
            console.error('❌ Failed to save note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this note?');

        if (!confirmDelete) return;

        try {
            setIsLoading(true);

            const res = await fetch(`http://localhost:5000/note/${noteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Failed to delete the note');
            }

            alert('✅ Note deleted!');
            onClose(); // Close the editor after deletion
        } catch (error) {
            console.error('❌ Failed to delete note:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="note-editor-container">
            <div className="back-button-container">
                <button className="back-button" onClick={onClose}>
                    <ArrowLeft size={20} /> Back to Notes
                </button>
                <h2>{folder?.name || 'Note'}</h2>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <textarea
                        className="note-textarea"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="Start writing your note here..."
                    />

                    <div className="editor-actions">
                        <button onClick={saveNote} className="save-btn">
                            Save
                        </button>
                        <button onClick={deleteNote} className="delete-btn">
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
