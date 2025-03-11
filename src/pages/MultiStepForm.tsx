import { useState } from "react";
import formData from "../data/formData.json";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < sections.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formState);
  };

  const navigate = useNavigate();

  const toSinglePageForm = () => {
    navigate("/single-page-form");
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
      <div className="mt-8">
        <button
          onClick={toSinglePageForm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Single Page Form
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;
