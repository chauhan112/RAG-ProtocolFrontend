import React, { useState } from "react";

function QuestionForm({ collectionId, onAnswer }) {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call: askQuestion(collectionId, { question })
        const mockAnswer = {
            text: "This is a sample answer.",
            reference: "Paper1.pdf, Page 3",
        };
        onAnswer(mockAnswer);
        setQuestion("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-2 border rounded mb-2"
                rows="3"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </form>
    );
}

export default QuestionForm;
