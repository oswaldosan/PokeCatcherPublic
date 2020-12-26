import React, { useState } from "react";
import Link from "next/link";
import firebaseClient from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

export default function Login({ props }) {
  firebaseClient();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  

  return (
    <Flex className="loginWave">
      <Box w={500} p={4} my={12} mx="auto">
        <Heading textAlign="center" as="h3" size="lg">
          Pokemon Trainer Login & Register
          <div className="loginball"> <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"></img></div>
        </Heading> <br/>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="emailAddress"
            value={email}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="pass"
            value={pass}
            aria-describedby="password-helper-text"
          />
        </FormControl>
        <Stack justify="center" mt={6} isInline spacing={10}>
          <Button
          colorScheme="blue"
            minWidth="40%"
            variant="solid"
            isDisabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Create account
          </Button>
          <Button
            colorScheme="pink"
            minWidth="40%"
            variant="solid"
            isDisabled={email === "" || pass === ""}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Log in
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}