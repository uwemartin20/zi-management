import { Alert } from "@mantine/core";
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconExclamationCircle,
} from "@tabler/icons-react";

export default function LoginNotification({ notify }) {
  return (
    <div style={{ marginTop: "25px" }}>
      {notify === "password-reset" && (
        <Alert radius="md" title="Password was reset" icon={<IconInfoCircle />}>
          Ihr Passwort wurde erfolgreich aktualisiert, Sie können es zum Anmelden verwenden.
        </Alert>
      )}
      {notify === "social-login-user-not-found" && (
        <Alert
          radius="md"
          title="Login failed"
          icon={<IconAlertTriangle />}
          color="orange"
        >
          Es wurde kein Nutzer mit Ihrer Google E-Mail-Adresse gefunden.
        </Alert>
      )}
      {notify === "social-login-failed" && (
        <Alert
          radius="md"
          title="Whoops, something went wrong"
          icon={<IconExclamationCircle />}
          color="red"
        >
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie, sich mit Ihrer E-Mail-Adresse und Ihrem Passwort anzumelden.
        </Alert>
      )}
    </div>
  );
}
