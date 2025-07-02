
export default function useGeneratedCode() {
    const exportAsMarkdown = () => {
        if (!selectedItem) return;
        
        const markdownContent = `# ${selectedItem.title}
        
    **Language**: ${selectedItem.language}  
    **Description**: ${selectedItem.description}
    
    \`\`\`${selectedItem.language.toLowerCase()}
    ${selectedItem.generatedCode}
    \`\`\`
    
    ## Example Usage
    \`\`\`${selectedItem.language.toLowerCase()}
    ${selectedItem.exampleUsage}
    \`\`\`
    
    ## Example Output
    \`\`\`
    ${selectedItem.exampleOutput}
    \`\`\`
    `;
    
        copyToClipboard(markdownContent);
        toast({
          title: "Copied as Markdown!",
          description: "Code documentation copied to clipboard",
        });
    };
    
    const downloadCode = () => {
        if (!selectedItem) return;
        
        const fileExtension = {
            JavaScript: "js",
            TypeScript: "ts",
            Python: "py",
            Java: "java",
            "C#": "cs",
            Go: "go",
            Rust: "rs",
            PHP: "php",
            Ruby: "rb",
            Swift: "swift",
            Kotlin: "kt",
            "C++": "cpp",
        }[selectedItem.language] || "txt";
    
        const blob = new Blob([selectedItem.generatedCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedItem.title.replace(/\s+/g, "_")}.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
        title: "Copied!",
        description: "Code copied to clipboard.",
        });
    };
    
    return { exportAsMarkdown, downloadCode, copyToClipboard };
}
