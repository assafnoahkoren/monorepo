import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Anchor, Card, Flex, Group, Image, Loader, Stack, Text, Title } from '@mantine/core';
import { IconInfoCircle, IconExclamationCircle } from '@tabler/icons-react';
import QRCode from 'react-qr-code';
import axios from 'axios';

const VoucherVerifyPage: FC = () => {
  const { voucherId } = useParams();
  const [hotelName, setHotelName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHotelName = () => {
      setIsLoading(true);
      axios
        .get('https://server.alona.live/reservation', { params: { id: voucherId } })
        .then((res) => {
          if (res.data.reservation) {
            setHotelName(res.data.reservation.residence);
          } else {
            setIsError(true);
          }
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchHotelName();
  }, [voucherId]);

  if (!voucherId) {
    // TODO: Show error or redirect to different page
    return null;
  }

  return isLoading ? (
    <Flex className="h-full" justify="center" align="center">
      <Loader color="blue" />
    </Flex>
  ) : isError ? (
    <Flex className="h-full" justify="center" align="center">
      <Alert variant="light" color="red" title="שגיאה" icon={<IconExclamationCircle />}>
        שגיאה לא צפויה, אנא נסו שוב
      </Alert>
    </Flex>
  ) : (
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
                {hotelName}
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
