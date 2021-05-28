import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateSpecificationUseCase } from "../createSpecification/CreateSpecificationUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to be car", async () => {

    const specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    const createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryInMemory);

    const car = await createCarUseCase.execute({
      description: "Description Car",
      name: "Name Car",
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234"
    });

    const specification = await createSpecificationUseCase.execute({
      description: "test",
      name: "teste"
    });

    const car_id = car.id;
    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id, specifications_id });

    expect(specificationsCars).toHaveProperty("specifications");
    // expect(specificationsCars.specifications).toHaveLength(1);
  });
});