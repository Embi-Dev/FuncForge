export const initialFormState = {
    type: "function",
    language: "JavaScript",
    title: "",
    description: "",
    expectedOutput: "string",
    parameters: [],
    // Class specific
    properties: [],
    methods: [],
    classExtends: "",
    classImplements: "",
};


export const PROGRAMMING_LANGUAGES = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "C++",
];

export const AI_PROVIDERS = [
    {
        id: "openai",
        name: "OpenAI",
        models: [
            "gpt-4o",
            "gpt-4-turbo",
            "gpt-4",
            "gpt-3.5-turbo-0125",
            "gpt-3.5-turbo-instruct",
            "gpt-3.5-turbo-16k",
            "gpt-4-vision-preview"
        ],
        request: async ({ model, messages, apiKey }) => {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({ model, messages })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        }
    },
    {
        id: "anthropic",
        name: "Anthropic",
        models: [
            "claude-3-opus-20240229",
            "claude-3-sonnet-20240229",
            "claude-3-haiku-20240307",
            "claude-2.1",
            "claude-2.0",
            "claude-instant-1.2"
        ],
        request: async ({ model, messages, apiKey }) => {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({ model, messages, max_tokens: 1000 })
            });
            const data = await response.json();
            return data.content[0].text;
        }
    },
    {
        id: "groq",
        name: "Groq",
        models: [
            "llama3-70b-8192",
            "llama3-8b-8192",
            "mixtral-8x7b-32768",
            "gemma-7b-it"
        ],
        request: async ({ model, messages, apiKey }) => {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({ model, messages })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        }
    },
    {
        id: "mistral",
        name: "Mistral",
        models: [
            "mistral-tiny",
            "mistral-small",
            "mistral-medium",
            "mistral-large-latest",
            "open-mistral-7b",
            "open-mixtral-8x7b"
        ],
        request: async ({ model, messages, apiKey }) => {
            const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({ model, messages })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        }
    },
    {
        id: "deepseek",
        name: "DeepSeek",
        models: [
            "deepseek-chat",
            "deepseek-coder",
            "deepseek-chat:1",
            "deepseek-coder:1",
            "deepseek-coder:33b"
        ],
        request: async ({ model, messages, apiKey }) => {
            const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model,
                    messages,
                    temperature: 0.7,
                    max_tokens: 4000,
                    frequency_penalty: 0
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`DeepSeek API error: ${error.error?.message || response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        }
    }
];

export const LANGUAGE_TYPES = {
    JavaScript: ["string", "number", "boolean", "object", "array", "function", "undefined", "null"],
    TypeScript: ["string", "number", "boolean", "object", "array", "function", "any", "void", "never"],
    Python: ["str", "int", "float", "bool", "list", "dict", "tuple", "set", "None"],
    Java: ["String", "int", "double", "boolean", "List<T>", "Map<K,V>", "Object", "void"],
    "C#": ["string", "int", "double", "bool", "List<T>", "Dictionary<K,V>", "object", "void"],
    Go: ["string", "int", "float64", "bool", "[]T", "map[K]V", "interface{}", "error"],
    Rust: ["String", "i32", "f64", "bool", "Vec<T>", "HashMap<K,V>", "Option<T>", "Result<T,E>"],
    PHP: ["string", "int", "float", "bool", "array", "object", "null", "mixed"],
    Ruby: ["String", "Integer", "Float", "Boolean", "Array", "Hash", "Object", "nil"],
    Swift: ["String", "Int", "Double", "Bool", "Array<T>", "Dictionary<K,V>", "Any", "Void"],
    Kotlin: ["String", "Int", "Double", "Boolean", "List<T>", "Map<K,V>", "Any", "Unit"],
    "C++": ["string", "int", "double", "bool", "vector<T>", "map<K,V>", "void", "auto"],
};

// Class-specific configurations
export const CLASS_CONFIG = {
    JavaScript: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "",
        inheritance: "extends",
        implements: "implements"
    },
    TypeScript: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "",
        inheritance: "extends",
        implements: "implements"
    },
    Python: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "def",
        inheritance: "",
        implements: ""
    },
    Java: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "",
        inheritance: "extends",
        implements: "implements"
    },
    "C#": {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "",
        inheritance: ":",
        implements: ":"
    },
    Go: {
        keyword: "type",
        propertyKeyword: "",
        methodKeyword: "func",
        inheritance: "",
        implements: ""
    },
    Rust: {
        keyword: "struct",
        propertyKeyword: "",
        methodKeyword: "fn",
        inheritance: "",
        implements: ""
    },
    PHP: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "function",
        inheritance: "extends",
        implements: "implements"
    },
    Ruby: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "def",
        inheritance: "<",
        implements: ""
    },
    Swift: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "func",
        inheritance: ":",
        implements: ""
    },
    Kotlin: {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "fun",
        inheritance: ":",
        implements: ""
    },
    "C++": {
        keyword: "class",
        propertyKeyword: "",
        methodKeyword: "",
        inheritance: ":",
        implements: ""
    }
};

export const ACCESS_MODIFIERS = {
    JavaScript: ["public", "private", "protected"],
    TypeScript: ["public", "private", "protected", "readonly"],
    Python: ["public", "private"],
    Java: ["public", "private", "protected", "static", "final"],
    "C#": ["public", "private", "protected", "internal", "static", "readonly"],
    Go: ["public", "private"],
    Rust: ["pub", "pub(crate)"],
    PHP: ["public", "private", "protected", "static"],
    Ruby: ["public", "private", "protected"],
    Swift: ["open", "public", "internal", "fileprivate", "private"],
    Kotlin: ["public", "private", "protected", "internal"],
    "C++": ["public", "private", "protected"]
};


export const SYSTEM_PROMPT = () => {
    return `You are an expert programming assistant specialized in generating production-ready code. Strictly follow these rules:
  
  1. **Output Format** (MUST use exact delimiters):
     ######snippet######
     <LANGUAGE-SPECIFIC CODE>
     ######snippet######
     ######usage######
     <SAMPLE USAGE CODE>
     ######usage######
     ######output######
     <EXPECTED OUTPUT>
     ######output######
  
  2. **Snippet Requirements**:
     - Implement exactly what the user requested
     - Include comprehensive documentation
     - Handle edge cases and errors
     - Follow language idioms and best practices
     - Add necessary imports/requires
     - Use self-descriptive identifiers
  
  3. **Usage Requirements**:
     - Show 3 executable usage scenarios: 
       1. Basic normal case
       2. Edge case
       3. Error handling
     - Include all required setup (imports, object creation)
     - For classes: demonstrate instantiation and method calls
  
  4. **Output Requirements**:
     - Show exact expected outputs for each usage scenario
     - Format outputs as they would appear in console/terminal
     - Clearly separate outputs from different scenarios
     - Include error messages where applicable
  
  5. **Prohibited**:
     - Placeholder comments ("TODO", "implement later")
     - Any markdown except required delimiters
     - Code outside the delimited sections
     - Mixing usage code and output text
  
  Example for Python function:
  ######snippet######
  def calculate_discounted_price(price: float, discount: float) -> float:
      """Calculate final price after discount
      
      Args:
          price: Original price (must be > 0)
          discount: Discount percentage (0-100)
          
      Returns:
          Discounted price rounded to 2 decimals
          
      Raises:
          ValueError: For invalid inputs
      """
      if price <= 0:
          raise ValueError("Price must be positive")
      if discount < 0 or discount > 100:
          raise ValueError("Discount must be 0-100")
      
      discounted = price * (1 - discount/100)
      return round(discounted, 2)
  ######snippet######
  ######usage######
  # Basic case
  print(calculate_discounted_price(100.0, 20.0))
  
  # Edge case (zero discount)
  print(calculate_discounted_price(50.0, 0.0))
  
  # Error handling
  try:
      calculate_discounted_price(-10.0, 15.0)
  except ValueError as e:
      print(e)
  ######usage######
  ######output######
  80.0
  50.0
  Price must be positive
  ######output######
  `;
}

