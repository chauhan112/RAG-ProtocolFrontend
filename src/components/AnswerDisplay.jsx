import React from "react";

function AnswerDisplay({ answer }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Answer</h3>
            <p>{answer.text}</p>
            <p className="text-sm text-gray-500 mt-2">
                <strong>Reference:</strong> {answer.reference}
            </p>
        </div>
    );
}

export default AnswerDisplay;
