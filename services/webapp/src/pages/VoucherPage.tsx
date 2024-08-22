import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Anchor, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import QRCode from 'react-qr-code';

const VoucherVerifyPage: FC = () => {
  const { voucherId } = useParams();

  if (!voucherId) {
    // TODO: Show error or redirect to different page
    return null;
  }

  return (
    <Stack className="h-full bg-[#F5F8FA]" p="sm" align="center" gap="lg">
      <Group gap="sm" className="pt-2">
        <Image src="/ministry-of-tourism-logo.png" width={60} height={60} />
        <Title order={5}>קוד QR לסריקה בהגעתך למלון</Title>
      </Group>
      <Stack gap="lg">
        <Alert variant="light" color="gray" icon={<IconInfoCircle />}>
          יש להציג את הקוד לנציג משרד התיירות במלון
        </Alert>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Text span>
              <Text span>ממתינים להגעתכם ב-</Text>{' '}
              <Text fw={700} span>
                קלאב הוטל טבריה
              </Text>
            </Text>
            <Group gap="xs">
              <Image src="/waze-icon.png" width={24} height={24} />
              <Anchor href="" target="_blank">
                להוראות הגעה ב- WAZE
              </Anchor>
            </Group>
          </Stack>
        </Card>
        <QRCode className="self-center" value={`https://alona.live/voucher/${voucherId}/verify`} size={200} />
      </Stack>
    </Stack>
  );
};

export const loader = async () => null;
export const Component = VoucherVerifyPage;
