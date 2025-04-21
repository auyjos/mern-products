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
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormErrorIcon
} from "@chakra-ui/react";
import React, { useState } from 'react'
import { useProductStore } from "../store/Product";
const ProductCard = ({product}) => {


	//zustand storage
	const {deleteProduct, updateProduct} = useProductStore()

	//chakra usage
	const {isOpen, onOpen, onClose} = useDisclosure()
	const toast = useToast()

	//states
	const[updatedProduct, setUpdatedProduct] = useState(product)
	const[errors, setErrors] = useState({
		name:"",
		price:"",
		image:""
	})

	//set styles
	const textColor = useColorModeValue("gray.600", 'gray.200' )
	const bg = useColorModeValue('white', 'gray.800')
	
	//Regex for no multispace validation
	const noMultiSpace = /^(?!.*\s{2,}).+$/


	const handleDeleteProduct = async(productId) => {
	const {success, message} = await deleteProduct(productId)
	console.log(success)
	console.log(message)
	if(!success){
		toast({
			title:'Error',
			description: message,
			status: 'error',
			duration: 3000,
			isClosable: true
		})
	}
	else{
	toast({
		title:"Success",
		description: message,
		status: "success",
		duration: 3000,
		isClosable: true
	})
}}

function validate(field, value) {
	// 1) Required
	if (!value.toString().trim()) {
	  return "This field is required"
	}
  
	// 2) No more than one consecutive space on name or image
	if ((field === "name" || field === "image") && !noMultiSpace.test(value)) {
	  return "No more than one consecutive space allowed"
	}
  
	// 3) Price must be a positive number
	if (field === "price") {
	  const n = parseFloat(value)
	  if (Number.isNaN(n) || n <= 0) {
		return "Price must be a positive number"
	  }
	}
  
	return ""
  }

const handleUpdateProduct = async(productID, updatedProductObj) => {

  const {success,message} = await updateProduct(productID, updatedProductObj)

  if(!success){
	toast({
		title:'Error',
		description: message,
		status: 'error',
		duration: 3000,
		isClosable: true
	})
}
else{
toast({
	title:"Success",
	description: message,
	status: "success",
	duration: 3000,
	isClosable: true
})	

onClose()

}}

const handleChange = e => {
	const { name, value } = e.target
	setUpdatedProduct(prev => ({ ...prev, [name]: value }))
	setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }
  
  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{transform: "translateY(-5px)", shadow:'xl'}} bg={bg}>
        <Image  src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}  mb={4}>${product.price}</Text>
            <HStack spacing={2}>
					<IconButton icon={<EditIcon onClick={onOpen} />} colorScheme='blue' />
					<IconButton onClick={() =>handleDeleteProduct(product._id)}
						icon={<DeleteIcon />}
						
						colorScheme='red'
					/>
				</HStack>


        </Box>
		<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay >
		<ModalContent>
			<ModalHeader>Update Product</ModalHeader>
			<ModalCloseButton  onClick={onClose}/>
			<ModalBody>
						<VStack spacing={4}>
						{/* Name */}
						<FormControl isInvalid={!!errors.name}>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            {/* Price */}
            <FormControl isInvalid={!!errors.price}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            {/* Image */}
            <FormControl isInvalid={!!errors.image}>
              <FormLabel>Image URL</FormLabel>
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.image}</FormErrorMessage>
            </FormControl>
						</VStack>
					</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct )}>Update</Button>
					<Button variant={"ghost"} onClick={onClose}>Close</Button>
				</ModalFooter>

		</ModalContent>
		</ModalOverlay>

		</Modal>
    </Box>

	
  )
}

export default ProductCard