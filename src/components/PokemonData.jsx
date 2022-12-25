import { useEffect, useState } from "react";
import {
  Tr,
  Td,
  Box,
  Table,
  Tbody,
  Image,
  HStack,
  Button,
  Center,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import BadgePokemon from "./BadgePokemon";

const Pagination = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || 1)
  );

  const moveTo = (direction) => {
    if (direction === "prev") {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <HStack className="pagination" mb={8}>
      <Link to={`/pokemon/${currentPage - 1}`}>
        <Button
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => moveTo("prev")}
          colorScheme="orange"
        >
          <p>{"<"}</p>
        </Button>
      </Link>
      <Center>
        <Link to={"/pokemon"}>
          <Button size="sm" colorScheme="orange">
            <p>Home</p>
          </Button>
        </Link>
      </Center>
      <Link to={`/pokemon/${currentPage + 1}`}>
        <Button size="sm" onClick={() => moveTo("next")} colorScheme="orange">
          <p>{">"}</p>
        </Button>
      </Link>
    </HStack>
  );
};

function PokemonData() {
  const pokemonId = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId.id}/`
      );
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    };

    fetchPokemon();
  }, [pokemonId]);

  console.log(pokemon);

  return (
    <Center py={[0, 10]}>
      <Container
        maxW="container.sm"
        boxShadow="dark-lg"
        px={2}
        py={8}
        rounded="md"
        bg="yellow.200"
        border="4px"
        borderColor="gray.800"
      >
        <Box bg="yellow.100" px={8} py={6}>
          <Pagination />
          {loading ? (
            <Center>
              <p>Loading...</p>
            </Center>
          ) : (
            <Box className="pokemonDetail">
              {pokemon && (
                <>
                  <Heading as="h3" size="md">
                    <Center my={4}>
                      <h1>{pokemon.name}</h1>
                    </Center>
                  </Heading>
                  <Center>
                    <BadgePokemon types={pokemon.types} />
                  </Center>
                  <Center>
                    <HStack>
                      <Image
                        boxSize="128px"
                        src={pokemon.sprites.front_default}
                      />
                      <Image
                        boxSize="128px"
                        src={pokemon.sprites.back_default}
                      />
                      <Image
                        boxSize="128px"
                        src={pokemon.sprites.front_shiny}
                      />
                      <Image boxSize="128px" src={pokemon.sprites.back_shiny} />
                    </HStack>
                  </Center>
                  <Box>
                    <Table variant="unstyled">
                      <Tbody>
                        <Tr>
                          <Td>
                            <p>Height</p>
                          </Td>
                          <Td>
                            <p>{pokemon.height}</p>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <p>Weight</p>
                          </Td>
                          <Td>
                            <p>{pokemon.weight}</p>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <p>Base Experience</p>
                          </Td>
                          <Td>
                            <p>{pokemon.base_experience}</p>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <p>Abilities</p>
                          </Td>
                          <Td>
                            {pokemon.abilities.map((pokemon, index) => (
                              <p key={index}>
                                {pokemon.ability.name} <br />
                              </p>
                            ))}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <p>Stats</p>
                          </Td>
                          <Td>
                            {pokemon.stats.map((pokemon, index) => (
                              <p key={index}>
                                {pokemon.stat.name} : {pokemon.base_stat} <br />
                              </p>
                            ))}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Center>
  );
}

export default PokemonData;
