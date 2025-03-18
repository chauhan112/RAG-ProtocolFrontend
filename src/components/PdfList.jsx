import React, { useState, useEffect } from "react";
import { GForm } from "./Components";
import { readPdfs, uploadPdf, deletePdf } from "../tools/api";
import { CITTools } from "../tools/Helper";
import { toast } from "react-toastify";
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
    const inpStruc = {
        key: "name",
        type: "file",
        accept: ".pdf",
        label: "Upload PDF",

        getter: (e) => e.target.files[0],
    };

    let originalcss = "bg-green-500 text-white px-4 py-2 rounded";
    const updateSaveProps = (props) => {
        formRef.current.setSt(
            CITTools.updateObject(formRef.current.st, {
                btns: {
                    children: {
                        0: {
                            ...props,
                        },
                    },
                },
            })
        );
    };
    const formStruc = [
        {
            ...inpStruc,
            onChange: (e) => {
                formRef.current.onChangeForInput(e, inpStruc);
                updateSaveProps({
                    disabled: false,
                    className: originalcss,
                });
            },
        },
    ];

    useEffect(() => {
        readPdfs(collection.id).then((data) => {
            setPdfs(data.data.map((c) => ({ id: c, name: c })));
        });
    }, [collection.id]);
    const formRef = React.createRef();
    const handleUploadPdf = (info) => {
        let file = info.name;
        console.log(formRef);
        updateSaveProps({
            disabled: true,
            label: "uploading...",
            className:
                "bg-green-500 text-white px-4 py-2 rounded cursor-not-allowed",
        });
        uploadPdf(file, collection.id)
            .then((data) => {
                const newPdf = { id: Date.now(), name: file.name };
                setPdfs([...pdfs, newPdf]);
                setShowForm(false);
                updateSaveProps({
                    disabled: true,
                    label: "uploading...",
                    className: "cursor-not-allowed",
                });
            })
            .catch((error) => {
                console.error("Error uploading PDF:", error);
                toast.error("Error uploading PDF", { autoClose: 3000 });
                updateSaveProps({
                    disabled: false,
                    label: "Retry",
                    className: "bg-red-500 text-white px-4 py-2 rounded",
                });
            });
    };

    const handleDeletePdf = (id) => {
        // API call: deletePdf(collectionId, id)
        deletePdf(id, collection.id).then(() => {
            setPdfs(pdfs.filter((p) => p.id !== id));
        });
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
                    ref={formRef}
                    {...{
                        btns: {
                            children: {
                                0: {
                                    disabled: true,
                                    className:
                                        "bg-gray-200 text-white px-4 py-2 rounded cursor-not-allowed",
                                },
                            },
                        },
                    }}
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
