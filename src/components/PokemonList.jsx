import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Image,
  Center,
  Button,
  Container,
  InputGroup,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import Pokemon from "./Pokemon";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function PokemonList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [displayPerPage, setDisplayPerPage] = useState(10);

  const pokemonList = async (page) => {
    setDisplayPerPage(displayPerPage + 10);
    const offset = (page - 1) * 10;
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
    setTimeout(() => {
      pokemonList(page);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search !== "") {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      if (response.status === 404) {
        setError(true);
      } else {
        const json = await response.json();
        setData([json]);
        setError(false);
      }
    }
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
            <FormControl boxShadow="md" my={8}>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  onChange={(e) => setSearch(e.target.value.toUpperCase())}
                  value={search}
                  bg="white"
                  className="input"
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
          <Box>
            {!data ? (
              <Center my={10}>
                <p>Loading...</p>
              </Center>
            ) : error ? (
              <Center my={10}>
                <p>Data Not Found</p>
              </Center>
            ) : (
              <InfiniteScroll
                dataLength={data.length}
                next={() => {
                  setTimeout(() => {
                    pokemonList() || handleSubmit();
                  }, 1750);
                }}
                hasMore={true}
                endMessage={<p>Pikachu...</p>}
              >
                <Pokemon pokemon={data} />
              </InfiniteScroll>
            )}
          </Box>
        </Box>
      </Container>
    </Center>
  );
}

export default PokemonList;
