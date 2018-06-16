import Chance from "chance";

const chance = new Chance();

const highCards = {
  ACE: 1,
  JACK: 12,
  QUEEN: 13,
  KING: 14
};

export function getName() {
  return chance.first();
}

export function mapCardValue(value) {
  return highCards[value];
}
