import { Box, Badge } from "@chakra-ui/react";

export default function BadgePokemon(props) {
  console.log(props);
  return (
    <Box>
      {props.types.map((badge, index) => (
        <Badge
          bg={
            badge.type.name === "grass"
              ? "green.400"
              : badge.type.name === "poison"
              ? "purple.400"
              : badge.type.name === "fire"
              ? "red.500"
              : badge.type.name === "water"
              ? "blue.400"
              : badge.type.name === "bug"
              ? "green.500"
              : badge.type.name === "flying"
              ? "purple.200"
              : badge.type.name === "electric"
              ? "yellow.200"
              : badge.type.name === "steel"
              ? "gray.300"
              : badge.type.name === "rock"
              ? "yellow.600"
              : badge.type.name === "ground"
              ? "yellow.400"
              : badge.type.name === "dark"
              ? "gray.900"
              : badge.type.name === "ghost"
              ? "gray.600"
              : badge.type.name === "fighting"
              ? "orange.500"
              : badge.type.name === "dragon"
              ? "purple.500"
              : badge.type.name === "fairy"
              ? "red.200"
              : badge.type.name === "psychic"
              ? "red.300"
              : badge.type.name === "ice"
              ? "blue.100"
              : "white"
          }
          color={
            badge.type.name === "dark"
              ? "white"
              : badge.type.name === "ghost"
              ? "white"
              : "black"
          }
          key={index}
          mr={2}
        >
          {badge.type.name}
        </Badge>
      ))}
    </Box>
  );
}
