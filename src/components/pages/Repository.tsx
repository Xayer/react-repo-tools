import { useContext } from 'react';
import { RepositoryContext } from '../shared/RepositoryLayout';

export default function Repository() {
  const repositoryContext = useContext(RepositoryContext);
  return <p>{repositoryContext?.description}</p>;
}
