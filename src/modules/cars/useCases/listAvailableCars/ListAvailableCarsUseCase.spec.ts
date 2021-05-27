import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available car", async () => {
    const createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    const car = await createCarUseCase.execute({
      description: "Description Car",
      name: "Name Car",
      brand: "Brand",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234"
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    const car = await createCarUseCase.execute({
      description: "Description Car",
      name: "Name Car",
      brand: "Car_brand_test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    const car = await createCarUseCase.execute({
      description: "Description Car",
      name: "Name_Car_teste",
      brand: "Car_brand_test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Name_Car_teste"
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    const car = await createCarUseCase.execute({
      description: "Description Car",
      name: "Name Car",
      brand: "Car_brand_test",
      category_id: "category",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC-1234"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.id
    });

    expect(cars).toEqual([car]);
  });
})