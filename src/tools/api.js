import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

export const fetchCollections = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/collections/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
};

export const addCollection = async (name) => {
    return await axios.post(`${API_BASE_URL}/collections/`, {
        name: name,
    });
};

export const updateCollection = async (oldName, newName) => {
    return await axios.post(`${API_BASE_URL}/collections/update/`, {
        oldName,
        newName,
    });
};

export const deleteCollection = async (name) => {
    return await axios.delete(`${API_BASE_URL}/collections/${name}/`);
};

export const readPdfs = async (collectionName) => {
    return await axios.get(
        `${API_BASE_URL}/collections/${collectionName}/pdfs/`
    );
};

export const uploadPdf = async (file, collectionName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pdf_name", file.name);

    return await axios.post(
        `${API_BASE_URL}/collections/${collectionName}/pdfs/?pdf_name=${file.name}`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
};
export const deletePdf = async (filename, collectionName) => {
    return await axios.delete(
        `${API_BASE_URL}/collections/${collectionName}/pdfs/${filename}`
    );
};
