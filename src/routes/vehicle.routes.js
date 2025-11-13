// routes/vehicle.routes.js
import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// GET /api/vehicles  (with filters)
router.get("/", async (req, res) => {
  try {
    const {
      category,
      location,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      userEmail,
      limit,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (userEmail) query.userEmail = userEmail;

    if (location) {
      query.location = new RegExp(location, "i"); // case-insensitive
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    let cursor = Vehicle.find(query).sort(sort);
    if (limit) cursor = cursor.limit(Number(limit));

    const vehicles = await cursor.exec();

    res.json({ items: vehicles, total: vehicles.length });
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
});

// GET /api/vehicles/latest
router.get("/latest", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(vehicles);
  } catch (err) {
    console.error("Error fetching latest vehicles:", err);
    res.status(500).json({ message: "Failed to fetch latest vehicles" });
  }
});

// GET /api/vehicles/top?by=booked|rating&limit=3
router.get("/top", async (req, res) => {
  try {
    const by = req.query.by || "booked"; // 'booked' | 'rating'
    const limit = parseInt(req.query.limit, 10) || 3;

    const sortStage =
      by === "rating"
        ? { rating: -1, createdAt: -1 }
        : { totalBookings: -1, createdAt: -1 };

    const vehicles = await Vehicle.find({}).sort(sortStage).limit(limit);

    res.json(vehicles);
  } catch (err) {
    console.error("Error fetching top vehicles:", err);
    res.status(500).json({ message: "Failed to fetch top vehicles" });
  }
});

// GET /api/vehicles/:id
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    console.error("Error fetching vehicle:", err);
    res.status(500).json({ message: "Failed to fetch vehicle" });
  }
});

// POST /api/vehicles
router.post("/", async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error("Error creating vehicle:", err);
    res.status(400).json({ message: "Failed to create vehicle" });
  }
});

// PATCH /api/vehicles/:id
router.patch("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    console.error("Error updating vehicle:", err);
    res.status(400).json({ message: "Failed to update vehicle" });
  }
});

// DELETE /api/vehicles/:id
router.delete("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    res.status(400).json({ message: "Failed to delete vehicle" });
  }
});

export default router;
