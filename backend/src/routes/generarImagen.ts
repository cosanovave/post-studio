import { Router } from "express";

export const generarImagenRouter = Router();

/**
 * Placeholder: la generación real con OpenAI/Stability es de pago,
 * queda deshabilitada hasta que el usuario decida activarla y
 * configure OPENAI_API_KEY o STABILITY_API_KEY.
 */
generarImagenRouter.post("/", async (req, res) => {
  const prompt = String(req.body?.prompt ?? "").trim();
  if (!prompt) {
    return res.status(400).json({ error: "Falta el prompt de la imagen" });
  }

  const apiKeyConfigurada = process.env.OPENAI_API_KEY || process.env.STABILITY_API_KEY;
  if (!apiKeyConfigurada) {
    return res.status(503).json({
      error:
        "Generación de imágenes con IA no configurada. Es un servicio de pago; " +
        "configura OPENAI_API_KEY o STABILITY_API_KEY para activarla.",
      mock: true,
    });
  }

  // TODO: integrar llamada real a la API elegida cuando el usuario active esta función.
  res.status(501).json({ error: "Integración pendiente de implementar" });
});
