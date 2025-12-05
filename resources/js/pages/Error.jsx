import { Container, Title, Text, Button, Group } from "@mantine/core";
import classes from "./css/Error.module.css";
import { Head, router } from "@inertiajs/react";

export default function Error({ status }) {
  const title = {
    503: "Service nicht verfügbar",
    500: "Serverfehler",
    404: "Seite nicht gefunden",
    403: "Verboten",
  }[status];

  const description = {
    503: "Entschuldigung, wir führen gerade Wartungsarbeiten durch. Bitte schauen Sie bald wieder vorbei.",
    500: "Hoppla, da ist etwas auf unseren Servern schiefgelaufen.",
    404: "Die gesuchte Seite konnte leider nicht gefunden werden.",
    403: "Leider ist Ihnen der Zugriff auf diese Seite untersagt.",
  }[status];

  return (
    <>
      <Head title={title} />
      <Container className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.image}>{status}</div>
          <div className={classes.content}>
            <Title className={classes.title}>{title}</Title>
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              {description}
            </Text>
            <Group justify="center">
              <Button size="md" onClick={() => router.get(route("dashboard"))}>
                Zurück zur Startseite
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </>
  );
}
