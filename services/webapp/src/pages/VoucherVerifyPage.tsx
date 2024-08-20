import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Card, Group, Image, LoadingOverlay, PinInput, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconCamera,
  IconCircleCheck,
  IconExclamationCircleFilled,
  IconInfoCircle,
  IconXboxX,
} from '@tabler/icons-react';

const VoucherVerifyPage: FC = () => {
  const { voucherId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [voucherDetails, setVoucherDetails] = useState<VoucherDetails | null>(null);

  if (!voucherId) {
    // TODO: Show error or redirect to different page
    return null;
  }

  const handlePinInputComplete = (value: string) => {
    setIsLoading(true);
    validateHotelCode(value, voucherId)
      .then((result) => {
        if (result.isValid) {
          setVoucherDetails(result.voucherDetails);
          setIsError(false);
        } else {
          setIsError(true);
          if (result.relevantHotelName) {
            modals.open({
              children: (
                <Stack align="center" gap="sm">
                  <IconExclamationCircleFilled size={72} color="red" />
                  <Title order={3}>קוד זה אינו תואם את המלון</Title>
                  <Text>
                    זהו אינו קוד המלון אליו הופנה התושב/ת.
                    <br />
                    יש לגשת למלון {result.relevantHotelName}.
                  </Text>
                  <Button variant="filled" onClick={() => modals.closeAll()}>
                    הקלדה מחדש של הקוד
                  </Button>
                </Stack>
              ),
              centered: true,
              withCloseButton: false,
            });
          } else {
            modals.open({
              children: (
                <Stack align="center" gap="sm">
                  <IconExclamationCircleFilled size={72} color="red" />
                  <Title order={3}>קוד שגוי</Title>
                  <Text>הקוד שהזנת שגוי. יש להזין מחדש.</Text>
                  <Button variant="filled" onClick={() => modals.closeAll()}>
                    הקלדה מחדש של הקוד
                  </Button>
                </Stack>
              ),
              centered: true,
              withCloseButton: false,
            });
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Stack className="h-full bg-[#F5F8FA]" p="sm" align="center" gap="lg">
      <Group gap="sm" className="pt-2">
        <Image src="/ministry-of-tourism-logo.png" width={60} height={60} />
        <Title order={5}>אימות נתונים טרם קליטה במלון</Title>
      </Group>
      {voucherDetails ? (
        <Stack gap="lg">
          <Alert variant="light" color="gray" icon={<IconInfoCircle />}>
            יש לוודא כי אלה פרטי התושב/ת הנכונים ורק לאחר מכן ללחוץ על כפתור ‘שליחה’
          </Alert>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Box>
                <Text>שם מלא</Text>
                <Text fw={700}>{`${voucherDetails.firstName} ${voucherDetails.lastName}`}</Text>
              </Box>
              <Box>
                <Text>תעודת זהות</Text>
                <Text fw={700}>{voucherDetails.idNumber}</Text>
              </Box>
              <Box>
                <Text>מספר נפשות</Text>
                <Text fw={700}>{voucherDetails.soulsNumber}</Text>
              </Box>
              <Group gap="xs">
                <Image src="/animals.png" width={36} height={36} />
                <Text fw={700}>חיית מחמד</Text>
                {voucherDetails.hasPet ? (
                  <IconCircleCheck color="green" size={36} />
                ) : (
                  <IconXboxX color="red" size={36} />
                )}
              </Group>
              <Group gap="xs">
                <Image src="/disabled-man.png" width={36} height={36} />
                <Text fw={700}>חדר נגיש</Text>
                {voucherDetails.isAccessibleRoom ? (
                  <IconCircleCheck color="green" size={36} />
                ) : (
                  <IconXboxX color="red" size={36} />
                )}
              </Group>
            </Stack>
          </Card>
          <Button variant="filled" leftSection={<IconCamera size={14} />} onClick={() => setVoucherDetails(null)}>
            סריקת שובר נוסף
          </Button>
        </Stack>
      ) : (
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          <Card className="w-full" shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="xl">
              <Text size="sm">יש להזין קוד מלון בן 4 ספרות</Text>
              <PinInput
                className="self-center"
                placeholder=""
                type="number"
                inputType="tel"
                inputMode="numeric"
                onComplete={handlePinInputComplete}
                error={isError}
                disabled={isLoading}
              />
            </Stack>
          </Card>
        </Box>
      )}
    </Stack>
  );
};

const validateHotelCode = async (hotelCode: string, voucherId: string) => {
  // TODO: Need to make an API call and check is the hotel code is valid and matched to the relevant voucher
  return new Promise<
    | { isValid: true; voucherDetails: VoucherDetails }
    | { isValid: false; relevantHotelName: string }
    | { isValid: false }
  >((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      if (hotelCode === '1234') {
        resolve({
          isValid: true,
          voucherDetails: {
            firstName: 'ישראל',
            lastName: 'ישראלי',
            idNumber: '305632689',
            soulsNumber: 3,
            hasPet: true,
            isAccessibleRoom: false,
          },
        });
      } else if (hotelCode === '1235') {
        resolve({ isValid: false, relevantHotelName: 'דן תל אביב' });
      } else {
        resolve({ isValid: false });
      }
    }, 1000);
  });
};

interface VoucherDetails {
  firstName: string;
  lastName: string;
  idNumber: string;
  soulsNumber: number;
  hasPet: boolean;
  isAccessibleRoom: boolean;
}

export const loader = async () => null;
export const Component = VoucherVerifyPage;
