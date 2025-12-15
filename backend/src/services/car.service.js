import repo from "../repositories/car.repository.js";
import createError from "../utils/app-error.js";

function ensureValidCarPayload({ brand, model, year, price, color, mileage, sellerPhone }) {
  // Campos obrigatórios
  if (!brand?.trim()) throw createError("Marca é obrigatória.", 400);
  if (!model?.trim()) throw createError("Modelo é obrigatório.", 400);
  if (!color?.trim()) throw createError("Cor é obrigatória.", 400);
  if (!sellerPhone?.trim()) throw createError("Telefone do vendedor é obrigatório.", 400);
  
  // Validação de ano
  if (!year) throw createError("Ano é obrigatório.", 400);
  if (year < 1900 || year > new Date().getFullYear() + 1) {
    throw createError("Ano inválido.", 400);
  }
  
  // Validação de preço
  if (!price) throw createError("Preço é obrigatório.", 400);
  if (price <= 0) {
    throw createError("Preço deve ser maior que zero.", 400);
  }

  // Validação de quilometragem
  if (mileage === undefined || mileage === null) {
    throw createError("Quilometragem é obrigatória.", 400);
  }
  if (mileage < 0) {
    throw createError("Quilometragem não pode ser negativa.", 400);
  }
}

export default {
  async createCar(data, userId) {
    ensureValidCarPayload(data);

    return repo.create({
      brand: data.brand.trim(),
      model: data.model.trim(),
      year: data.year,
      price: data.price,
      color: data.color.trim(),
      mileage: data.mileage,
      sellerPhone: data.sellerPhone.trim(),
      description: data.description?.trim() || "",
      available: data.available !== undefined ? data.available : true,
      createdBy: userId,
    });
  },

  async listAvailableCars() {
    return repo.findAvailable();
  },

  async getCar(id) {
    const car = await repo.findById(id);
    if (!car) throw createError("Carro não encontrado.", 404);
    return car;
  },

  async updateCar(id, data) {
    const payload = { ...data };

    if (payload.brand) payload.brand = payload.brand.trim();
    if (payload.model) payload.model = payload.model.trim();
    if (payload.description) payload.description = payload.description.trim();
    if (payload.color) payload.color = payload.color.trim();

    if (payload.year && (payload.year < 1900 || payload.year > new Date().getFullYear() + 1)) {
      throw createError("Ano inválido.", 400);
    }

    if (payload.price && payload.price <= 0) {
      throw createError("Preço deve ser maior que zero.", 400);
    }

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) delete payload[key];
    });

    if (Object.keys(payload).length === 0) {
      throw createError("Nenhum campo informado para atualização.", 400);
    }

    const updated = await repo.updateById(id, payload);
    if (!updated) throw createError("Carro não encontrado.", 404);
    return updated;
  },

  async removeCar(id) {
    const deleted = await repo.deleteById(id);
    if (!deleted) throw createError("Carro não encontrado.", 404);
  },

  async searchByBrand(brand) {
    return repo.findByBrand(brand);
  },

  async buyCar(carId, userId) {
    const car = await repo.findById(carId);
    
    if (!car) throw createError("Carro não encontrado.", 404);
    if (!car.available) throw createError("Carro já foi vendido.", 400);
    if (car.buyer) throw createError("Carro já possui um comprador.", 400);
    
    // Atualiza o carro com o comprador e marca como indisponível
    const updated = await repo.updateById(carId, {
      buyer: userId,
      available: false,
    });
    
    return updated;
  },
};
