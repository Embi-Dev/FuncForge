import { createContext, useState } from "react";
import { AI_PROVIDERS, initialFormState } from "../constants";
export const appContext = createContext();     
export function AppContextProvider({ children }) {
    const [formData, setFormData] = useState(initialFormState);
    const [history, setHistory] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [exportMenuOpen, setExportMenuOpen] = useState(false);
    const [apiConfig, setApiConfig] = useState({
        provider: AI_PROVIDERS[0].id,
        model: AI_PROVIDERS[0].models[0],
        request: AI_PROVIDERS[0].request,
        apiKey: "",
        saveToLocalStorage: false,
    });
    return (
        <appContext.Provider value={{
            formData,
            setFormData,
            history,
            setHistory,
            selectedItem,
            setSelectedItem,
            isGenerating,
            setIsGenerating,
            showApiKey,
            setShowApiKey,
            isFeedbackModalOpen,
            setIsFeedbackModalOpen,
            feedback,
            setFeedback,
            exportMenuOpen,
            setExportMenuOpen,
            apiConfig,
            setApiConfig,
        }}>
            {children}
        </appContext.Provider>
    );
}