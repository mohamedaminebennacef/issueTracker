import { Skeleton } from '@/app/components';
import { Box, Card, Flex } from '@radix-ui/themes';
const LoadingIssueDetailPage = () => {
  return (
    <Box>
        <Skeleton className='max-w-xl'/>
        <Flex className="space-x-3" my="2">
            <Skeleton width="5rem"/>
            <Skeleton width="8rem"/>
            
        </Flex>
        <Card className="prose" mt="4" >
        <Skeleton count = {3} ></Skeleton>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage