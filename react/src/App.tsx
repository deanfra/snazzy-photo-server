import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";

export interface Props {
  customText?: string;
}

type Image = {
  id: string;
  path: string;
  thumb: string;
};

const App = ({ customText }: Props): JSX.Element => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <div>
      <Header />
      {!images.length ? (
        <div>loading...</div>
      ) : (
        <div>
          <Tiles>
            {images.map((image: Image) => (
              <Tile key={image.id}>
                <a href={image.path}>
                  <img src={image.thumb} />
                </a>
              </Tile>
            ))}
          </Tiles>
        </div>
      )}
    </div>
  );
};

const Tile = styled("div")`
  margin: 20px;
`;

const Tiles = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default App;
