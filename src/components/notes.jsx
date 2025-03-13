import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './notes.css';

const foldersData = [
    { id: 1, name: 'Programming', notes: ['DSA Patterns', 'Recursion Notes', 'Next.js Basics'] },
    { id: 2, name: 'Mathematics', notes: ['Basic Math', 'Calculus', 'Linear Algebra'] },
    { id: 3, name: 'Game Dev', notes: ['Unity Basics', 'C# Scripting', 'AR Ideas'] },
    { id: 4, name: 'Personal', notes: ['Books to Read', 'Workout Plan', 'Daily Logs'] },
];

// Card Component
function Card({ children, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {children}
        </div>
    );
}

// CardContent Component
function CardContent({ children }) {
    return (
        <div className="card-content">
            {children}
        </div>
    );
}

// NoteEditor Component
function NoteEditor({ note, onSave, onClose }) {
    const [editedNote, setEditedNote] = useState(note || '');

    const handleSave = () => {
        onSave(editedNote);
        onClose();
    };

    return (
        <div className="note-editor-modal">
            <div className="note-editor-content">
                <textarea
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    placeholder="Write your note here..."
                    className="note-editor-textarea"
                />
                <div className="note-editor-buttons">
                    <button onClick={handleSave} className="save-button">Save</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default function Notes() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const containerVariant = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setIsEditorOpen(true);
    };

    const handleAddNote = () => {
        setEditingNote('');
        setIsEditorOpen(true);
    };

    const handleSaveNote = (newNote) => {
        if (editingNote === '') {
            // Adding a new note
            const updatedFolders = foldersData.map((folder) =>
                folder.id === selectedFolder.id
                    ? { ...folder, notes: [...folder.notes, newNote] }
                    : folder
            );
            setSelectedFolder(updatedFolders.find((f) => f.id === selectedFolder.id));
        } else {
            // Editing existing note
            const updatedFolders = foldersData.map((folder) =>
                folder.id === selectedFolder.id
                    ? {
                        ...folder,
                        notes: folder.notes.map((note) =>
                            note === editingNote ? newNote : note
                        ),
                    }
                    : folder
            );
            setSelectedFolder(updatedFolders.find((f) => f.id === selectedFolder.id));
        }
    };

    return (
        <div className="notes-background">
            {/* Laser beams */}
            <div className="laser laser-one"></div>
            <div className="laser laser-two"></div>
            <div className="laser laser-three"></div>
            <div className="laser laser-four"></div>

            {/* System Overlay */}
            <div className="system-overlay glass-container">
    <div className="player-status highlight">
        <h3 className="system-title">Shadow Monarch</h3>
        <p>Level: <span className="highlight">45</span></p>
        <p>Quests Completed: <span className="highlight">12/15</span></p>
        <p>Mana: <span className="highlight">780 / 1200</span></p>
    </div>

    <div className="daily-quests">
        <h3 className="system-title overlay-title">Daily Quests</h3>
        <ul className="quest-list">
            <li className="quest-completed">☑️ 100 Push-ups</li>
            <li className="quest-completed">☑️ 10,000 Steps</li>
            <li className="quest-completed">☑️ Study for 2 hours</li>
        </ul>
    </div>
</div>


            {/* Main Notes Container */}
            <div className="notes-container">
                <AnimatePresence>
                    {!selectedFolder ? (
                        <motion.div
                            key="folders"
                            variants={containerVariant}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="folders-grid"
                        >
                            {foldersData.map((folder) => (
                                <motion.div key={folder.id} variants={itemVariant}>
                                    <Card onClick={() => setSelectedFolder(folder)}>
                                        <CardContent>
                                            <h2>{folder.name}</h2>
                                            <span className="arrow">➤</span>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="notes"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="notes-grid"
                        >
                            <div className="back-button-container">
                                <button
                                    className="back-button"
                                    onClick={() => setSelectedFolder(null)}
                                >
                                    <ArrowLeft size={20} /> Back
                                </button>
                                <h2>{selectedFolder.name}</h2>
                            </div>

                            <motion.div
                                variants={containerVariant}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="notes-list"
                            >
                                {selectedFolder.notes.map((note, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariant}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleEditNote(note)}
                                    >
                                        <Card>
                                            <CardContent>
                                                <p>{note}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                {/* Add New Note Card */}
                                <motion.div
                                    variants={itemVariant}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddNote}
                                >
                                    <Card>
                                        <CardContent>
                                            <p className="add-new-note">+ Add New Note</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Note Editor Modal */}
                {isEditorOpen && (
                    <NoteEditor
                        note={editingNote}
                        onSave={handleSaveNote}
                        onClose={() => setIsEditorOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
