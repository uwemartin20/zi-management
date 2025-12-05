import TableRowActions from '@/components/TableRowActions';
import { Link } from '@inertiajs/react';
import { Badge, Group, Table, Text } from '@mantine/core';

export default function TableRow({ item }) {
  return (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Text
          fz='sm'
          fw={500}
        >
          {item.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz='sm'>{item.email}</Text>
        <Text
          fz='xs'
          c='dimmed'
        >
          E-mail
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap='sm'>
          {item.clients.map(item => (
            <Link
              href={route('clients.users.edit', item.id)}
              key={item.id}
            >
              <Badge
                variant='light'
                color='orange'
                tt='unset'
              >
                {item.name}
              </Badge>
            </Link>
          ))}
        </Group>
      </Table.Td>
      {(can('edit client company') ||
        can('archive client company') ||
        can('restore client company')) && (
        <Table.Td>
          <TableRowActions
            item={item}
            editRoute='clients.companies.edit'
            editPermission='edit client company'
            archivePermission='archive client company'
            restorePermission='restore client company'
            archive={{
              route: 'clients.companies.destroy',
              title: 'Archiv Firma',
              content: `Sind Sie sicher, dass Sie dieses Unternehmen archivieren möchten?`,
              confirmLabel: 'Archiv',
            }}
            restore={{
              route: 'clients.companies.restore',
              title: 'Unternehmen wiederherstellen',
              content: `Sind Sie sicher, dass Sie dieses Unternehmen wiederherstellen wollen?`,
              confirmLabel: 'Wiederherstellen',
            }}
          />
        </Table.Td>
      )}
    </Table.Tr>
  );
}
