// pages/api/revalidate.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Chequea la palabra secreta para asegurar que es una request valida
  if (req.headers.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: "Token incorrecta" });
  }

  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    // Si hubo un error, next va a mostrar la ultima página
    // que pudo generar sin errores
    return res.status(500).send("Error revalidating");
  }
}
