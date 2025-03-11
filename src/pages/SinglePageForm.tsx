import { useState } from "react";
import formData from "../data/formData.json";
import { useNavigate } from "react-router-dom";

function SinglePageForm() {
  const initialFormState = formData.sections.reduce((acc, section) => {
    section.fields.forEach((field) => {
      acc[field] = "";
    });
    return acc;
  }, {} as Record<string, string>);

  const [formState, setFormState] = useState(initialFormState);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/multi-step-form");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formState);
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
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="mt-8">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Multi-Step Form
        </button>
      </div>
    </div>
  );
}

export default SinglePageForm;
// import { useState } from "react";
// import { useAuthStore } from "../store/auth";
// import { useNavigate } from "react-router-dom";

// function SinglePageForm() {
//   const [formData, setFormData] = useState<{
//     formTitle: string;
//     sections: {
//       title: string;
//       fields?: string[];
//     }[];
//   }>({
//     formTitle: "",
//     sections: [],
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//   };

//   const { login } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     login();
//     navigate("/multi-step-form");
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">{formData.formTitle}</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {formData.sections.map((section) => (
//           <div key={section.title}>
//             <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
//             {section.fields?.map((field) => (
//               <div key={field} className="mb-2">
//                 <label className="block font-medium">{field}:</label>
//                 <input
//                   className="border p-2 w-full"
//                   type="text"
//                   name={field}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           type="submit"
//         >
//           Submit
//         </button>
//       </form>
//       <div className="mt-8">
//         <button
//           onClick={handleLogin}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Multi-Step Form
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SinglePageForm;
