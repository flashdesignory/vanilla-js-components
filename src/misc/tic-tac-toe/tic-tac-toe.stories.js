import { TicTacToe } from "./tic-tac-toe";

export default {
  title: "Misc/TicTacToe",
  argTypes: {
    title: { control: "text" },
    buttonLabel: { control: "text" },
  },
};

const Template = ({ ...args }) => {
  const component = new TicTacToe({ ...args });
  return component.render();
};

export const Game = Template.bind({});
Game.args = {
  title: "Tic Tac Toe",
  buttonLabel: "Restart",
};
