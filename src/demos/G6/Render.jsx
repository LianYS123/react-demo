import React from "react";

// export const Render = ({ render, ...props }) => {
//   useEffect(() => {
//     render();
//   }, [render]);
// };

export class Render extends React.Component {
  componentDidMount() {
    const { render, ...rest } = this.props;
    render(rest);
  }
  render() {
    return <div id="mountNode"></div>;
  }
}

export const createRender = (render) => (props) => (
  <Render {...props} render={render} />
);

export default Render;
