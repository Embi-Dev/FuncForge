import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, CustomDropdown } from "../ui/Select";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import useGenerateForm from "../../hooks/useGenerateForm";
import { appContext } from "../../context/AppContext";
import { useContext } from "react";
import { PROGRAMMING_LANGUAGES, LANGUAGE_TYPES, ACCESS_MODIFIERS } from "../../constants";


export default function GenerateForm() {
  const { 
    clearForm, 
    addProperty, 
    addMethod, 
    addParameter, 
    handleGenerate,
    removeProperty,
    removeMethod,
    removeParameter,
    updateProperty,
    updateMethod,
    updateParameter 
  } = useGenerateForm();
  const { 
    formData, 
    setFormData, 
    isGenerating 
  } = useContext(appContext);
  
  return (
    <Card className="shadow-sm border-0 bg-gray-50/50">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base sm:text-lg">Code Generation</CardTitle>
          <Button 
            onClick={clearForm}
            size="sm" 
            variant="outline"
            className="text-xs sm:text-sm h-8"
          >
            Clear Form
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs sm:text-sm font-medium">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="mt-1 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[1000] max-h-60 overflow-y-auto" position="popper">
                <SelectItem value="function" className="text-xs sm:text-sm">Function</SelectItem>
                <SelectItem value="method" className="text-xs sm:text-sm">Method</SelectItem>
                <SelectItem value="class" className="text-xs sm:text-sm">Class</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs sm:text-sm font-medium">Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => {
                const languageTypes = LANGUAGE_TYPES[value] || [];
                const accessModifiers = ACCESS_MODIFIERS[value] || [];
                
                setFormData((prev) => ({
                  ...prev,
                  language: value,
                  expectedOutput: languageTypes[0] || "string",
                  parameters: prev.parameters.map((param) => ({
                    ...param,
                    type: languageTypes[0] || param.type
                  })),
                  properties: prev.properties.map((prop) => ({
                    ...prop,
                    type: languageTypes[0] || prop.type,
                    accessModifier: accessModifiers[0] || ""
                  })),
                  methods: prev.methods.map((method) => ({
                    ...method,
                    returnType: languageTypes[0] || method.returnType,
                    accessModifier: accessModifiers[0] || "",
                    parameters: method.parameters.map((param) => ({
                      ...param,
                      type: languageTypes[0] || param.type
                    }))
                  }))
                }));
              }}
            >
              <SelectTrigger className="mt-1 text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[1000] max-h-60 overflow-y-auto" position="popper">
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-xs sm:text-sm">
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-xs sm:text-sm font-medium">
            {formData.type === "class" ? "Class Name" : formData.type === "method" ? "Method Name" : "Function Name"}
          </Label>
          <Input
            placeholder={formData.type === "class" ? "e.g., User" : "e.g., calculateTotal"}
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="mt-1 text-xs sm:text-sm"
          />
        </div>

        <div>
          <Label className="text-xs sm:text-sm font-medium">Description</Label>
          <Textarea
            placeholder="Describe what this should do..."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="mt-1 resize-none text-xs sm:text-sm"
          />
        </div>

        {formData.type === "class" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs sm:text-sm font-medium">Extends</Label>
                <Input
                  placeholder="Parent class"
                  value={formData.classExtends}
                  onChange={(e) => setFormData((prev) => ({ ...prev, classExtends: e.target.value }))}
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
              <div>
                <Label className="text-xs sm:text-sm font-medium">Implements</Label>
                <Input
                  placeholder="Interface(s)"
                  value={formData.classImplements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, classImplements: e.target.value }))}
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs sm:text-sm font-medium">Properties</Label>
                <Button 
                  onClick={addProperty} 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs sm:text-sm"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Property
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {formData.properties.map((prop) => (
                  <div key={prop.id} className="grid grid-cols-12 gap-2 p-2 bg-white rounded-lg border items-center">
                    <div className="col-span-3">
                      <CustomDropdown
                        options={ACCESS_MODIFIERS[formData.language] || []}
                        value={prop.accessModifier}
                        onChange={(value) => updateProperty(prop.id, "accessModifier", value)}
                        placeholder="Access"
                      />
                    </div>
                    <Input
                      placeholder="Name"
                      value={prop.name}
                      onChange={(e) => updateProperty(prop.id, "name", e.target.value)}
                      className="col-span-3 h-8 text-xs sm:text-sm"
                    />
                    <div className="col-span-4">
                      <CustomDropdown
                        options={LANGUAGE_TYPES[formData.language] || []}
                        value={prop.type}
                        onChange={(value) => updateProperty(prop.id, "type", value)}
                        placeholder="Type"
                      />
                    </div>
                    <Button
                      onClick={() => removeProperty(prop.id)}
                      size="sm"
                      variant="ghost"
                      className="col-span-1 h-10 w-10 p-0 text-red-500 hover:text-red-700 flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs sm:text-sm font-medium">Methods</Label>
                <Button 
                  onClick={addMethod} 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs sm:text-sm"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Method
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {formData.methods.map((method) => (
                  <div key={method.id} className="p-3 bg-white rounded-lg border">
                    <div className="grid grid-cols-12 gap-2 mb-3">
                      <div className="col-span-3">
                        <CustomDropdown
                          options={ACCESS_MODIFIERS[formData.language] || []}
                          value={method.accessModifier}
                          onChange={(value) => updateMethod(method.id, "accessModifier", value)}
                          placeholder="Access"
                        />
                      </div>
                      <Input
                        placeholder="Method name"
                        value={method.name}
                        onChange={(e) => updateMethod(method.id, "name", e.target.value)}
                        className="col-span-5 h-8 text-xs sm:text-sm"
                      />
                      <div className="col-span-3">
                        <CustomDropdown
                          options={LANGUAGE_TYPES[formData.language] || []}
                          value={method.returnType}
                          onChange={(value) => updateMethod(method.id, "returnType", value)}
                          placeholder="Return Type"
                        />
                      </div>
                      <Button
                        onClick={() => removeMethod(method.id)}
                        size="sm"
                        variant="ghost"
                        className="col-span-1 h-10 w-10 p-0 text-red-500 hover:text-red-700 flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mb-3">
                      <Textarea
                        placeholder="Method description"
                        value={method.description}
                        onChange={(e) => updateMethod(method.id, "description", e.target.value)}
                        className="text-xs sm:text-sm"
                        rows={1}
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs sm:text-sm font-medium">Parameters</Label>
                      <Button 
                        onClick={() => addParameter(method.id)} 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Parameter
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {method.parameters.map((param) => (
                        <div key={param.id} className="grid grid-cols-12 gap-2 p-2 bg-gray-50 rounded-lg">
                          <Input
                            placeholder="Name"
                            value={param.name}
                            onChange={(e) => updateParameter(param.id, "name", e.target.value)}
                            className="col-span-4 h-8 text-xs sm:text-sm"
                          />
                          <div className="col-span-5">
                            <CustomDropdown
                              options={LANGUAGE_TYPES[formData.language] || []}
                              value={param.type}
                              onChange={(value) => updateParameter(param.id, "type", value)}
                              placeholder="Type"
                            />
                          </div>
                          <Button
                            onClick={() => removeParameter(param.id)}
                            size="sm"
                            variant="ghost"
                            className="col-span-1 h-10 w-10 p-0 text-red-500 hover:text-red-700 flex items-center justify-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {(formData.type === "function" || formData.type === "method") && (
          <>
            <div>
              <Label className="text-xs sm:text-sm font-medium">Return Type</Label>
              <Select
                value={formData.expectedOutput}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, expectedOutput: value }))}
              >
                <SelectTrigger className="mt-1 text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[1000] max-h-60 overflow-y-auto" position="popper">
                  {LANGUAGE_TYPES[formData.language]?.map((type) => (
                    <SelectItem key={type} value={type} className="text-xs sm:text-sm">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs sm:text-sm font-medium">Parameters</Label>
                <Button 
                  onClick={addParameter} 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs sm:text-sm"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Parameter
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {formData.parameters.map((param) => (
                  <div key={param.id} className="grid grid-cols-12 gap-2 p-2 bg-white rounded-lg border items-center">
                    <Input
                      placeholder="Name"
                      value={param.name}
                      onChange={(e) => updateParameter(param.id, "name", e.target.value)}
                      className="col-span-4 h-8 text-xs sm:text-sm"
                    />
                    <div className="col-span-4">
                      <CustomDropdown
                        options={LANGUAGE_TYPES[formData.language] || []}
                        value={param.type}
                        onChange={(value) => updateParameter(param.id, "type", value)}
                        placeholder="Type"
                      />
                    </div>
                    <Input
                      placeholder="Description"
                      value={param.description}
                      onChange={(e) => updateParameter(param.id, "description", e.target.value)}
                      className="col-span-3 h-8 text-xs sm:text-sm"
                    />
                    <Button
                      onClick={() => removeParameter(param.id)}
                      size="sm"
                      variant="ghost"
                      className="col-span-1 h-10 w-10 p-0 text-red-500 hover:text-red-700 flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleGenerate} 
            className="flex-1 text-xs sm:text-sm" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Generate Code
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}