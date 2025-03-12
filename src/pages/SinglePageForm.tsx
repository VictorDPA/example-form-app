import { useState, useEffect, useCallback } from "react";
import formData from "../data/formData.json";
import mockAnswers from "../data/mockAnswers.json";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function SinglePageForm() {
  const initialFormState = formData.sections.reduce((acc, section) => {
    section.fields.forEach((field) => {
      acc[field] = "";
    });
    return acc;
  }, {} as Record<string, string>);

  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  const handleNavigateToMultiStep = useCallback(() => {
    navigate("/multi-step-form");
  }, [navigate]);

  // Load mock data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("mockFormData");
    if (savedData) {
      setFormState(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("mockFormData", JSON.stringify(formState));
    console.log("Form Data Saved to Local Storage:", formState);
  };

  const fillMockData = () => {
    setFormState(mockAnswers);
    localStorage.setItem("mockFormData", JSON.stringify(mockAnswers));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(formData.formTitle, 10, 10);

    let y = 20;
    formData.sections.forEach((section) => {
      doc.setFontSize(14);
      doc.text(section.title, 10, y);
      y += 6;
      section.fields.forEach((field) => {
        doc.setFontSize(12);
        const text = `${field}: ${formState[field] || ""}`;
        const splitText = doc.splitTextToSize(text, 180);
        doc.text(splitText, 10, y);
        y += splitText.length * 6;
      });
      y += 4;
    });

    const name = formState["Nome"]
      ? formState["Nome"].replace(/\s+/g, "_")
      : "form_data";
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "_");
    const fileName = `${name}_${date}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{formData.formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formData.sections.map((section) => (
          <fieldset key={section.title} className="border p-4 rounded">
            <legend className="text-lg font-semibold">{section.title}</legend>
            {section.fields.map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-medium mb-1">{field}:</label>
                <input
                  className="border p-2 w-full rounded"
                  type="text"
                  name={field}
                  value={formState[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </fieldset>
        ))}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="mt-8 flex flex-col gap-2">
        <button
          onClick={fillMockData}
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
        >
          Preenchimento Automático Ficção
        </button>
        <button
          onClick={exportToPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Export as PDF
        </button>
      </div>
      {/* Navigate to Multi-Step Form */}
      <div className="mt-8">
        <button
          onClick={handleNavigateToMultiStep}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Mudar para Relatorio em Seções
        </button>
      </div>
    </div>
  );
}

export default SinglePageForm;
