import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Container, Image, Link, Menu, Text,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react'

const Layout = ({ children }) => {

    const { user, loading } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem('stock_token')
        window.location.href = '/'
    }

    return (
        <Box display={'flex'}>
            <Box className='sidebar' borderRight={'1px'} borderColor={'#f1f1f1'} pb={4} w={'270px'} me={'auto'} display={'flex'} flexDirection={'column'} position={'fixed'}>
                <Image src='/Marcatus.png' height={'10ch'} width={'10ch'} />
                <Accordion defaultIndex={[0]} allowMultiple borderColor={'#fff'}>
                    <AccordionItem>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                News
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Container px={2}><Link href='/news/create' display={'block'} py={2} px={0}>Create</Link></Container>
                            <Container px={2}><Link href='/' display={'block'} py={2} px={0}>List</Link></Container>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Container>
                    <Link href='/extract-data'>Extract Stock Data</Link>
                </Container>
                {
                    !loading &&
                    <Menu>
                        <MenuButton mt={'auto'} mx={3} as={Button} rightIcon={<FiChevronDown />}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Image borderRadius={'full'} boxSize={'2.5ch'} objectFit={'cover'} src={user?.profile ? user.profile : 'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png'} />
                                <Text mx={2} fontSize={'sm'}>{user?.username}</Text>
                            </Box>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                            <MenuItem as={Link} href='/user/profile'>Profile</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </Box>
            <Box className='main-content'>
                {children}
            </Box>
        </Box>
    )
}

export default Layout