import { Container } from "@chakra-ui/react";

import Auth from "../components/Auth";

export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      {/* <AddTodo/> */}
      {/* <TodoList/> */}
    </Container>
  );
}
