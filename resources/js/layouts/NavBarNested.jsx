import Logo from "@/components/Logo";
import useNavigationStore from "@/hooks/store/useNavigationStore";
import { usePage } from "@inertiajs/react";
import { Group, ScrollArea, Text, rem } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconFileDollar,
  IconGauge,
  IconLayoutList,
  IconListDetails,
  IconReportAnalytics,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
import NavbarLinksGroup from "./NavbarLinksGroup";
import UserButton from "./UserButton";
import classes from "./css/NavBarNested.module.css";

export default function Sidebar() {
  const { version } = usePage().props;
  const { items, setItems } = useNavigationStore();

  useEffect(() => {
    setItems([
      {
        label: "Dashboard",
        icon: IconGauge,
        link: route("dashboard"),
        active: route().current("dashboard"),
        visible: true,
      },
      {
        label: "Projekte",
        icon: IconListDetails,
        link: route("projects.index"),
        active: route().current("projects.*"),
        visible: can("view projects"),
      },
      {
        label: "Meine Aufgaben",
        icon: IconLayoutList,
        active: route().current("my-work.*"),
        opened: route().current("my-work.*"),
        visible: can("view tasks") || can("view activities"),
        links: [
          {
            label: "Aufgaben",
            link: route("my-work.tasks.index"),
            active: route().current("my-work.tasks.*"),
            visible: can("view tasks"),
          },
          {
            label: "Aktivität",
            link: route("my-work.activity.index"),
            active: route().current("my-work.activity.*"),
            visible: can("view activities"),
          },
        ],
      },
      {
        label: "Kunden",
        icon: IconBuildingSkyscraper,
        active: route().current("clients.*"),
        opened: route().current("clients.*"),
        visible: can("view client users") || can("view client companies"),
        links: [
          {
            label: "Mitarbeiter",
            link: route("clients.users.index"),
            active: route().current("clients.users.*"),
            visible: can("view client users"),
          },
          {
            label: "Firmen",
            link: route("clients.companies.index"),
            active: route().current("clients.companies.*"),
            visible: can("view client companies"),
          },
        ],
      },
      {
        label: "Benutzer",
        icon: IconUsers,
        link: route("users.index"),
        active: route().current("users.*"),
        visible: can("view users"),
      },
      {
        label: "Rechnungen",
        icon: IconFileDollar,
        link: route("invoices.index"),
        active: route().current("invoices.*"),
        visible: can("view invoices"),
      },
      {
        label: "Berichte",
        icon: IconReportAnalytics,
        active: route().current("reports.*"),
        opened: route().current("reports.*"),
        visible: can("view logged time sum report") || can("view daily logged time report") || can("view fixed price sum report"),
        links: [
          {
            label: "Protokollierte Zeitsumme",
            link: route("reports.logged-time.sum"),
            active: route().current("reports.logged-time.sum"),
            visible: can("view logged time sum report"),
          },
          {
            label: "Täglich protokollierte Zeit",
            link: route("reports.logged-time.daily"),
            active: route().current("reports.logged-time.daily"),
            visible: can("view daily logged time report"),
          },
          {
            label: "Festpreissumme",
            link: route("reports.fixed-price.sum"),
            active: route().current("reports.fixed-price.sum"),
            visible: can("view fixed price sum report"),
          },
        ],
      },
      {
        label: "Einstellungen",
        icon: IconSettings,
        active: route().current("settings.*"),
        opened: route().current("settings.*"),
        visible: can("view owner company") || can("view roles") || can("view labels"),
        links: [
          {
            label: "Firma",
            link: route("settings.company.edit"),
            active: route().current("settings.company.*"),
            visible: can("view owner company"),
          },
          {
            label: "Rollen",
            link: route("settings.roles.index"),
            active: route().current("settings.roles.*"),
            visible: can("view roles"),
          },
          {
            label: "Label",
            link: route("settings.labels.index"),
            active: route().current("settings.labels.*"),
            visible: can("view labels"),
          },
        ],
      },
    ]);
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Text size="xs" className={classes.version}>
            v{version}
          </Text>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {items
            .filter((i) => i.visible)
            .map((item) => (
              <NavbarLinksGroup key={item.label} item={item} />
            ))}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
