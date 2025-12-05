import ContainerBox from "@/layouts/ContainerBox";
import GuestLayout from "@/layouts/GuestLayout";
import { redirectTo } from "@/utils/route";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import { useForm } from "laravel-precognition-react-inertia";
import classes from "./css/ForgotPassword.module.css";

const ForgotPassword = ({ status }) => {
  const form = useForm("post", route("auth.forgotPassword.sendLink"), {
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();
    form.clearErrors();

    form.submit({ preserveScroll: true });
  };

  return (
    <>
      <Title className={classes.title} ta="center">
        Passwort vergessen?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen zu erhalten.
      </Text>

      <ContainerBox shadow="md" p={30} mt="xl" radius="md">
        <Text c="dimmed" fz="sm" mb={20}>
          Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link, über den Sie ein neues Passwort auswählen können.
        </Text>

        {status && (
          <Alert radius="md" title={status} icon={<IconInfoCircle />} mb={10}>
            Bitte lesen Sie die Anweisungen in der E-Mail, um ein neues Passwort für Ihr Konto festzulegen.
          </Alert>
        )}

        <form onSubmit={submit}>
          <TextInput
            label="E-mail"
            placeholder="Ihre E-Mail"
            required
            onChange={(e) => form.setData("email", e.target.value)}
            onBlur={() => form.validate("email")}
            error={form.errors.email}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              c="dimmed"
              size="sm"
              className={classes.control}
              onClick={() => redirectTo("auth.login.form")}
            >
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Zurück zum Login</Box>
              </Center>
            </Anchor>
            <Button type="submit" className={classes.control} disabled={form.processing}>
              Passwort zurücksetzen
            </Button>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

ForgotPassword.layout = (page) => <GuestLayout title="Forgot Password">{page}</GuestLayout>;

export default ForgotPassword;
