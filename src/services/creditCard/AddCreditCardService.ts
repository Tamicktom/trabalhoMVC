//* Libraries imports
import { hash } from "bcryptjs";

//* Local imports
import p from "../../prisma";

import type { CreditCardZod } from "../../controllers/creditCard/AddCreditCardController";

export default class AddCreditCardService {
  public async execute({
    name,
    number,
    cvc,
    expirationDate,
    userId,
  }: CreditCardZod) {
    //* Verify if the user exist
    const user = await p.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) return "User not found";

    //* Create the credit card for the user
    const creditCard = await p.creditCard.create({
      data: {
        name,
        number,
        cvc,
        expiry: expirationDate,
        userId,
      },
    });

    return creditCard;
  }
}
