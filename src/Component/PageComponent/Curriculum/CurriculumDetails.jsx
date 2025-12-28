import { useState } from "react";

export default function CurriculumDetails() {
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file || !className || !sectionName) {
      alert("Fill all fields");
      return;
    }

    alert(
      `PDF "${file.name}" uploaded for ${className} → ${sectionName}\n\n(Backend required to actually save it)`
    );
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Curriculum Admin CMS</h2>

      <input
        placeholder="Class ID (class-1)"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        placeholder="Section Name (Math)"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: 10 }}
      />

      <button onClick={handleUpload} style={{ padding: "8px 20px" }}>
        Upload / Replace PDF
      </button>
    </div>
  );
}
