import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Image,
  Center,
  Button,
  HStack,
  Container,
  InputGroup,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import Pokemon from "./Pokemon";
import { useSearchParams, Link } from "react-router-dom";

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
      <Link
        to={currentPage === 2 ? "/pokemon" : `/pokemon?page=${currentPage - 1}`}
      >
        <Button
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => moveTo("prev")}
          colorScheme="orange"
        >
          <p>{"<"}</p>
        </Button>
      </Link>
      <Box color="orange.800">
        <h1>PokeDeh</h1>
      </Box>
      <Link to={`/pokemon?page=${currentPage + 1}`}>
        <Button size="sm" onClick={() => moveTo("next")} colorScheme="orange">
          <p>{">"}</p>
        </Button>
      </Link>
    </HStack>
  );
};

function PokemonList() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  const pokemonList = async (page) => {
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`
    );
    const data = await response.json();
    const pokemonData = data.results.map(async (element) => {
      const responseData = await fetch(element.url);
      const pokemonListData = await responseData.json();
      return pokemonListData;
    });
    setData(await Promise.all(pokemonData));
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    pokemonList(page);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const json = await response.json();
    setData([json]);
  };

  return (
    <Center className="wrapper" py={[0, 10]}>
      <Container
        maxW="container.sm"
        boxShadow="dark-lg"
        px={2}
        py={8}
        rounded="md"
        bg="yellow.200"
        border="4px"
        borderColor="gray.800"
        className="container"
      >
        <Box bg="yellow.100" px={8} py={6}>
          <Center>
            <Image src="/assets/img/pokemon.svg" />
          </Center>
          <form onSubmit={handleSubmit}>
            <FormControl boxShadow="md" my={6}>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  bg="white"
                />
                <InputRightElement width="8rem">
                  <Button
                    borderRadius="0"
                    width="8rem"
                    type="submit"
                    colorScheme="yellow"
                  >
                    <p>Search</p>
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
          <Pagination />
          <Box>
            {!data ? (
              <Center>
                <p>Loading...</p>
              </Center>
            ) : (
              <Pokemon pokemon={data} />
            )}
          </Box>
        </Box>
      </Container>
    </Center>
  );
}

export default PokemonList;
