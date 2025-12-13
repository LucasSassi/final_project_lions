import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Marca é obrigatória"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Modelo é obrigatório"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Ano é obrigatório"],
      min: [1900, "Ano deve ser maior que 1900"],
    },
    price: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0, "Preço não pode ser negativo"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    color: {
      type: String,
      required: [true, "Cor é obrigatória"],
      trim: true,
    },
    mileage: {
      type: Number,
      required: [true, "Quilometragem é obrigatória"],
      min: [0, "Quilometragem não pode ser negativa"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

// Não retorna __v nas respostas JSON
CarSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

// Índice para melhorar performance nas buscas
CarSchema.index({ brand: 1, model: 1 });
CarSchema.index({ available: 1 });

const MCar = mongoose.model("Car", CarSchema);

export default MCar;
