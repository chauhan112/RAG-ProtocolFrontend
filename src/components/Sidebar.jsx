import React, { useState, useEffect } from "react";
import { GForm } from "./Components";

function Sidebar({ selectedCollection, onSelectCollection }) {
    const [collections, setCollections] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editCollection, setEditCollection] = useState(null);

    const formStruc = [
        {
            key: "title",
            type: "text",
            placeholder: "Collection Name",
        },
    ];
    useEffect(() => {
        setCollections([
            { id: 1, title: "Research Papers" },
            { id: 2, title: "Books" },
        ]);
    }, []);

    const handleAddCollection = (collection) => {
        // API call: createCollection({ title })
        const newCollection = { ...collection, id: Date.now() };
        setCollections([...collections, newCollection]);
        setShowForm(false);
    };

    const handleEditCollection = (collection) => {
        // API call: updateCollection(collection.id, { title })
        if (selectedCollection?.id === collection.id) {
            onSelectCollection(collection);
        }
        setCollections(
            collections.map((c) => (c.id === collection.id ? collection : c))
        );
        setEditCollection(null);
    };

    const handleDeleteCollection = (id) => {
        // API call: deleteCollection(id)
        if (selectedCollection?.id === id) {
            onSelectCollection(null);
        }
        setCollections(collections.filter((c) => c.id !== id));
    };

    return (
        <div className="w-64 bg-white shadow-md p-4">
            <div className="mb-4 flex justify-between items-center ">
                <h2 className="text-xl font-semibold ">Collections</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded "
                    onClick={() => setShowForm(true)}
                >
                    Add
                </button>
            </div>

            {showForm && (
                <GForm
                    formStruc={formStruc}
                    onSubmit={handleAddCollection}
                    onCancel={() => setShowForm(false)}
                />
            )}
            {editCollection && (
                <GForm
                    formStruc={formStruc}
                    initialData={editCollection}
                    onSubmit={handleEditCollection}
                    onCancel={() => setEditCollection(null)}
                />
            )}

            <ul>
                {collections.map((collection) => (
                    <li
                        key={collection.id}
                        className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        <div onClick={() => onSelectCollection(collection)}>
                            {collection.title}
                        </div>
                        <div>
                            <button
                                className="text-blue-500 mr-2 hover:bg-gray-300"
                                onClick={() => setEditCollection(collection)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:bg-gray-300"
                                onClick={() =>
                                    handleDeleteCollection(collection.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
