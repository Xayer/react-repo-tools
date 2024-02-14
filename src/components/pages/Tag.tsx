import { useParams } from 'react-router-dom';

export default function Tag() {
  const { tag } = useParams();
  return <div>{tag}</div>;
}
