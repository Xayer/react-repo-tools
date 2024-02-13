import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description?: string;
};

const APP_TITLE = 'Repo Tools';
const APP_DESCRIPTION = 'Repository superpowers 🚀';

export default function Head({ title, description }: Props) {
  return (
    <Helmet>
      <title>{`${title} | ${APP_TITLE}`}</title>
      <meta name="description" content={description ?? APP_DESCRIPTION} />
      <meta property="og:title" content={`${title} | ${APP_TITLE}`} />
      <meta property="og:description" content={description ?? APP_DESCRIPTION} />
      <meta name="robots" content="noindex" />
    </Helmet>
  );
}
