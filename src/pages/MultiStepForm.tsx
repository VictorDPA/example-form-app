import { useState, useCallback, useEffect } from "react";
import formData from "../data/formData.json";
import mockAnswers from "../data/mockAnswers.json";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const sections = formData.sections;
  const initialFormState = sections.reduce((acc, section) => {
    section.fields.forEach((field) => {
      acc[field] = "";
    });
    return acc;
  }, {} as Record<string, string>);

  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("mockFormData");
    if (savedData) {
      setFormState(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Step Navigation
  const nextStep = useCallback(() => {
    if (step < sections.length - 1) setStep(step + 1);
  }, [step, sections.length]);

  const prevStep = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formState);
  };

  const toSinglePageForm = useCallback(() => {
    navigate("/single-page-form");
  }, [navigate]);

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

    const defaultFileName = `${formState["Nome"] || "form-data"}-${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    const fileName = prompt("Enter file name:", defaultFileName);
    if (fileName) {
      doc.save(fileName);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{formData.formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="border p-4 rounded">
          <legend className="text-lg font-semibold">
            {sections[step].title}
          </legend>
          {sections[step].fields.map((field) => (
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
        <div className="flex justify-between">
          {step > 0 && (
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {step < sections.length - 1 ? (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      <div className="mt-8 flex flex-col gap-2">
        <button
          onClick={fillMockData}
          className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
        >
          Fill All Answers with Mock Data
        </button>
        <button
          onClick={exportToPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Export as PDF
        </button>
      </div>
      <div className="mt-8">
        <button
          onClick={toSinglePageForm}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Go to Single Page Form
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
