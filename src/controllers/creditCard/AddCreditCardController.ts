//* Libraries imports
import z from "zod";

//* Local imports
import AddCreditCardService from "../../services/creditCard/AddCreditCardService";

//* Types imports
import type { Request, Response } from "express";

const creditCardSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(255, "Name must be at most 255 characters long"),
  number: z.string().min(16, "Number must be at least 16 characters long"),
  cvc: z
    .string()
    .min(3, "CVC must be at least 3 characters long")
    .max(3, "CVC must be at most 3 characters long"),
  expirationDate: z
    .string()
    .min(5, "Expiration date must be at least 5 characters long"),
  userId: z.string().uuid("Invalid user id"),
});

export type CreditCardZod = z.infer<typeof creditCardSchema>;

export default class AddCreditCardController {
  public async handle(req: Request, res: Response) {
    try {
      const tmpCreditCard = creditCardSchema.parse(req.body);
      const addCreditCardService = new AddCreditCardService();
      const creditCard = await addCreditCardService.execute(tmpCreditCard);

      return res.json(creditCard);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid credentials", details: error.errors });
      }
    }
  }
}
