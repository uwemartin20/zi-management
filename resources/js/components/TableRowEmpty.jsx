import { Table, Text } from "@mantine/core";

export default function TableRowEmpty(props) {
  return (
    <Table.Tr>
      <Table.Td {...props}>
        <Text fz="md" ta="center" py={50}>
          Es wurden keine Gegenstände gefunden
        </Text>
      </Table.Td>
    </Table.Tr>
  );
}
