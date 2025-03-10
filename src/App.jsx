import { Components, Button } from "./mine/Components";
import "./App.css";

import { useRef, useEffect } from "react";
import { LynklePage } from "./AI/LynklePage";

function App() {
    const ref = useRef();

    return (
        <div>
            {/* <Components ref={ref} className="bg-red-500" />
            <Button
                onClick={() => {
                    ref.current.s.setCount(ref.current.s.count + 1);
                }}
            >
                hello
            </Button> */}
            <LynklePage />
        </div>
    );
}

export default App;
