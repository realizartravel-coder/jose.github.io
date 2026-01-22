import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o "Concierge Digital Realizartravel", um assistente de viagens amigável, entusiasmado e profissional.
Seu objetivo é ajudar os usuários a entenderem o pacote promocional de 3 passeios (Maragogi, Santo Aleixo, Praia dos Carneiros).
Informações Importantes:
- O pacote custa R$ 499,99 (3 por 1).
- Maragogi inclui o Caminho de Moisés.
- Santo Aleixo é uma ilha vulcânica privativa.
- Praia dos Carneiros inclui o receptivo Bora Bora.
- Responda em Português do Brasil.
- Seja conciso mas muito caloroso.
- Se perguntarem sobre preços ou reservas, incentive-os a clicar no botão de WhatsApp.
`;

/**
 * Obtains a response from the Gemini model using the provided history and current message.
 * Follows the latest @google/genai SDK guidelines.
 */
export const getGeminiChatResponse = async (history: {role: 'user' | 'model', text: string}[], message: string) => {
  // Always create a new instance right before the call to ensure the latest API key is used
  // and follow initialization requirement: new GoogleGenAI({ apiKey: process.env.API_KEY })
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    // Accessing .text as a property, not a method, as per guidelines
    return response.text || "Desculpe, tive um pequeno problema técnico. Pode repetir?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ops! Estou com dificuldade de conexão agora. Que tal falar com a nossa equipe no WhatsApp?";
  }
};