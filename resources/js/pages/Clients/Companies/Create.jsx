import ActionButton from '@/components/ActionButton';
import BackButton from '@/components/BackButton';
import useForm from '@/hooks/useForm';
import ContainerBox from '@/layouts/ContainerBox';
import Layout from '@/layouts/MainLayout';
import { redirectTo } from '@/utils/route';
import { usePage } from '@inertiajs/react';
import {
  Anchor,
  Breadcrumbs,
  Fieldset,
  Grid,
  Group,
  MultiSelect,
  Select,
  TextInput,
  Title,
} from '@mantine/core';

const ClientCompanyCreate = () => {
  const {
    dropdowns: { clients, countries, currencies },
  } = usePage().props;
  const [form, submit, updateValue] = useForm('post', route('clients.companies.store'), {
    name: '',
    address: '',
    postal_code: '',
    city: '',
    country_id: '',
    currency_id: '',
    email: '',
    phone: '',
    web: '',
    iban: '',
    swift: '',
    business_id: '',
    tax_id: '',
    vat: '',
    clients: route().params?.client_id ? [route().params.client_id] : [],
  });

  return (
    <>
      <Breadcrumbs
        fz={14}
        mb={30}
      >
        <Anchor
          href='#'
          onClick={() => redirectTo('clients.companies.index')}
          fz={14}
        >
          Firma
        </Anchor>
        <div>Erstellen</div>
      </Breadcrumbs>

      <Grid
        justify='space-between'
        align='flex-end'
        gutter='xl'
        mb='lg'
      >
        <Grid.Col span='auto'>
          <Title order={1}>Firma Erstellen</Title>
        </Grid.Col>
        <Grid.Col span='content'></Grid.Col>
      </Grid>

      <ContainerBox maw={600}>
        <form onSubmit={submit}>
          <TextInput
            label='Name'
            placeholder='Firmename'
            required
            value={form.data.name}
            onChange={e => updateValue('name', e.target.value)}
            error={form.errors.name}
          />

          <Select
            label='Standardwährung'
            placeholder='Währung auswählen'
            required
            mt='md'
            searchable={true}
            value={form.data.currency_id}
            onChange={value => updateValue('currency_id', value)}
            data={currencies}
            error={form.errors.currency_id}
          />

          <MultiSelect
            label='Mitarbeiter'
            placeholder='Mitarbeiter auswählen'
            required
            mt='md'
            value={form.data.clients}
            onChange={values => updateValue('clients', values)}
            data={clients}
            error={form.errors.clients}
          />

          <Fieldset
            legend='Standort'
            mt='xl'
          >
            <TextInput
              label='Adresse'
              placeholder='Adresse'
              value={form.data.address}
              onChange={e => updateValue('address', e.target.value)}
              error={form.errors.address}
            />

            <Group grow>
              <TextInput
                label='Postleitzahl'
                placeholder='Postleitzahl'
                mt='md'
                value={form.data.postal_code}
                onChange={e => updateValue('postal_code', e.target.value)}
                error={form.errors.postal_code}
              />

              <TextInput
                label='Stadt'
                placeholder='Stadt'
                mt='md'
                value={form.data.city}
                onChange={e => updateValue('city', e.target.value)}
                error={form.errors.city}
              />
            </Group>

            <Select
              label='Land'
              placeholder='Land auswählen'
              mt='md'
              searchable={true}
              value={form.data.country_id}
              onChange={value => updateValue('country_id', value)}
              data={countries}
              error={form.errors.country_id}
            />
          </Fieldset>

          <Fieldset
            legend='Details'
            mt='xl'
          >
            <TextInput
              label='Geschäfts-ID'
              placeholder='Geschäfts-ID'
              value={form.data.business_id}
              onChange={e => updateValue('business_id', e.target.value)}
              error={form.errors.business_id}
            />

            <TextInput
              label='Steuer-ID'
              placeholder='Steuer-ID'
              mt='md'
              value={form.data.tax_id}
              onChange={e => updateValue('tax_id', e.target.value)}
              error={form.errors.tax_id}
            />

            <TextInput
              label='VAT'
              placeholder='VAT'
              mt='md'
              value={form.data.vat}
              onChange={e => updateValue('vat', e.target.value)}
              error={form.errors.vat}
            />
          </Fieldset>

          <Fieldset
            legend='Finanzen'
            mt='xl'
          >
            <TextInput
              label='IBAN'
              placeholder='IBAN'
              value={form.data.iban}
              onChange={e => updateValue('iban', e.target.value)}
              error={form.errors.iban}
            />

            <TextInput
              label='SWIFT'
              placeholder='SWIFT'
              mt='md'
              value={form.data.swift}
              onChange={e => updateValue('swift', e.target.value)}
              error={form.errors.swift}
            />

            <Select
              label='Standardwährung'
              placeholder='Währung auswählen'
              required
              mt='md'
              searchable={true}
              value={form.data.currency_id}
              onChange={value => updateValue('currency_id', value)}
              data={currencies}
              error={form.errors.currency_id}
            />
          </Fieldset>

          <Fieldset
            legend='Kontakt'
            mt='xl'
          >
            <Group grow>
              <TextInput
                label='E-mail'
                placeholder='E-mail'
                value={form.data.email}
                onChange={e => updateValue('email', e.target.value)}
                error={form.errors.email}
              />

              <TextInput
                label='Telefon'
                placeholder='Telefon'
                value={form.data.phone}
                onChange={e => updateValue('phone', e.target.value)}
                error={form.errors.phone}
              />
            </Group>

            <TextInput
              label='Web'
              placeholder='Web'
              mt='md'
              value={form.data.web}
              onChange={e => updateValue('web', e.target.value)}
              error={form.errors.web}
            />
          </Fieldset>

          <Group
            justify='space-between'
            mt='xl'
          >
            <BackButton route='clients.companies.index' />
            <ActionButton loading={form.processing}>Erstellen</ActionButton>
          </Group>
        </form>
      </ContainerBox>
    </>
  );
};

ClientCompanyCreate.layout = page => <Layout title='Firma Erstellen'>{page}</Layout>;

export default ClientCompanyCreate;
