import { useState, useEffect, useContext } from "react";
import { Button } from "./components/ui/Button";
import { Textarea } from "./components/ui/Textarea";
import { ToastContainer } from "./components/ui/Toast";
import GenerateForm from "./components/generateform/GenerateForm";
import GeneratedCode from "./components/generatedcode/GeneratedCode";
import Header from "./components/header/Header";
import { appContext } from "./context/AppContext";
import History from "./components/history/History";

export default function App() {
    const { 
        isFeedbackModalOpen, 
        setIsFeedbackModalOpen, 
        setHistory, 
        history,
        feedback, 
        setFeedback
    } = useContext(appContext)
  
    useEffect(() => {
        const savedHistory = localStorage.getItem("codeGeneratorHistory");
        if (savedHistory) {
            const parsed = JSON.parse(savedHistory);
            setHistory(
                parsed.map((item) => ({
                    ...item,
                    createdAt: new Date(item.createdAt),
                })),
            );
        }
    }, []);
    useEffect(() => {
        if(history.length > 0) {
            localStorage.setItem("codeGeneratorHistory", JSON.stringify(history));
        }
    }, [history]);

    const submitFeedback = () => {
        console.log("Feedback submitted:", feedback);
        toast({
        title: "Feedback Received",
        description: "Thank you for your feedback!",
        });
        setFeedback("");
        setIsFeedbackModalOpen(false);
    };


  return (
    <div className=" bg-white">
      <ToastContainer />

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Send Feedback</h2>
              <button 
                onClick={() => setIsFeedbackModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <Textarea
              placeholder="What do you think about this tool? How can we improve?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsFeedbackModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitFeedback}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      )}

      <Header />

      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 h-auto">
          <div className="col-span-12 lg:col-span-4 space-y-4 sm:space-y-6">
            <GenerateForm />
          </div>
          <div className="col-span-12 lg:col-span-5 overflow-y-auto mt-4 sm:mt-0">
            <GeneratedCode />
          </div>
          <div className="col-span-12 lg:col-span-3 overflow-y-auto mt-4 sm:mt-0">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}