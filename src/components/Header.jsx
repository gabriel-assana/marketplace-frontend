import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export function Header() {
    return (
        <Box
            as="header"
            borderBottom="1px solid"
            borderColor="gray.200"
            px={6}
            py={4}
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
                
                <HStack spacing={8}>
                    <Link
                        as={RouterLink}
                        to="/"
                        fontWeight="medium"
                        _hover={{ color: 'brand.500' }}
                        transition="color 0.2s"
                    >
                        Home
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/login"
                        fontWeight="medium"
                        color="brand.500"
                        _hover={{ color: 'brand.600' }}
                        transition="color 0.2s"
                    >
                        Login
                    </Link>
                </HStack>
            </Flex>
        </Box>
    );
}
