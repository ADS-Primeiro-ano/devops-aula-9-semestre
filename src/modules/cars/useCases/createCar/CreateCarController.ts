import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      name,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      description,
      name,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController }