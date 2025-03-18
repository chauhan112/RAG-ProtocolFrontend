import React, { useState, useEffect } from "react";
import { GForm } from "./Components";
import { readPdfs, uploadPdf } from "../tools/api";
export const Header = ({ title, onUpload }) => {
    return (
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={onUpload}
            >
                Upload PDF
            </button>
        </div>
    );
};
function PdfList({ collection }) {
    const [pdfs, setPdfs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const formStruc = [
        {
            key: "name",
            type: "file",
            accept: ".pdf",
            label: "Upload PDF",
            getter: (e) => e.target.files[0],
        },
    ];
    useEffect(() => {
        readPdfs(collection.id).then((data) => {
            setPdfs(data.data.map((c) => ({ id: c, name: c })));
        });
    }, [collection.id]);

    const handleUploadPdf = (info) => {
        let file = info.name;

        uploadPdf(file, collection.id).then((data) => {
            const newPdf = { id: Date.now(), name: file.name };
            setPdfs([...pdfs, newPdf]);
            setShowForm(false);
        });
    };

    const handleDeletePdf = (id) => {
        // API call: deletePdf(collectionId, id)
        setPdfs(pdfs.filter((p) => p.id !== id));
    };

    return (
        <div className="mb-6">
            <Header
                title={collection.title}
                onUpload={() => setShowForm(true)}
            />

            {showForm && (
                <GForm
                    formStruc={formStruc}
                    onSubmit={handleUploadPdf}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <ul>
                {pdfs.map((pdf) => (
                    <li
                        key={pdf.id}
                        className="flex justify-between items-center p-2"
                    >
                        <span>{pdf.name}</span>
                        <div>
                            <button
                                className="text-red-500"
                                onClick={() => handleDeletePdf(pdf.id)}
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

export default PdfList;
