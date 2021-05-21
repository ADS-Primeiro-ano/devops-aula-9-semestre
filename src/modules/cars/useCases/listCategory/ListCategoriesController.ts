import { Request, Response } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoriesController {

  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoryUseCase.execute();
  
    return response.json(all);
  }
};

export { ListCategoriesController };