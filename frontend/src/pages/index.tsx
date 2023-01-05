import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="VeChain Custom node"
          description="Frontend to interact with private Thor node"
        />
      }
    >
      <h1 className="text-2xl font-bold">
        Interact with custom VeChain Thor node
      </h1>

      <Link href="/status">Status</Link>
      <br />
      <Link href="/send">Send VET</Link>
    </Main>
  );
};

export default Index;
