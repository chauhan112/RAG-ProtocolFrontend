import React, { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar";
import PdfList from "./components/PdfList";
import QuestionForm from "./components/QuestionForm";
import AnswerDisplay from "./components/AnswerDisplay";
import { Sidebar } from "./components/Components";
import { CITTools } from "./tools/Helper";
const API_BASE_URL = "http://localhost:8000";
// import { ConfirmationModal } from "./components/Components";

export const MainComponent = () => {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [hideNav, setHideNav] = useState(false);
    const [rhideNav, setRHideNav] = useState(false);
    return (
        <div className="relative">
            <div className="flex h-screen bg-gray-100 relative">
                <div
                    className="absolute left-2 bottom-2 cursor-pointer select-none"
                    onClick={() => setHideNav(!hideNav)}
                >
                    {hideNav ? ">>" : "<<"}
                </div>
                {!hideNav && (
                    <Sidebar
                        onSelectCollection={setSelectedCollection}
                        selectedCollection={selectedCollection}
                    />
                )}

                <div className="flex-1 p-6 overflow-auto">
                    {selectedCollection ? (
                        <>
                            <PdfList collection={selectedCollection} />
                            <QuestionForm
                                collectionId={selectedCollection.id}
                                onAnswer={setAnswer}
                            />
                            {answer && <AnswerDisplay answer={answer} />}
                        </>
                    ) : (
                        <p className="text-gray-500">
                            Select a collection to get started.
                        </p>
                    )}
                </div>
                {!rhideNav && (
                    <Sidebar
                        onSelectCollection={setSelectedCollection}
                        selectedCollection={selectedCollection}
                    />
                )}
                <div
                    className="absolute right-2 bottom-2 cursor-pointer select-none"
                    onClick={() => setRHideNav(!rhideNav)}
                >
                    {rhideNav ? "<<" : ">>"}
                </div>
            </div>
        </div>
    );
};

export const Test = () => {
    const ref = React.createRef();
    const [title, setTitle] = useState("Noida");

    return (
        <div>
            <h1>
                <Sidebar
                    {...{ state: { title } }}
                    onSelectCollection={() => {}}
                    ref={ref}
                    collections={[]}
                />
                <button onClick={() => setTitle("Delhi")}>Change Title</button>
            </h1>
        </div>
    );
};

function App() {
    return <Test />;
}

export default App;
