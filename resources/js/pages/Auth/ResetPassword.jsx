import ContainerBox from "@/layouts/ContainerBox";
import GuestLayout from "@/layouts/GuestLayout";
import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "laravel-precognition-react-inertia";
import { useEffect } from "react";
import classes from "./css/ResetPassword.module.css";

const ResetPassword = ({ token }) => {
  const form = useForm("post", route("auth.newPassword.save"), {
    token,
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      form.reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    form.clearErrors();
    form.submit({ preserveScroll: true });
  };

  return (
    <>
      <Title className={classes.title} ta="center">
        Passwort zurücksetzen
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Geben Sie Ihre E-Mail-Adresse und Ihr neues Passwort ein.
      </Text>

      <ContainerBox shadow="md" p={30} mt="xl" radius="md">
        <form onSubmit={submit}>
          <TextInput
            label="E-mail"
            placeholder="Ihre E-Mail"
            required
            onChange={(e) => form.setData("email", e.target.value)}
            error={form.errors.email}
          />
          <PasswordInput
            label="Passwort"
            placeholder="Neues passwort"
            required
            mt="md"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
            error={form.errors.password}
          />
          <PasswordInput
            label="Passwort bestätigen"
            placeholder="Neues Passwort wiederholen"
            required
            mt="md"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData("password_confirmation", e.target.value)}
            error={form.errors.password_confirmation}
          />
          <Button type="submit" fullWidth mt="xl" disabled={form.processing}>
            Passwort zurücksetzen
          </Button>
        </form>
      </ContainerBox>
    </>
  );
};

ResetPassword.layout = (page) => <GuestLayout title="Passwort zurücksetzen">{page}</GuestLayout>;

export default ResetPassword;
