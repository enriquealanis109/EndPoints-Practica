import { Router } from "express";
import type { Request, Response } from "express";

const router: Router = Router();

interface Estudiante {
  id: number;
  name: string;
  email: string;
  bootcamp: string;
}
const estudiantes: Estudiante[] = [];
let siguienteId = 1;

router.get("/", function (req: Request, res: Response) {
  // #swagger.description = 'Obtiene la lista de estudiantes'

  const bootcamp = req.query.bootcamp;

  let resultado: Estudiante[] = estudiantes;

  if (bootcamp) {
    resultado = estudiantes.filter((e) => e.bootcamp === bootcamp);
  }
  res.status(200).json(resultado);
});

router.get("/:id", function (req: Request, res: Response) {
  // #swagger.description = 'Obtiene la lista de estudiantes por id'
  const idBuscando = Number(req.params.id);
  const estEncontrado = estudiantes.find((e) => e.id === idBuscando);

  if (!estEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con el id ${idBuscando} no existe!!!`,
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: "Estudiante encontrado",
    data: estEncontrado,
  });
});

router.post("/", function (req: Request, res: Response) {
  const { name, email, bootcamp } = req.body;
  // #swagger.description = 'Crea un nuevo estudiante'

  if (!email) {
    res.status(400).json({
      ok: false,
      mensaje: "El campo email es obligatorio",
    });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: siguienteId++,
    name,
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

router.put("/:id", function (req: Request, res: Response) {
  // #swagger.description = 'Actualiza un estudiante'
  /* #swagger.parameters['body'] = {
        in: 'body',
        schema: { name: 'Ana López', email: 'ana@mail.com', bootcamp: 'Fullstack' }
  } */
  const idBuscando = Number(req.params.id);
  const estModificado = estudiantes.find((e) => e.id === idBuscando);
  if (!estModificado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con el id ${idBuscando} no existe!!!`,
    });
  }
  const { name, email, bootcamp } = req.body;

  estModificado.name = name;
  estModificado.email = email;
  estModificado.bootcamp = bootcamp;
  res.status(200).json({
    ok: true,
    mensaje: "El estudiante fue actualizado con éxito!!",
    data: estModificado,
  });
});

router.delete("/:id", function (req: Request, res: Response) {
  // #swagger.description = 'Elimina un estudiante'

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

export default router;
