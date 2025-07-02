import { useContext } from "react";
import { appContext } from "../../context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import useGeneratedCode from "../../hooks/useGeneratedCode";
import { Copy, Download, FileText, ChevronDown, Code } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function GeneratedCode() {
    const { 
        isGenerating, 
        selectedItem, 
        exportMenuOpen, 
        setExportMenuOpen 
    } = useContext(appContext);
    const { 
        exportAsMarkdown, 
        downloadCode, 
        copyToClipboard 
    } = useGeneratedCode();
    const Skeleton = ({ className }) => (
        <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
    );
    return (
        <span>
            {isGenerating? (
                <Card className="shadow-sm border-0 bg-gray-50/50 h-full">
                    <CardHeader className="pb-3 sm:pb-4">
                        <Skeleton className="h-6 w-3/4 rounded" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                        <Skeleton className="h-4 w-1/4 mb-2 rounded" />
                        <Skeleton className="h-24 w-full rounded" />
                        </div>
                        <div>
                        <Skeleton className="h-4 w-1/4 mb-2 rounded" />
                        <Skeleton className="h-16 w-full rounded" />
                        </div>
                        <div>
                        <Skeleton className="h-4 w-1/4 mb-2 rounded" />
                        <Skeleton className="h-12 w-full rounded" />
                        </div>
                    </CardContent>
                </Card>
            ) : selectedItem ? (
                <Card className="shadow-sm border-0 bg-gray-50/50 h-full">
                    <CardHeader className="pb-3 sm:pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                    {selectedItem.title}
                                    <Badge variant="secondary" className="text-xs">
                                        {selectedItem.language}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {selectedItem.type}
                                    </Badge>
                                </CardTitle>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">{selectedItem.description}</p>
                            </div>
                            <div className="flex gap-1">
                                <Button 
                                    onClick={() => copyToClipboard(selectedItem.generatedCode)} 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8"
                                >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                </Button>
                                <div className="relative">
                                <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="h-8"
                                    onClick={() => setExportMenuOpen(!exportMenuOpen)}
                                >
                                    <Download className="h-3 w-3 mr-1" />
                                        Export
                                    <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                                {exportMenuOpen && (
                                    <div className="absolute right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10">
                                    <button 
                                        onClick={() => {
                                        exportAsMarkdown();
                                        setExportMenuOpen(false);
                                        }} 
                                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Copy as Markdown
                                    </button>
                                    <button 
                                        onClick={() => {
                                        downloadCode();
                                        setExportMenuOpen(false);
                                        }} 
                                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Code
                                    </button>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <h4 className="font-medium text-xs sm:text-sm mb-2">Generated Code</h4>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-0 right-0 h-6 w-6"
                                onClick={() => copyToClipboard(selectedItem.generatedCode)}
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                            <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
                                {/* <code>{selectedItem.generatedCode}</code> */}
                                <SyntaxHighlighter language={selectedItem.language.toLowerCase()} style={oneDark}>
                                    {selectedItem.generatedCode}
                                </SyntaxHighlighter>
                            </pre>
                        </div>

                        <div className="relative">
                            <h4 className="font-medium text-xs sm:text-sm mb-2">Example Usage</h4>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-0 right-0 h-6 w-6"
                                onClick={() => copyToClipboard(selectedItem.exampleUsage)}
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                            <pre className="bg-blue-50 text-blue-900 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{selectedItem.exampleUsage}</code>
                            </pre>
                        </div>

                        <div className="relative">
                            <h4 className="font-medium text-xs sm:text-sm mb-2">Example Output</h4>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-0 right-0 h-6 w-6"
                                onClick={() => copyToClipboard(selectedItem.exampleOutput)}
                            >
                                <Copy className="h-3 w-3" />
                            </Button>
                            <pre className="bg-green-50 text-green-900 p-3 rounded-lg text-xs overflow-x-auto">
                                <code>{selectedItem.exampleOutput}</code>
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="shadow-sm border-0 bg-gray-50/50 h-full">
                    <CardContent className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <Code className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="font-medium text-gray-600 mb-1 text-sm sm:text-base">No Code Generated</h3>
                            <p className="text-xs sm:text-sm text-gray-500">Fill out the form and generate code to see preview</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </span>
    );
}