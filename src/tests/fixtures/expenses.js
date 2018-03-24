import moment from "moment";

const momentStart = moment(0);

export default [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: moment(momentStart).valueOf()
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: moment(momentStart)
      .subtract(4, "day")
      .valueOf()
  },
  {
    id: "3",
    description: "Credit Card",
    note: "",
    amount: 4500,
    createdAt: moment(momentStart)
      .add(4, "day")
      .valueOf()
  }
];
