import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import React from 'react'

const ProductCard = ({product}) => {

 
  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{transform: "translateY(-5px)", shadow:'xl'}} >
        <Image  src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'}  mb={4}>${product.price}</Text>
            <HStack spacing={2}>
					<IconButton icon={<EditIcon />} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						
						colorScheme='red'
					/>
				</HStack>
        </Box>
    </Box>
  )
}

export default ProductCard