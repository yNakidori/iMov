export default function LabeledInput({ id, type = "text", title = "input" }) {
  if (!id) throw new Error("Id required");
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 undefined"
      >
        {title}
      </label>
      <div className="flex flex-col items-start">
        <input
          type={type}
          id={id}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
}
