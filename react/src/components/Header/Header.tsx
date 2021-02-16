import React from "react";
import styled from "@emotion/styled";

type Props = {
  customText?: string;
};

export default (props: Props): JSX.Element => (
  <Header>Here's your damn photo server (∩｀-´)⊃━☆ﾟ.*･｡ﾟ 🌠</Header>
);

const Header = styled("div")`
  padding: 20px 20px 0;
`;
