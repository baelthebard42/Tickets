import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.build({
    title: "con",
    price: 5,
    userId: "asd",
  });

  await ticket.save();

  const firstIns = await Ticket.findById(ticket.id);
  const secondIns = await Ticket.findById(ticket.id);

  firstIns?.set({ price: 10 });
  secondIns?.set({ price: 15 });
  await firstIns?.save();

  try {
    await secondIns!.save();
  } catch (err) {
    return;
  }

  throw new Error("should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "con",
    price: 5,
    userId: "asd",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
