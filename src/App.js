import React from "react";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import LabeledInput from "./components/LabeledInput";

function App() {
  return (
    <div className="">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-900">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <LabeledInput id="name" title="Name" />
            <LabeledInput id="email" title="Email" type="email" />

            <LabeledInput id="password" title="Password" type="password" />

            <LabeledInput
              id="passwordC"
              title="Confirm Password"
              type="password"
            />

            <div className="flex items-center justify-end mb-4">
              <p className="text-sm text-gray-600">
                <span>Have already an account?</span>
                <span className="ml-1 text-gray-900 underline hover:text-gray-700">
                  <Link to="/Login" className="text-purple-600 hover:underline">
                    Sign in
                  </Link>
                </span>
              </p>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
