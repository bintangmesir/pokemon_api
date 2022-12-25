import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BadgePokemon from "./BadgePokemon";

const Pokemon = (props) => {
  return (
    <Box className="pokemon">
      {props.pokemon.map((element, index) => (
        <Link key={index} to={`/pokemon/${element.id}`}>
          <Box className="listPokemon">
            <p>
              {element?.id}. {element?.name} <br />
            </p>
            <BadgePokemon types={element?.types} />
            <Image src={element.sprites?.front_default} />
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default Pokemon;
