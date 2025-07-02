import { useContext } from "react";
import { appContext } from "../context/AppContext";

export default function useHistory() {
    const { setFormData, setSelectedItem, setHistory } = useContext(appContext);
    const loadHistoryItem = (item) => {
        setFormData({
        type: item.type,
        language: item.language,
        title: item.title,
        description: item.description,
        expectedOutput: item.expectedOutput || "",
        parameters: item.parameters ? item.parameters.map(param => ({ ...param })) : [],
        properties: item.properties ? item.properties.map(prop => ({ ...prop })) : [],
        methods: item.methods ? item.methods.map(method => ({ 
            ...method,
            parameters: method.parameters ? method.parameters.map(param => ({ ...param })) : []
        })) : [],
        classExtends: item.classExtends || "",
        classImplements: item.classImplements || "",
        });
        setSelectedItem(item);
    };
    const clearHistory = () => {
        setHistory([]);
        setSelectedItem(null);
        toast({
        title: "History Cleared",
        description: "All history has been cleared.",
        });
    };
    const getLanguageIcon = (language) => {
        const icons = {
          JavaScript: "JS",
          TypeScript: "TS",
          Python: "PY",
          Java: "JV",
          "C#": "C#",
          Go: "GO",
          Rust: "RS",
          PHP: "PHP",
          Ruby: "RB",
          Swift: "SW",
          Kotlin: "KT",
          "C++": "C++",
        };
        return icons[language] || language.slice(0, 2).toUpperCase();
    };
    return { loadHistoryItem, clearHistory, getLanguageIcon };
}