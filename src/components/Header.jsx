import { Box, Flex, Heading, HStack, Link, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, Text, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChevronDownIcon, AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    
    // Cores que mudam com o tema
    const bgColor = useColorModeValue('white', '#1f2028');
    const borderColor = useColorModeValue('gray.200', '#374151');

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Box
            as="header"
            borderBottom="1px solid"
            borderColor={borderColor}
            px={6}
            py={4}
            bg={bgColor}
            position="sticky"
            top={0}
            zIndex={10}
            shadow="sm"
        >
            <Flex
                maxW="1126px"
                mx="auto"
                align="center"
                justify="space-between"
            >
                <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                    <Heading size="md" color="brand.500" cursor="pointer">
                        MVP Marketplace
                    </Heading>
                </Link>
                
                <HStack spacing={6}>
                    <Link
                        as={RouterLink}
                        to="/"
                        fontWeight="medium"
                        _hover={{ color: 'brand.500' }}
                        transition="color 0.2s"
                    >
                        Home
                    </Link>

                    {/* Botão de Dark Mode */}
                    <IconButton
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                        variant="ghost"
                        aria-label={colorMode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                        size="md"
                    />

                    {isAuthenticated ? (
                        <>
                            {/* Botão Criar Anúncio */}
                            <Button
                                as={RouterLink}
                                to="/products/new"
                                leftIcon={<AddIcon />}
                                colorScheme="purple"
                                size="sm"
                            >
                                Criar Anúncio
                            </Button>

                            {/* Menu do Usuário */}
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    variant="ghost"
                                    rightIcon={<ChevronDownIcon />}
                                    _hover={{ bg: 'gray.100' }}
                                >
                                    <HStack spacing={2}>
                                        <Avatar
                                            size="sm"
                                            name={user?.name}
                                            bg="brand.500"
                                        />
                                        <Text display={{ base: 'none', md: 'block' }}>
                                            {user?.name}
                                        </Text>
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleLogout}>
                                        Sair
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link
                                as={RouterLink}
                                to="/login"
                                fontWeight="medium"
                                _hover={{ color: 'brand.500' }}
                                transition="color 0.2s"
                            >
                                Login
                            </Link>
                            <Button
                                as={RouterLink}
                                to="/signup"
                                colorScheme="purple"
                                size="sm"
                            >
                                Cadastrar
                            </Button>
                        </>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
}
