import useForm from "@/hooks/useForm";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";

function ModalForm({ item }) {
  const [form, submit, updateValue] = useForm(
    "post",
    route("projects.task-groups.update", [route().params.project, item.id]),
    {
      _method: "put",
      name: item.name || "",
    },
  );

  const submitModal = (event) => {
    submit(event, {
      onSuccess: () => modals.closeAll(),
      preserveScroll: true,
    });
  };

  return (
    <form onSubmit={submitModal}>
      <TextInput
        label="Name"
        placeholder="Gruppename"
        required
        data-autofocus
        value={form.data.name}
        onChange={(e) => updateValue("name", e.target.value)}
        error={form.errors.name}
      />

      <Flex justify="flex-end" mt="xl">
        <Button type="submit" w={100} loading={form.processing}>
          Bearbeiten
        </Button>
      </Flex>
    </form>
  );
}

const EditTasksGroupModal = (item) => {
  modals.open({
    title: (
      <Text size="xl" fw={700} mb={-10}>
        Aufgabengruppe Bearbeiten
      </Text>
    ),
    centered: true,
    padding: "xl",
    overlayProps: { backgroundOpacity: 0.55, blur: 3 },
    children: <ModalForm item={item} />,
  });
};

export default EditTasksGroupModal;
