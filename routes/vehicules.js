import { Router } from "express";

const router = Router();

let vehicles = [
    {
        id: 1,
        marque: "Dacia",
        model: "Logan",
        immatriculation: "12345-A-6",
        disponible: true,
    },
    {
        id: 2,
        marque: "Renault",
        model: "Clio",
        immatriculation: "67890-B-6",
        disponible: false,
    },
    {
        id: 3,
        marque: "Peugeot",
        model: "208",
        immatriculation: "24680-D-1",
        disponible: true,
    },
];

router.get("/", (req, res) => {
    if (req.query.disponible === "true") {
        return res.status(200).json(
            vehicles.filter((vehicle) => vehicle.disponible === true),
        );
    }

    return res.status(200).json(vehicles);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find((item) => item.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
});

router.post("/", (req, res) => {
    const marque = req.body.marque;
    const model = req.body.model ?? req.body.modele;
    const immatriculation = req.body.immatriculation;

    if (
        typeof marque !== "string" ||
        marque.trim() === "" ||
        typeof model !== "string" ||
        model.trim() === "" ||
        typeof immatriculation !== "string" ||
        immatriculation.trim() === ""
    ) {
        return res.status(400).json({
            error: "marque, model and immatriculation are required",
        });
    }

    const id =
        vehicles.length === 0
            ? 1
            : Math.max(...vehicles.map((vehicle) => vehicle.id)) + 1;

    const vehicle = {
        id,
        marque: marque.trim(),
        model: model.trim(),
        immatriculation: immatriculation.trim(),
        disponible: true,
    };

    vehicles.push(vehicle);
    return res.status(201).json(vehicle);
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicle = vehicles.find((item) => item.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    const allowedFields = ["marque", "model", "modele", "immatriculation", "disponible"];

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(req.body, field)) {
            if (field === "modele") {
                vehicle.model = req.body[field];
            } else {
                vehicle[field] = req.body[field];
            }
        }
    }

    return res.status(200).json(vehicle);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = vehicles.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    vehicles.splice(index, 1);
    return res.status(204).send();
});

export default router;