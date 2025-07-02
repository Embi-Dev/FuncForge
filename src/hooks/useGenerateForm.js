import { useContext } from "react";
import { appContext } from "../context/AppContext";
import { toast } from "../components/ui/Toast";
import { ACCESS_MODIFIERS, SYSTEM_PROMPT } from "../constants";
import { initialFormState, LANGUAGE_TYPES } from "../constants";
export default function useGenerateForm() {
    const { 
        setFormData, 
        setSelectedItem, 
        formData, 
        apiConfig, 
        setIsGenerating,
        setHistory 
    } = useContext(appContext);
    const clearForm = () => {
        setFormData(initialFormState);
        setSelectedItem(null);
        toast({
            title: "Form Cleared",
            description: "Ready to create a new function",
        });
    };
    const addParameter = () => {
        const newParam = {
            id: Date.now().toString(),
            name: "",
            type: LANGUAGE_TYPES[formData.language][0],
            description: "",
            };
            setFormData((prev) => ({
            ...prev,
            parameters: [...prev.parameters, newParam],
        }));
    };
    const updateParameter = (id, field, value) => {
        setFormData((prev) => ({
            ...prev,
            parameters: prev.parameters.map((param) => (param.id === id ? { ...param, [field]: value } : param)),
        }));
    };
    const removeParameter = (id) => {
        setFormData((prev) => ({
        ...prev,
        parameters: prev.parameters.filter((param) => param.id !== id),
        }));
    };
    const addProperty = () => {
        const newProperty = {
        id: Date.now().toString(),
        name: "",
        type: LANGUAGE_TYPES[formData.language][0],
        description: "",
        accessModifier: ACCESS_MODIFIERS[formData.language]?.[0] || "",
        isRequired: true,
        };
        setFormData((prev) => ({
        ...prev,
        properties: [...prev.properties, newProperty],
        }));
    };
    const updateProperty = (id, field, value) => {
        setFormData((prev) => ({
        ...prev,
        properties: prev.properties.map((prop) => (prop.id === id ? { ...prop, [field]: value } : prop)),
        }));
    };

    const removeProperty = (id) => {
        setFormData((prev) => ({
        ...prev,
        properties: prev.properties.filter((prop) => prop.id !== id),
        }));
    };

    // Class method methods
    const addMethod = () => {
        const newMethod = {
        id: Date.now().toString(),
        name: "",
        description: "",
        returnType: LANGUAGE_TYPES[formData.language][0],
        accessModifier: ACCESS_MODIFIERS[formData.language]?.[0] || "",
        isConstructor: false,
        parameters: [],
        };
        setFormData((prev) => ({
        ...prev,
        methods: [...prev.methods, newMethod],
        }));
    };

    const updateMethod = (id, field, value) => {
        setFormData((prev) => ({
        ...prev,
        methods: prev.methods.map((method) => (method.id === id ? { ...method, [field]: value } : method)),
        }));
    };

    const removeMethod = (id) => {
        setFormData((prev) => ({
        ...prev,
        methods: prev.methods.filter((method) => method.id !== id),
        }));
    };

    // Method parameter methods
    const addMethodParameter = (methodId) => {
        const newParam = {
        id: Date.now().toString(),
        name: "",
        type: LANGUAGE_TYPES[formData.language][0],
        description: "",
        };
        setFormData((prev) => ({
        ...prev,
        methods: prev.methods.map((method) => 
            method.id === methodId 
            ? { ...method, parameters: [...method.parameters, newParam] } 
            : method
        ),
        }));
    };

    const updateMethodParameter = (methodId, paramId, field, value) => {
        setFormData((prev) => ({
        ...prev,
        methods: prev.methods.map((method) => 
            method.id === methodId 
            ? { 
                ...method, 
                parameters: method.parameters.map((param) => 
                    param.id === paramId ? { ...param, [field]: value } : param
                ) 
                } 
            : method
        ),
        }));
    };

    const removeMethodParameter = (methodId, paramId) => {
        setFormData((prev) => ({
        ...prev,
        methods: prev.methods.map((method) => 
            method.id === methodId 
            ? { ...method, parameters: method.parameters.filter((param) => param.id !== paramId) } 
            : method
        ),
        }));
    };
    const parseResponse = (response) => {
        const snippet = response.split("######snippet######")[1];
        const usage = response.split("######usage######")[1];
        const output = response.split("######output######")[1];
        return { snippet, usage, output };
    };

    const handleGenerate = async () => {
        if (!formData.title || !formData.description) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        if (formData.type === "class" && formData.properties.length === 0 && formData.methods.length === 0) {
            toast({
                title: "Class Definition Required",
                description: "Please add at least one property or method to the class.",
                variant: "destructive",
            });
            return;
        }

        if (!apiConfig.apiKey) {
            toast({
                title: "API Key Required",
                description: "Please enter your API key to generate code.",
                variant: "destructive",
            });
            return;
        }
        setIsGenerating(true);
        try {
            const generatedItem = await apiConfig.request({
                model: apiConfig.model,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT(),
                    },
                    {
                        role: "user",
                        content: `Config: ${JSON.stringify(formData, null, 2)}`,
                    },
                ],
                apiKey: apiConfig.apiKey
            });
            const { snippet, usage, output } = parseResponse(generatedItem);
            const history = {
                id: Date.now().toString(),
                title: formData.title,
                language: formData.language,
                type: formData.type,
                description: formData.description,
                parameters: formData.parameters,
                expectedOutput: formData.expectedOutput,
                generatedCode: snippet,
                exampleUsage: usage,
                exampleOutput: output,
                createdAt: new Date(),
            };
            setHistory((prev) => [history, ...prev]);
            setSelectedItem(history);
            toast({
                title: "Code Generated Successfully",
                description: "Your code has been generated and is ready to use.",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Generation Failed",
                description: "Failed to generate code. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };
    return { 
        clearForm, 
        addParameter, 
        updateParameter, 
        removeParameter, 
        addProperty, 
        updateProperty, 
        removeProperty, 
        addMethod, 
        updateMethod, 
        removeMethod, 
        addMethodParameter, 
        updateMethodParameter, 
        removeMethodParameter, 
        handleGenerate 
    };
};