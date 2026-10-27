import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

app.get("/api/estudiantes", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de estudiantes",
    total: estudiantes.length,
    data: estudiantes,
  });
});

app.post("/api/estudiantes", function (req: Request, res: Response) {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    res.status(400).json({
      ok: false,
      mensaje: "El campo email es obligatorio",
    });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp,
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: "El alumno fue registrado con éxito!!",
    data: nuevoEstudiante,
  });
});

app.put("/api/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const estModificado = estudiantes.find((e) => e.id === idBuscando);
  if (!estModificado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con el id ${idBuscando} no existe!!!`,
    });
  }
  const { nombre, email, bootcamp } = req.body;

  estModificado.nombre = nombre;
  estModificado.email = email;
  estModificado.bootcamp = bootcamp;
  res.status(200).json({
    ok: true,
    mensaje: "El estudiante fue actualizado con éxito!!",
    data: estModificado,
  });
});

app.delete("/api/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const indice = estudiantes.findIndex((e) => e.id === idBuscando);

  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con el id ${idBuscando} no existe!!!`,
    });
  }

  const [estEliminado] = estudiantes.splice(indice, 1);

  res.status(200).json({
    ok: true,
    mensaje: "El estudiante fue eliminado con éxito!!",
    data: estEliminado,
  });
});

app.get("/api/status", (req, res) => {
  res.status(200).json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
