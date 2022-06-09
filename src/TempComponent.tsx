import { Transition, TransitionStatus } from "react-transition-group";

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out,
   color ${duration}ms ease-in-out`,
  opacity: 0,
  color: "red",
};

const transitionStyles: { [key: string]: object } = {
  entering: { opacity: 1, color: "red" },
  entered: { opacity: 1, color: "green" },
  exiting: { opacity: 0.1, color: "blue" },
  exited: { opacity: 0.1, color: "yellow" },
};

interface Props {
  inProp: boolean;
}

const Fade: React.FC<Props> = ({ inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state: TransitionStatus) => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        I'm a fade Transition!
      </div>
    )}
  </Transition>
);

export default Fade;
