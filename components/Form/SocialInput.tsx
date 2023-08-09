import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { isValidHttpUrl } from '@/utils/validUrl';

type TypeSocialInput = {
  label: string;
  placeHolder: string;
  icon: string;
  register: any;
  name?: string;
  discordError?: boolean;
  onInputChange?: (value: string) => void;
};

export const SocialInput = ({
  label,
  placeHolder,
  icon,
  register,
  name,
  discordError,
  onInputChange,
}: TypeSocialInput) => {
  const [isUrlValid, setIsUrlValid] = useState(true);

  const handleInputChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const handleInputBlur = (value: string) => {
    if (label.toLowerCase() !== 'discord') {
      setIsUrlValid(isValidHttpUrl(value));
    }
  };

  useEffect(() => {
    if (name && label.toLowerCase() !== 'discord') {
      const value = register(name)?.value || '';
      if (typeof value === 'string') {
        setIsUrlValid(isValidHttpUrl(value));
      }
    }
  }, [name, label, register]);

  return (
    <Box mb={'1.25rem'}>
      <Flex align="center" justify="center" direction="row">
        <Box
          w="30%"
          h="2.6875rem"
          pl={{
            sm: '5px',
            md: '20px',
          }}
          border="1px solid"
          borderColor={'brand.slate.300'}
          borderRight="none"
          borderLeftRadius={'md'}
        >
          <Flex align="center" justify="start" w={'100%'} h={'100%'}>
            <Box w={'1rem'}>
              <Image
                w={'100%'}
                h={'100%'}
                objectFit="contain"
                alt={label}
                src={icon}
              />
            </Box>
            <Text
              h="4.3rem"
              pl="10px"
              fontSize="0.875rem"
              fontWeight={500}
              lineHeight="4.3rem"
              textAlign="left"
            >
              {label}
              {label === 'Discord' && (
                <Text as="sup" ml={1} color="red">
                  *
                </Text>
              )}
            </Text>
          </Flex>
        </Box>
        <Input
          w="70%"
          h="2.6875rem"
          color={'gray.800'}
          fontSize="0.875rem"
          fontWeight={500}
          borderColor={'brand.slate.300'}
          borderLeftRadius="0"
          _placeholder={{
            color: 'brand.slate.300',
          }}
          focusBorderColor="brand.purple"
          placeholder={placeHolder}
          title={label}
          {...(name ? register(name) : register(label))}
          onBlur={(e) => {
            handleInputBlur(e.target.value);
          }}
          onChange={(e) => {
            handleInputChange(e.target.value);
            if (register.onChange) {
              register.onChange(e);
            }
          }}
        />
      </Flex>
      {!isUrlValid && (
        <Text color={'red'}>
          Link URL needs to contain &quot;http://&quot; or &quot;https://&quot;
          prefix
        </Text>
      )}
      {discordError && label.toLowerCase() === 'discord' && (
        <Text color={'red'}>Discord is required</Text>
      )}
    </Box>
  );
};
