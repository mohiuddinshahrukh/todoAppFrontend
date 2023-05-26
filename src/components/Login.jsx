import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { routes } from "./routes";
//import { GoogleButton, TwitterButton } from "../SocialButtons/SocialButtons";

export function AuthenticationForm() {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const navigation = useNavigate();
  return (
    <Paper style={{ height: "90%", overflow: "hidden" }} radius={0}>
      <Center h={"100%"}>
        <Paper shadow="md" radius="sm" w={"500px"} p="xl" withBorder>
          <Text size="xl" weight={500} align="center">
            Welcome to Shahrukh's Todo App, {type} with
          </Text>

          <Group grow mb="md" mt="md">
            <Button radius="xl">Google</Button>
            <Button radius="xl">Twitter</Button>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />

          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              {type === "register" && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />

              {type === "register" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="dimmed"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              {/* <Anchor
                component={Link}
                to={type === "login" ? routes.homePath : ""}
              > */}
              <Button
                type="submit"
                radius="xl"
                onClick={() => {
                  notifications.show({
                    id: "checkingUserCreds",
                    title: "Checking your credentials",
                    color: "blue",
                    loading: true,
                    autoClose: false,
                    withCloseButton: false,
                  });

                  setTimeout(() => {
                    notifications.update({
                      id: "checkingUserCreds",
                      title: "Successful Login!",
                      color: "green",
                      loading: false,
                      autoClose: true,
                      withCloseButton: false,
                    });
                    navigation(routes.homePath);
                  }, 2000);
                }}
              >
                {upperFirst(type)}
              </Button>
              {/* </Anchor> */}
            </Group>
          </form>
        </Paper>
      </Center>
    </Paper>
  );
}
