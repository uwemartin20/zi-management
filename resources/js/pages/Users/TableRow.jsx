import RoleBadge from "@/components/RoleBadge";
import TableRowActions from "@/components/TableRowActions";
import { money } from "@/utils/currency";
import { getInitials } from "@/utils/user";
import { Avatar, Flex, Group, Table, Text } from "@mantine/core";

export default function TableRow({ item }) {
  return (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            src={item.avatar}
            size={40}
            radius={40}
            color="blue"
            alt={item.name}
          >
            {getInitials(item.name)}
          </Avatar>
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.job_title}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td maw={200}>
        <Flex gap="sm" align="center" direction="row" wrap="wrap">
          {item.roles.map((role, index) => (
            <RoleBadge role={role} key={`role-${index}-${item.id}`} />
          ))}
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.email}</Text>
        <Text fz="xs" c="dimmed">
          E-mail
        </Text>
      </Table.Td>
      {can("view user rate") && (
        <Table.Td>
          <Text fz="sm">{money(item.rate)} / hr</Text>
          <Text fz="xs" c="dimmed">
            Rate
          </Text>
        </Table.Td>
      )}
      {(can("edit user") || can("archive user") || can("restore user")) && (
        <Table.Td>
          <TableRowActions
            item={item}
            editRoute="users.edit"
            editPermission="edit user"
            archivePermission="archive user"
            restorePermission="restore user"
            archive={{
              route: "users.destroy",
              title: "Archiv Benutzer",
              content: `Möchten Sie diesen Benutzer wirklich archivieren? Diese Aktion verhindert, dass sich der Benutzer anmelden kann, 
                während alle anderen Aspekte im Zusammenhang mit den Aktionen des Benutzers unberührt bleiben.`,
              confirmLabel: "Archiv",
            }}
            restore={{
              route: "users.restore",
              title: "Benutzer wiederherstellen",
              content: `Sind Sie sicher, dass Sie diesen Benutzer wiederherstellen möchten? Diese Aktion ermöglicht dem Benutzer die Anmeldung.`,
              confirmLabel: "Wiederherstellen",
            }}
          />
        </Table.Td>
      )}
    </Table.Tr>
  );
}
