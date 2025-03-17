import React, { useState, useEffect } from "react";
import { GForm } from "./Components";
import {
    fetchCollections,
    addCollection,
    updateCollection,
    deleteCollection,
} from "../tools/api";

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
        // API call: fetchCollections()
        fetchCollections().then((data) =>
            setCollections(data.map((c) => ({ id: c, title: c })))
        );
    }, []);

    const handleAddCollection = (collection) => {
        // API call: createCollection({ title })

        addCollection(collection.title)
            .then(() => {
                const newCollection = { ...collection, id: Date.now() };
                setCollections([...collections, newCollection]);
                setShowForm(false);
            })
            .catch((error) => {
                console.error("Error adding collection:", error);
            });
    };

    const handleEditCollection = (collection) => {
        // API call: updateCollection(collection.id, { title })
        console.log(collection);
        updateCollection(collection.id, collection.title).then(() => {
            setEditCollection(null);
            fetchCollections().then((data) => {
                setCollections(data.map((c) => ({ id: c, title: c })));
                // data.map((c) => {
                //     if (c === collection.title) {
                //         onSelectCollection({ id: c, title: c });
                //     }
                // });
            });
            onSelectCollection(null);
            // if (selectedCollection?.id === collection.id) {
            //     onSelectCollection(collection);
            // }
        });
    };

    const handleDeleteCollection = (id) => {
        // API call: deleteCollection(id)
        deleteCollection(id).then(() => {
            if (selectedCollection?.id === id) {
                onSelectCollection(null);
            }
            setCollections(collections.filter((c) => c.id !== id));
        });
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
