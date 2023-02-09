import Head from "next/head";
import { getJobList, getJobById } from "@/libs/api-recruitment";
import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  VStack,
  Text,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  SimpleGrid,
  Flex,
  Spacer,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  console.log({ job: props.details });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.lg" px="0">
        <Box py="4" px="2" bgColor="blue.600" color="white">
          <Heading>Github jobs</Heading>
        </Box>

        <Box bgColor="gray.300" px="4" py="8">
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Box>
      </Container>

      <Container
        maxW="container.lg"
        px="4"
        py="8"
        bgColor="white"
        border="2px solid"
        borderColor="gray.300"
      >
        <VStack
          align="start"
          spacing="0"
          pb="4"
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <Text fontSize="sm" color="gray.500">
            {props?.details?.type} / {props?.details?.location}
          </Text>
          <Heading as="h1" size="md" color="blue.700">
            {props?.details?.title}
          </Heading>
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const {
    params: { id_job },
  } = context;
  const details = await getJobById(id_job);
  return {
    props: {
      details,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const details = await getJobList();

  const paths = details.map((item) => ({
    params: { id_job: item.id },
  }));

  return { paths, fallback: "blocking" };
}
