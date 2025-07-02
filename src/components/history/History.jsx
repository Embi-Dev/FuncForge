import { Card, CardHeader, CardContent, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Trash2 } from "lucide-react"
import { Badge } from "../ui/Badge"
import { Copy } from "lucide-react"
import { Code } from "lucide-react"
import useHistory from "../../hooks/useHistory"
import { useContext } from "react"
import { appContext } from "../../context/AppContext"
import useGeneratedCode from "../../hooks/useGeneratedCode"

export default function History () {
    const { clearHistory, loadHistoryItem, getLanguageIcon } = useHistory();
    const { history, selectedItem } = useContext(appContext);
    const { copyToClipboard } = useGeneratedCode();
    return (
        <Card className="shadow-sm border-0 bg-gray-50/50 h-full max-h-[calc(100vh-15rem)] overflow-y-auto">
            <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg">History ({history.length})</CardTitle>
                    {history.length > 0 && (
                        <Button 
                            onClick={clearHistory} 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 h-8"
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {history.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Code className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">No history yet</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                            selectedItem?.id === item.id
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => loadHistoryItem(item)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <div className="bg-gray-100 w-6 h-6 rounded flex items-center justify-center text-xs font-medium">
                                        {getLanguageIcon(item.language)}
                                    </div>
                                    <h4 className="font-medium text-xs sm:text-sm truncate">{item.title}</h4>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                        {item.language}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0">
                                        {item.type}
                                    </Badge>
                                    <span className="text-xs text-gray-500">{item.createdAt.toLocaleDateString()}</span>
                                </div>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    copyToClipboard(item.generatedCode)
                                }}
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 ml-2"
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                ))}
                </div>
            )}
            </CardContent>
        </Card>
    )
}