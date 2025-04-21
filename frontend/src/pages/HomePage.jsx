import { Container, VStack,Text, SimpleGrid, HStack, Button,Input} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useProductStore} from '../store/Product'
import ProductCard from '../components/ProductCard'
const HomePage = () => {

  //states for showing number of elements
  const [currentPage, setCurrentPage] = useState(1)

  //zustand store
 const{fetchProducts, products} = useProductStore()

 //effect for fetching products with function defined in zustand storage
  useEffect(() => {
    fetchProducts()

  },[fetchProducts])
console.log("products", products)


//memoization for filtered list


const pageSize = 9
const totalPages = Math.ceil(products.length / pageSize) || 1

//derive products for each page
const startIdx = (currentPage -1) * pageSize
const pageItems = products.slice(startIdx, startIdx + pageSize)

//function for going to next page
const goNext = () => setCurrentPage(p => Math.max(totalPages, p+1 ))
//function for going to previous page
const goPrev = () => setCurrentPage(p => Math.max(1, p -1))


  return (
   
    <Container
    maxW={'container.xl'}
    py={12}
    
    >

    <VStack spacing={8}>

    <Text
    fontSize={'30'}
    fontWeight={'bold'}
    bgGradient={'linear(to-r, cyan.400, blue.500)'}
    bgClip={'text'}
    textAlign={'center'}
    > Current Products</Text>



 { pageItems.length >  0?  
 <>
 <SimpleGrid
    columns={{
      base: 1,
      md: 2, 
      lg:3
    }}
    spacing={10}
    w={'full'}
    >
    {pageItems.map((product) => (
      <ProductCard  key={product._id} product={product} />
    ))}
    </SimpleGrid>
    <HStack spacing={2} pt={6}>
    <Button onClick={goPrev} disabled={currentPage === 1} >Prev</Button>

   {Array.from({ length: totalPages }, (_, i) => (
  <Button
    key={i}
    size="sm"
    variant={currentPage === i + 1 ? 'solid' : 'outline'}
    onClick={() => setCurrentPage(i + 1)}
  >
    {i + 1}
  </Button>
))}




    <Button onClick={goNext} disabled={currentPage === totalPages}>Next</Button>
    </HStack>
    </>
  :
    <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
       No products Found {""}
       <Link to={'/create'}>
       <Text
       as={'span'}
       color={'blue.500'}
       _hover={{textDecoration: "underline"}}
       >Create a product</Text>
       </Link>
    </Text>}
    </VStack>


    </Container>

  )
}

export default HomePage
