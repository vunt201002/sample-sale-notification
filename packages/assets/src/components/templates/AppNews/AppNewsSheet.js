import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  DisplayText,
  SkeletonBodyText,
  SkeletonDisplayText,
  Stack,
  TextContainer,
  TextStyle
} from '@shopify/polaris';
import usePaginate from '@assets/hooks/api/usePaginate';
import SheetBody from '@assets/components/organisms/Sheet/SheetBody';
import SheetHeader from '@assets/components/organisms/Sheet/SheetHeader';
import {SearchMajor} from '@shopify/polaris-icons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';

const CATEGORY_UPDATE_ID = 445;
const APP_NEWS_URL = 'https://blog.avada.io/resources';

/**
 * @param closeSheet
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppNewsSheet({closeSheet}) {
  const [actions, setActions] = useState({openInput: false, searchValue: ''});
  const {data, pageInfo, fetched, loading, nextPage} = usePaginate({
    url: '/appNews',
    defaultLimit: 1,
    defaultSort: 'published_at:desc',
    initQueries: {categories: CATEGORY_UPDATE_ID},
    keepPreviousData: true
  });

  const category = item => item.categories.find(cate => cate.id === CATEGORY_UPDATE_ID);

  const loadMoreOnScroll = async () => {
    if (!loading && fetched) await nextPage();
  };

  const prepareUrl = item => `${APP_NEWS_URL}/${item.slug}.html`;

  return (
    <>
      <SheetHeader handleClose={closeSheet} loading={loading}>
        <Stack alignment="center">
          <Stack.Item fill>
            <DisplayText size="small">{"What's new on AVADA"}</DisplayText>
          </Stack.Item>
        </Stack>
        <Button icon={SearchMajor} disabled={loading} onClick={() => closeSheet()} plain />
        <div style={{marginRight: '1rem'}} />
      </SheetHeader>
      <SheetBody
        handleClose={closeSheet}
        loading={loading}
        darkBackground={true}
        classNames={['Avada-Sheet__AppNews']}
        onScrolledToBottom={() => loadMoreOnScroll()}
      >
        <Stack vertical>
          {!fetched && <AppNewsSkeleton loopText={6} />}
          {data.map((item, index) => (
            <Card sectioned key={index}>
              <Stack alignment="center" spacing="tight">
                <Badge status="success">{category(item).title}</Badge>
                <TextStyle variation="subdued">{formatDateOnly(item.updated_at)}</TextStyle>
              </Stack>
              <div style={{marginBottom: '1rem'}} />
              <Button url={prepareUrl(item)} removeUnderline external plain textAlign="left">
                <DisplayText>
                  <TextStyle variation="strong">{item.title}</TextStyle>
                </DisplayText>
              </Button>
              <ReactMarkdown
                className="prose"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {item.content}
              </ReactMarkdown>
            </Card>
          ))}
          {fetched && pageInfo.hasNext && <AppNewsSkeleton />}
        </Stack>
      </SheetBody>
    </>
  );
}

AppNewsSheet.propTypes = {
  closeSheet: PropTypes.func
};

const AppNewsSkeleton = ({loopCard = 1, loopText = 1}) => {
  return Array.from(Array(loopCard)).map((value, key) => (
    <Card sectioned key={key}>
      <TextContainer>
        <SkeletonDisplayText size="small" />
        <SkeletonBodyText />
      </TextContainer>
    </Card>
  ));
};
