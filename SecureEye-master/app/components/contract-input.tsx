import React, { useRef } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism-tomorrow.css"; // Import a Prism theme for styling
import { IconChecklist, IconPaperclip } from "@tabler/icons-react";

interface CustomCodeEditorProps {
  contract: string;
  setContract: React.Dispatch<React.SetStateAction<string>>;
  analyze: () => Promise<void>;
}

const highlightWithPrism = (code: string) => {
  return Prism.highlight(code, Prism.languages.solidity, "solidity");
};

// Utility function to check if the contract contains the required SPDX license and pragma directive
const isValidSolidityContract = (code: string) => {
  const SPDXRegex = /\/\/\s*SPDX-License-Identifier:\s*[^\s]+/;
  const pragmaRegex = /pragma\s+solidity\s+[^;]+;/;
  return SPDXRegex.test(code) && pragmaRegex.test(code);
};

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
  contract,
  setContract,
  analyze,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = () => {
    if (!isValidSolidityContract(contract)) {
      alert(
        "The provided code does not appear to be a valid Solidity smart contract. Make sure it starts with the SPDX license identifier and the 'pragma' directive."
      );
      return;
    }
    analyze();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.sol')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setContract(content);
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a Solidity file (.sol)");
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full mx-auto">
      <div
        className="border outline-none border-gray-300 rounded-2xl p-6 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200"
        style={{ height: "450px", overflowY: "auto" }}
      >
        <Editor
          value={contract}
          onValueChange={setContract}
          highlight={highlightWithPrism}
          padding={15}
          textareaId="code-editor"
          className="textarea-editor"
          textareaClassName="outline-none w-full h-full font-mono"
          style={{
            fontFamily: '"Fira Mono", monospace',
            fontSize: 16,
            minHeight: "100%",
            background: "transparent",
            color: "inherit",
          }}
        />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-2 bg-white dark:bg-neutral-900 rounded-b-2xl">
        <div className="flex justify-between items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".sol"
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileUpload}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-500 dark:hover:text-blue-500"
          >
            <IconPaperclip />
          </button>
          <button
            onClick={handleAnalyze}
            type="button"
            className="flex items-center space-x-2 px-6 py-1.5 rounded-full text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Audit</span>
            <IconChecklist size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCodeEditor;