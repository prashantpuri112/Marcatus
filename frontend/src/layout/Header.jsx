import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Link,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo from './Logo';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  const { user, loading } = useContext(UserContext)

  const handleSingOut = () => {
    localStorage.removeItem('stock_client_token')
    window.location.href = '/'
  }

  return (
    <Box>
      <Flex
        maxW={'8xl'}
        mx={'auto'}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Logo />
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {
          user ?

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                <Box display={'flex'}>
                  <Image borderRadius={'full'} boxSize={'2.5ch'} objectFit={'cover'} src={user?.profile ? user.profile : 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'} />
                  <Text mx={2}>{user?.username}</Text>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} href='/user/profile'>Profile</MenuItem>
                <MenuItem onClick={handleSingOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
            :

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={3}>
              <Link href={'/login'}>
                <Button
                  fontSize={'sm'}
                  fontWeight={400}
                >
                  Sign In
                </Button>
              </Link>
              <Link href='/register'>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'green.400'}
                  to={'#'}
                  _hover={{
                    bg: 'green.300',
                  }}>
                  Sign Up
                </Button>
              </Link>
            </Stack>
        }
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              {/* <Link
                p={2}
                to={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link> */}
              <Link href={navItem.href} fontWeight={500} color={linkColor} mx={4} _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>{navItem.label}</Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <SimpleGrid columns={[navItem.children.length > 8 ? 2 : 1]}>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </SimpleGrid>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'News',
    children: [
      {
        label: 'All News',
        href: '/news/category/all-news',
      },
      {
        label: 'Stock',
        href: '/news/category/stock',
      },
      {
        label: 'Insurance',
        href: '/news/category/insurance',
      },
      {
        label: 'Technical Analysis',
        href: '/news/category/technical-analysis',
      },
      {
        label: 'Bank',
        href: '/news/category/bank',
      },
      {
        label: 'International',
        href: '/news/category/international',
      },
      {
        label: 'Opinion and Analysis',
        href: '/news/category/opinion-and-analysis',
      },
      {
        label: 'Trending',
        href: '/news/category/trending',
      },
      {
        label: 'Hydropower',
        href: '/news/category/hydropower',
      },
    ],
  },
  {
    label: "Economy",
    children: [
      {
        label: "Forex",
        href: "/economy/forex"
      }
    ]
  },
  {
    label: "Market",
    children: [
      {
        label: "Live Market",
        href: "/market/live-trading"
      },
      {
        label: "Top Sectors",
        href: "/market/top-sectors"
      },
      {
        label: "Top Brokers",
        href: "/market/top-brokers"
      },
      {
        label: "Turnovers",
        href: "/market/top-turnovers"
      },

    ]
  },
  {
    label: "Fundamental Analysis",
    children: [
      {
        label: "Listed Companies",
        href: "/listed-companies"
      },
      {
        label: "Stocks Comparison",
        href: "/stocks-comparison"
      },
    ]
  },
  {
    label: 'Tools',
    children: [
      {
        label: "Share Calculator",
        href: "/share-transaction-calculator"
      },
      {
        label: "Divident Calcluator",
        href: "/dividend-calculator"
      },
      {
        label: "Bonus Share Adjustment Calcluator",
        href: "/bonus-share-adjustment"
      },
      {
        label: "Right Share Adjustment Calculator",
        href: "/right-share-adjustment"
      },
    ],
  },
  {
    label: 'PMS',
    children: [
      {
        label: "Portfolio Management",
        href: '/portfolio'
      }
    ]
  },
];
