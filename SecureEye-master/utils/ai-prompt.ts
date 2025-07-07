import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(apiKey);

export const analyzeContract = async (
  contract: string,
  setResults: any,
  setLoading: any,
  auditSmartContract: any
) => {
  setLoading(true);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.

  Please provide the results in the following array format for easy front-end display:

  [
    {
      "section": "Audit Report",
      "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
    },
    {
      "section": "Metric Scores",
      "details": [
        {
          "metric": "Security",
          "score": 0-10
        },
        {
          "metric": "Performance",
          "score": 0-10
        },
        {
          "metric": "Other Key Areas",
          "score": 0-10
        },
        {
          "metric": "Gas Efficiency",
          "score": 0-10
        },
        {
          "metric": "Code Quality",
          "score": 0-10
        },
        {
          "metric": "Documentation",
          "score": 0-10
        }
      ]
    },
    {
      "section": "Suggestions for Improvement",
      "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
    }
  ]
  
  Thank you.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const auditResults = JSON.parse(text);
  setResults(auditResults);
  setLoading(false);
};

export const fixIssues = async (
  contract: string,
  suggestions: string,
  setContract: (contract: string) => void,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Here is the smart contract with the following issues: ${suggestions}. Please provide a fixed version of the contract:\n\n${contract}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const fixedContract = response.text();

  setContract(fixedContract.trim());
  setLoading(false);
};