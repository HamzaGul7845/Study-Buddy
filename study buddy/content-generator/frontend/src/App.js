import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateNotes = async () => {
    try {
      const res = await axios.post("http://localhost:5000/generate", {
        text: input,
      });
      setOutput(res.data.output);
    } catch (err) {
      console.log("Error frontend:", err);
      setOutput("Error: Could not connect to backend");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>StudyBuddy – Content Generator</h1>

      <textarea
        placeholder="Paste text here..."
        rows={10}
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={generateNotes} style={{ marginTop: 10 }}>
        Generate Notes
      </button>

      <h2>Generated Notes:</h2>
      <pre>{output}</pre>
    </div>
  );
}

export default App;
