import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
} from "@mantine/core";
import { useForm } from '@formspree/react';
import { Link } from "react-router-dom";

export function ContactUs() {

    const [state, handleSubmit] = useForm("mayzklbv");
    if (state.succeeded) {
        return (
            <Container my="md">
                Thanks for contacting us! We will be back to you shortly.
                <br/>
                <br/>
                <Button component={Link} to={'/'}>Return to Home</Button>
            </Container>
        );
    }

  return (
    <Container my="md">
      <form onSubmit={handleSubmit}>
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
          weight={900}
          align="center"
        >
          Get in touch
        </Title>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </form>
    </Container>
  );
}
