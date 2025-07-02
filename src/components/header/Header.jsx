import { useContext, useEffect, useState } from "react"
import { appContext } from "../../context/AppContext"
import { Button } from "../ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { Input } from "../ui/Input"
import { Sparkles, Coffee, Github, Mail, Eye, EyeOff, Save, AlertTriangle } from "lucide-react"
import { AI_PROVIDERS } from "../../constants"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/Alert"

export default function Header() {
    const { apiConfig, setIsFeedbackModalOpen, showApiKey, setShowApiKey, setApiConfig } = useContext(appContext)
    const selectedProvider = AI_PROVIDERS.find((p) => p.id === apiConfig.provider)
    const [saveConfigDialogOpen, setSaveConfigDialogOpen] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    // Handle scroll to hide header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [prevScrollPos])
    useEffect(() => {
        const savedConfig = localStorage.getItem('apiConfig')
        if (savedConfig) {
            const request = AI_PROVIDERS.find((p) => p.id === JSON.parse(savedConfig).provider)?.request
            if (request){
                setApiConfig({...JSON.parse(savedConfig), request})
            }
        }
    }, [])
    const handleSaveConfig = (newConfig) => {
        localStorage.setItem('apiConfig', JSON.stringify(newConfig));
        setSaveConfigDialogOpen(false);
    }
    const handleConfigChange = (newConfig) => {
        if(apiConfig.saveToLocalStorage){
            handleSaveConfig(newConfig)
        }
        setApiConfig(newConfig)
    }

    return (
        <div className={`border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            <AlertDialog open={saveConfigDialogOpen} onOpenChange={setSaveConfigDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Security Warning
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Storing your API key in local storage may expose it to potential security risks. 
                            Are you sure you want to save your configuration locally?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSaveConfigDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => {
                                handleConfigChange({ ...apiConfig, saveToLocalStorage: true })
                                handleSaveConfig({ ...apiConfig, saveToLocalStorage: true })
                            }}
                            className="bg-amber-600 hover:bg-amber-700"
                        >
                            Save Configuration
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col gap-3">
                    {/* Top Row: Logo and Buttons */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                {/* <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" /> */}
                                <img src="funcforge.svg" alt="" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FuncForge</h1>
                                <p className="text-xs sm:text-sm text-gray-600">Generate well-documented functions and classes with AI</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex gap-2">
                                <Button 
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs sm:text-sm"
                                >
                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Feedback
                                </Button>
                                <Button 
                                    asChild
                                    size="sm"
                                    className="h-8 text-xs sm:text-sm bg-amber-600 hover:bg-amber-700"
                                >
                                    <a href={import.meta.env.VITE_BUY_ME_COFFEE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                        <Coffee className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                        Buy Me Coffee
                                    </a>
                                </Button>
                                <Button 
                                    onClick={() => window.open("https://github.com/Embi-Dev/FuncForge.git", "_blank")}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-xs sm:text-sm"
                                >
                                    <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    GitHub
                                </Button>
                            </div>
                            <div className="flex sm:hidden gap-2">
                                <Button 
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <Mail className="h-4 w-4" />
                                </Button>
                                <Button 
                                    asChild
                                    size="icon"
                                    className="h-8 w-8 bg-amber-600 hover:bg-amber-700"
                                >
                                    <a href={import.meta.env.VITE_BUY_ME_COFFEE_URL} target="_blank" rel="noopener noreferrer">
                                        <Coffee className="h-4 w-4" />
                                    </a>
                                </Button>
                                <Button 
                                    onClick={() => window.open("https://github.com", "_blank")}
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <Github className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <div className="flex gap-2 flex-wrap">
                            <Select
                                value={apiConfig.provider}
                                onValueChange={(value) =>
                                    handleConfigChange({
                                        ...apiConfig,
                                        provider: value,
                                        request: AI_PROVIDERS.find((p) => p.id === value)?.request,
                                        model: AI_PROVIDERS.find((p) => p.id === value)?.models[0] || "",
                                    })
                                }
                            >
                                <SelectTrigger className="w-full sm:w-32 text-xs sm:text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="z-[1000] max-h-60 overflow-y-auto">
                                    {AI_PROVIDERS.map((provider) => (
                                        <SelectItem key={provider.id} value={provider.id} className="text-xs sm:text-sm">
                                            {provider.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={apiConfig.model}
                                onValueChange={(value) => handleConfigChange({ ...apiConfig, model: value })}
                            >
                                <SelectTrigger className="w-full sm:w-48 text-xs sm:text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="z-[1000] max-h-60 overflow-y-auto">
                                    {selectedProvider?.models.map((model) => (
                                        <SelectItem key={model} value={model} className="text-xs sm:text-sm">
                                            {model}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="relative flex-1">
                            <Input
                                type={showApiKey ? "text" : "password"}
                                placeholder="API Key"
                                value={apiConfig.apiKey}
                                onChange={(e) => handleConfigChange({ ...apiConfig, apiKey: e.target.value })}
                                className="w-full pr-10 text-xs sm:text-sm"
                            />
                            <div className="absolute right-0 top-0 flex h-full">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-full px-3"
                                    onClick={() => setShowApiKey(!showApiKey)}
                                >
                                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <Button
                            variant={apiConfig.saveToLocalStorage ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                if (!apiConfig.saveToLocalStorage) {
                                    setSaveConfigDialogOpen(true)
                                } else {
                                    localStorage.removeItem('apiConfig')
                                    handleConfigChange({ ...apiConfig, saveToLocalStorage: false })
                                }
                            }}
                            className="h-10 text-xs sm:text-sm"
                        >
                            <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {apiConfig.saveToLocalStorage ? "Config Saved" : "Save Config"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}