import ActionButton from "@/components/ActionButton";
import BackButton from "@/components/BackButton";
import useForm from "@/hooks/useForm";
import ContainerBox from "@/layouts/ContainerBox";
import Layout from "@/layouts/MainLayout";
import { redirectTo } from "@/utils/route";
import { getInitials } from "@/utils/user";
import { usePage } from "@inertiajs/react";
import {
  Anchor,
  Avatar,
  Breadcrumbs,
  Divider,
  FileInput,
  Grid,
  Group,
  MultiSelect,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

const ClientCreate = () => {
  const {
    dropdowns: { companies },
  } = usePage().props;

  const [form, submit, updateValue] = useForm("post", route("clients.users.store"), {
    avatar: null,
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    companies: [],
  });

  return (
    <>
      <Breadcrumbs fz={14} mb={30}>
        <Anchor href="#" onClick={() => redirectTo("clients.users.index")} fz={14}>
          Mitarbeiter
        </Anchor>
        <div>Erstellen</div>
      </Breadcrumbs>

      <Grid justify="space-between" align="flex-end" gutter="xl" mb="lg">
        <Grid.Col span="auto">
          <Title order={1}>Mitarbeiter erstellen</Title>
        </Grid.Col>
        <Grid.Col span="content"></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={(e) => submit(e, { forceFormData: true })}>
          <Grid justify="flex-start" align="flex-start" gutter="lg">
            <Grid.Col span="content">
              <Avatar
                src={form.data.avatar !== null ? URL.createObjectURL(form.data.avatar) : null}
                size={120}
                color="blue"
              >
                {getInitials(form.data.name)}
              </Avatar>
            </Grid.Col>
            <Grid.Col span="auto">
              <FileInput
                label="Profilbild"
                placeholder="Bild auswählen"
                accept="image/png,image/jpeg"
                onChange={(image) => updateValue("avatar", image)}
                clearable
                error={form.errors.avatar}
              />
              <Text size="xs" c="dimmed" mt="sm">
                Falls kein Bild hochgeladen wird, versuchen wir, es über folgende Methode abzurufen:{" "}
                <Anchor href="https://unavatar.io" target="_blank" opacity={0.6}>
                  unavatar.io
                </Anchor>{" "}
                service.
              </Text>
            </Grid.Col>
          </Grid>

          <TextInput
            label="Name"
            placeholder="Vollständiger Benutzername"
            required
            mt="md"
            value={form.data.name}
            onChange={(e) => updateValue("name", e.target.value)}
            error={form.errors.name}
          />

          <TextInput
            label="Phone"
            placeholder="Telefonnummer des Nutzers"
            mt="md"
            value={form.data.phone}
            onChange={(e) => updateValue("phone", e.target.value)}
            error={form.errors.phone}
          />

          <MultiSelect
            label="Firma"
            placeholder="Mitarbeiter Firma"
            mt="md"
            value={form.data.companies}
            onChange={(values) => updateValue("companies", values)}
            data={companies}
            error={form.errors.companies}
          />

          {form.data.companies.length === 0 && (
            <Text c="dimmed" fz="xs" mt="xs">
              Wenn Sie dieses Feld leer lassen, werden Sie nach der Erstellung des Mitarbeiter aufgefordert, ein Unternehmen anzulegen.
            </Text>
          )}

          <Divider mt="xl" mb="md" label="Anmeldedaten" labelPosition="center" />

          <TextInput
            label="E-mail"
            placeholder="Benutzer-E-Mail"
            required
            value={form.data.email}
            onChange={(e) => updateValue("email", e.target.value)}
            onBlur={() => form.validate("email")}
            error={form.errors.email}
          />

          <PasswordInput
            label="Passwort"
            placeholder="Benutzerpasswort"
            required
            mt="md"
            value={form.data.password}
            onChange={(e) => updateValue("password", e.target.value)}
            error={form.errors.password}
          />

          <PasswordInput
            label="Passwort bestätigen"
            placeholder="Passwort bestätigen"
            required
            mt="md"
            value={form.data.password_confirmation}
            onChange={(e) => updateValue("password_confirmation", e.target.value)}
            error={form.errors.password_confirmation}
          />

          <Group justify="space-between" mt="xl">
            <BackButton route="clients.users.index" />
            <ActionButton loading={form.processing}>Erstellen</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

ClientCreate.layout = (page) => <Layout title="Mitarbeiter Erstellen">{page}</Layout>;

export default ClientCreate;
