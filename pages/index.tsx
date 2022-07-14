import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { posts } from "../data";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const getStaticProps = async () => {
  const { data } = await fetcher(
    `${process.env.BASE_STRAPI_URL}/api/articulos`
  );

  try {
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    console.warn("errors:", e);
  }
};
export const App = ({ data }) => (
  <Container py={{ base: "16", md: "24" }}>
    <Stack spacing={{ base: "16", md: "24" }}>
      <Stack spacing={{ base: "8", md: "10" }} align="center">
        <Stack spacing={{ base: "4", md: "6" }} textAlign="center">
          <Stack spacing="4">
            <Text
              fontWeight="semibold"
              color="accent"
              fontSize={{ base: "sm", md: "md" }}
            >
              Esto es un blog :)
            </Text>
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>
              Noticias muy importantes
            </Heading>
          </Stack>
        </Stack>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        rowGap={{ base: "8", md: "12" }}
        columnGap="8"
      >
        {data.map(({ attributes, id }) => (
          <Link key={id} _hover={{ textDecor: "none" }} role="group">
            <Box
              p="6"
              bg="bg-surface"
              boxShadow={mode("lg", "lg-dark")}
              _groupHover={{ boxShadow: mode("xl", "xl-dark") }}
              transition="all 0.2s"
              height="full"
            >
              <Stack
                spacing={{ base: "8", lg: "16" }}
                justify="space-between"
                height="full"
              >
                <Stack spacing="8">
                  <Stack spacing="3">
                    <Heading size="xs">{attributes.titulo}</Heading>
                    <Text color="muted">{attributes.descripcion}</Text>
                    <Text color="muted">{attributes.cuerpo}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
);
export default App;
