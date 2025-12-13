import carService from "../services/car.service.js";

export default {
  async create(req, res, next) {
    try {
      const car = await carService.createCar(req.body, req.user.userId);
      res.status(201).json(car);
    } catch (error) {
      next(error);
    }
  },

  async listAvailable(req, res, next) {
    try {
      const cars = await carService.listAvailableCars();
      res.json(cars);
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      const car = await carService.getCar(req.params.id);
      res.json(car);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const car = await carService.updateCar(req.params.id, req.body);
      res.json(car);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      await carService.removeCar(req.params.id);
      res.status(200).json({ message: "Carro removido com sucesso." });
    } catch (error) {
      next(error);
    }
  },

  async searchByBrand(req, res, next) {
    try {
      const cars = await carService.searchByBrand(req.query.brand);
      res.json(cars);
    } catch (error) {
      next(error);
    }
  },

  async buy(req, res, next) {
    try {
      const car = await carService.buyCar(req.params.id, req.user.userId);
      res.status(200).json({
        message: "Carro comprado com sucesso!",
        car,
      });
    } catch (error) {
      next(error);
    }
  },
};
