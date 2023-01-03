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
    </Main>
  );
};

export default Index;
