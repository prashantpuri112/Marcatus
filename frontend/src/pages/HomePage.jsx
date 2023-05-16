import { useEffect, useState } from "react";
import { OverallData } from "../components/OverallData";
import TopGainerLoser from "../components/TopGainerLoser";
import { useLiveData } from "../hooks/useLiveData";
import { Badge, Box, Button, Flex, HStack, IconButton, Image, Link, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import { TopTurnovers } from "../components/TopTurnover";
import CurrencyExchange from "../components/CurrencyExchange";
import TopSectors from "../components/TopSectors";
import TopBroker from "../components/TopBroker";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function HomePage() {

  const [news, setNews] = useState()
  const [loading, setLoading] = useState(true)

  const slideRight = () => {
    document.querySelector('#cat-slider').scrollLeft += 40
  }
  const slideLeft = () => {
    document.querySelector('#cat-slider').scrollLeft -= 40
  }

  const categories = [
    { name: 'Latest', slug: "all-news" },
    { name: 'Stock', slug: 'stock' },
    { name: 'Insurance', slug: 'insurance' },
    { name: 'Technical Analysis', slug: 'technical-analysis' },
    { name: 'Bank', slug: 'bank' },
    { name: 'International', slug: 'international' },
    { name: 'Opinion and Analysis', slug: 'opinion-and-analysis' },
    { name: 'Trending', slug: 'trending' },
    { name: 'Hydropower', slug: 'hyropower' }
  ]

  useEffect(() => {
    try {
      axios.get('http://localhost:8080/api/news?is_featured=true&is_published=true').then((res) => {
        console.log(res.data)
        setNews(res.data)
        setLoading(false)
      })
    } catch {
      console.log(err)
      setLoading(false)
    }
  }, [])

  const getNewsCategory = async (category) => {
    console.log(category)
    try {
      axios.get('http://localhost:8080/api/news?is_featured=true&is_published=true&category=' + category).then((res) => {
        setNews(res.data)
        console.log(res.data)
        setLoading(false)
      })
    } catch {
      console.log(err)
      setLoading(false)
    }
  }

  const { data, isLoading } = useLiveData();

  console.log(data)

  return (
    <Box width={'100%'} backgroundColor={'gray.100'} p={'1rem'}>
      <SimpleGrid spacingX={'2ch'} maxW={'8xl'} mx={'auto'} columns={[1, 1, 3]}>
        <Box position={'relative'}>
          <Box position={'sticky'} top={'2ch'}>
            <OverallData data={data} isLoading={isLoading} viewMore={false} />
            <Box my={4} bg={'white'} rounded={'md'} shadow={'sm'}>
              <CurrencyExchange size={5} />
            </Box>
            <Box my={4}>
              <TopSectors viewMore />
            </Box>
          </Box>
        </Box>

        <Box className="sticky-wrapper" position={'relative'}>
          <Box className="sticky-div" position={'sticky'} top={'2ch'} bottom={'2ch'}>
            <TopGainerLoser data={data} isLoading={isLoading} />
            <Box bg={'white'} rounded={'md'} my={4} px={3} py={3}>
              <Text fontWeight={'600'}>Top Turnovers</Text>
              <TopTurnovers topTurnover={data?.turnover} />
            </Box>
            <Box my={4}>
              <TopBroker viewMore />
            </Box>
          </Box>
        </Box>

        <Box>
          {
            loading ?
              <Skeleton>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton> :
              <SimpleGrid columns={[1]} spacingX={'1rem'} spacingY={'1rem'}>
                <Box display={'flex'} alignItems={'center'}>
                  <IconButton icon={<FiChevronLeft />} size={'xs'} onClick={slideLeft} />
                  <Box id="cat-slider" className="category-slider" display={'flex'} alignItems={'center'} overflowX={'scroll'}>
                    {
                      categories.map((val, ind) => {
                        return (
                          <Box key={ind}>
                            <Button onClick={() => getNewsCategory(val.slug)} className="category-btn" id={val.slug} colorScheme={val.active && 'blue'} display={'block'}>{val.name}</Button>
                          </Box>
                        )
                      })
                    }
                  </Box>
                  <IconButton icon={<FiChevronRight />} size={'xs'} onClick={slideRight} />
                </Box>
                {
                  news?.news.length > 0 ?
                    news.news.map((news, ind) => {
                      return (
                        <Link key={ind} bg='white' px={3} py={3} w={'100%'} href={`/news/${news.slug}`} rounded={'md'}>
                          <Box>
                            {
                              news.image &&
                              <Image src={`http://localhost:8080/${news.image}`} w={'100%'} height={'24ch'} objectFit={'cover'} rounded={'md'} />
                            }
                            <Box mt={4}>
                              <Badge colorScheme='green' variant={'subtle'} fontSize={'0.6rem'} py={1} px={1} rounded={'md'}>{news.category}</Badge>
                              <Text as='h4' fontSize={'md'} fontWeight={'bold'}>{news.title}</Text>
                              <Text size={'md'}>{news.subtitle}</Text>
                            </Box>
                          </Box>
                        </Link>
                      )
                    })
                    :
                    <Text textColor={'gray.400'} textAlign={'center'} fontSize={'sm'}>No news to display</Text>
                }
              </SimpleGrid>
          }
        </Box>
      </SimpleGrid>
    </Box>
  )
}
